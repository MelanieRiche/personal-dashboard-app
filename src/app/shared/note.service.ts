import { Injectable, OnDestroy } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { Note } from './note.model';

@Injectable({
  providedIn: 'root'
})
export class NoteService implements OnDestroy {

  notes: Note[] = []
  storageListenSub!: Subscription

  constructor() { 
    this.loadState()

    this.storageListenSub = fromEvent(window, 'storage')
      .subscribe((event: StorageEventInit) => {
      console.log("Storage event fired")
      console.log(event)
        if (event.key === 'notes') this.loadState()
    })
  }

  ngOnDestroy() {
    if (this.storageListenSub) this.storageListenSub.unsubscribe()
  }

  getNotes() {
    return this.notes
  }

  getNote(id: string) {
    return this.notes.find(n =>  n.id === id) 
    // return true when n.id equal the id passed into this method
  }

  addNote(note: Note) {
    this.notes.push(note)
    this.saveState()
  }

  updateNote(id: string, updatedFields: Partial<Note>) {
    // get the note object that needs an update by targeting the id
    const note = this.getNote(id)
    // Pass/Assign the updateFields
    Object.assign(note, updatedFields)
    this.saveState()
  }

  deleteNote(id: string) {
    // Find the index of the note we want to delete
    const noteIndex = this.notes.findIndex(n => n.id === id)
    // with the findIndex function if noteIndex can't be found it equals -1 
      if (noteIndex == -1) return
    // And remove it if the note index can be found
    this.notes.splice(noteIndex, 1)
    this.saveState()
  }

  // method to stave the state
  saveState(){
    // convert our Note array into a JSON string and then save it into localstorage
    localStorage.setItem('notes', JSON.stringify(this.notes))
  }

  loadState() {
    try {
      const notesInStorage = JSON.parse(localStorage.getItem('notes')!)
      // if(!notesInStorage) return // if localStorage is null
      this.notes.length = 0 // clear the notes array (while keeping the reference)
      this.notes.push(...notesInStorage)
    } catch (e) {
      console.log('There was an error retrieveing the note from localStorage')
      console.log(e)
    }
  }
} 
