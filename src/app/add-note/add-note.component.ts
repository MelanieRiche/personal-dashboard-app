import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Note } from '../shared/note.model';
import { NoteService } from '../shared/note.service';

@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.scss']
})
export class AddNoteComponent implements OnInit {

  showValidationErrors!: boolean

  constructor(private noteService: NoteService, private router: Router) { }  // inject service and router

  ngOnInit(): void {
  }

  onFormSubmit(form: NgForm) {
    // alert("Form has been submitted!")
    // console.log(form)

    if (form.invalid) return this.showValidationErrors = true
    // if form.invalid is true, the following won't be executed

    const note = new Note(form.value.title, form.value.content)

    // Adding the note to the array on note.service.ts
    this.noteService.addNote(note)
    // Rediret when form is submitted
    this.router.navigateByUrl("/notes")
  }
}
