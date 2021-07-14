import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Todo } from '../shared/todo.model';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent implements OnInit {

  @Input() todo!: Todo

  @Output() editClick: EventEmitter<void> = new EventEmitter()
  @Output() deleteClick: EventEmitter<void> = new EventEmitter()

  constructor() { }

  ngOnInit(): void {
  }

  onEditClick() {
    // alert("Edit button was clicked")
    this.editClick.emit()
  }

  onDeleteClick() {
    // alert("Delete button was clicked")
    this.deleteClick.emit()
  }

}
