import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Note } from '../shared/note.model';
import { NoteService } from '../shared/note.service';
import { NotificationService } from '../shared/notification.service';

@Component({
  selector: 'app-edit-note',
  templateUrl: './edit-note.component.html',
  styleUrls: ['./edit-note.component.scss']
})
export class EditNoteComponent implements OnInit {

  note!: Note

  constructor(private route: ActivatedRoute, private noteService: NoteService, private router: Router, private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      // alert(todoId)
      const noteId = paramMap.get('id')!
      // console.log(noteId)
      this.note = this.noteService.getNote(noteId)!
      // console.log(note)
    })
  }

  onFormSubmit(form: NgForm) {
    if (form.invalid) return
    this.noteService.updateNote(this.note.id, form.value)
    this.router.navigateByUrl("/notes")
    this.notificationService.show('Updated note!')

  }

  deleteNote() {
    this.noteService.deleteNote(this.note.id)
    this.router.navigateByUrl("/notes")
    this.notificationService.show('Deleted Note!')

  }

}
