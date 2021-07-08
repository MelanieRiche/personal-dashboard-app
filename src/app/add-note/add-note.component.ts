import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.scss']
})
export class AddNoteComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  onFormSubmit(form: NgForm) {
    // alert("Form has been submitted!")
    console.log(form)
  }

}
