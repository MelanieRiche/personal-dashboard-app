import { Injectable, OnDestroy } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { Todo } from './todo.model';


@Injectable({
  providedIn: 'root'
})
export class TodoService implements OnDestroy {
  storageListenSub!: Subscription
  todos: Todo[] = []

  constructor() { 
    this.loadState()

    this.storageListenSub = fromEvent(window, 'storage')
      .subscribe((event: StorageEventInit) => {
      console.log("Storage event fired")
      console.log(event)
        if (event.key === 'todos') this.loadState()
    })
  }

  
  ngOnDestroy() {
    if (this.storageListenSub) this.storageListenSub.unsubscribe()
  }

  getTodos() {
    return this.todos
  }

  getTodo(id: string) {
    return this.todos.find(t => t.id === id)
  }

  addTodo(todo: Todo) {
    this.todos.push(todo)
    this.saveState()
  }

  updateTodo(id:string, updatedTodoFields: Partial<Todo>) {
    const todo = this.getTodo(id)
    Object.assign(todo, updatedTodoFields)
    this.saveState()
  }

  deleteTodo(id: string) {
    const index = this.todos.findIndex(t => t.id === id)
    if (index == -1) return
    
    this.todos.splice(index, 1)
    this.saveState()
  }

  // method to stave the state
  saveState(){
    // convert our Note array into a JSON string and then save it into localstorage
    localStorage.setItem('todos', JSON.stringify(this.todos))
  }

  loadState() {
    try {
      const todosInStorage = JSON.parse(localStorage.getItem('todos')!)
      // if(!todosInStorage) return // if localStorage is null
      this.todos.length = 0 // clear the todos array (while keeping the reference)
      this.todos.push(...todosInStorage)
    } catch (e) {
      console.log('There was an error retrieveing the todo from localStorage')
      console.log(e)
    }
  }
}
