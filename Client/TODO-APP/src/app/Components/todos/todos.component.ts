import { Component, OnInit, ViewChild } from '@angular/core';
import { Todo } from 'src/app/Models/Todo';
import { Observable } from 'rxjs/internal/Observable';
import { TodoService } from 'src/app/Services/todo.service';
@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {
  constructor(public todoService: TodoService) { }

  ngOnInit(): void {
    this.todoService.getTodos().subscribe(todos => this.todos = todos);
  }

  todos: Todo[] = [];
  addTodo(formData: any) {
    if (formData.title != "") {
      this.todoService.AddTodo(formData).subscribe(response => {
        this.todoService.getTodos().subscribe(todos => this.todos = todos);
      })
    }
  }
  deleteTodo(todo: Todo) {
    this.todoService.DeleteTodo(todo.id).subscribe(respose => {
      this.todoService.getTodos().subscribe(todos => this.todos = todos);
    });
  }
  complateItem(todo: Todo) {
    todo.completed == 1 ? todo.completed = 0 : todo.completed = 1;
    this.todoService.UpdateTodo(todo).subscribe(respose => {
      this.todoService.getTodos().subscribe(todos => this.todos = todos);
    });
  }
  updateTodo(title: any, todo: Todo, event: any) {
    if (event.keyCode === 13) {
      todo.title = title;
      this.title = title;
      this.selectedId = 0;
      this.todoService.UpdateTodo(todo).subscribe(respose => {
        this.todoService.getTodos().subscribe(todos => this.todos = todos);
      });
    }
  }
  selectedId: number = 0
  title: string = ""
  editTodo(todo: Todo) {
    this.selectedId = todo.id;
    this.title = todo.title;
  }
  cencelEdit() {
    this.selectedId = 0;
  }
}
