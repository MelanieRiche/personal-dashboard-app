import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  notes: Note[]

  constructor() { }

  getNotes() {
    return this.notes
  }

  getNote(id: string) {
    return this.notes.find(n =>  n.id === id) 
    // return true when n.id equal the id passed into this method
  }

  addNote(note: Note) {
    this.notes.push(note)
  }

  updateNote(id: string, updatedFields: Partial<Note>) {
    // get the note object that needs an update by targeting the id
    const note = this.getNote(id)
    // Pass/Assign the updateFields
    Object.assign(note, updatedFields)
  }

  deleteNote(id: string) {
    // Find the index of the note we want to delete
    const noteIndex = this.notes.findIndex(n => n.id === id)
    // with the findIndex function if noteIndex can't be found it equals -1 
      if (noteIndex == -1) return
    // And remove it if the note index can be found
    this.notes.splice(noteIndex, 1)
  }
} 
