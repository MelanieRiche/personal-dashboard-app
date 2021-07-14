import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { TabsComponent } from './tabs/tabs.component';
import { BookmarksComponent } from './bookmarks/bookmarks.component';
import { NotesComponent } from './notes/notes.component';
import { TodosComponent } from './todos/todos.component';
import { BookmarkTileComponent } from './bookmark-tile/bookmark-tile.component';

import { RouterModule } from '@angular/router';
import { AddNoteComponent } from './add-note/add-note.component';
import { NoteCardComponent } from './note-card/note-card.component';
import { TodoItemComponent } from './todo-item/todo-item.component';
import { AddTodoComponent } from './add-todo/add-todo.component';

@NgModule({
  declarations: [
    AppComponent,
    TabsComponent,
    BookmarksComponent,
    NotesComponent,
    TodosComponent,
    BookmarkTileComponent,
    AddNoteComponent,
    NoteCardComponent,
    TodoItemComponent,
    AddTodoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
