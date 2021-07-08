import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Note } from '../shared/note.model';
import { NoteService } from '../shared/note.service';

@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.scss']
})
export class AddNoteComponent implements OnInit {

  constructor(private noteService: NoteService) { }

  ngOnInit(): void {
  }

  onFormSubmit(form: NgForm) {
    // alert("Form has been submitted!")
    // console.log(form.value)
    const note = new Note(form.value.title, form.value.content)
    console.log(note)

    // Adding the note to the array on note.service.ts
    this.noteService.addNote(note)
  }

}
