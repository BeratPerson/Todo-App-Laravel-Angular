import { Injectable } from '@angular/core';
import { Todo } from 'src/app/Models/Todo';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { ApiUrl } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})

export class TodoService {
  constructor(private http: HttpClient) { }



  todos: Todo[] = [];
  headers = { 'content-type': 'application/json' }

  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(ApiUrl + "/todo")
  }
  getSingleTodo(): Observable<Todo> {
    return this.http.get<Todo>(ApiUrl + "/todo")
  }
  AddTodo(formData: Todo): Observable<Todo> {
    return this.http.post<Todo>(ApiUrl + "/todo/create", formData, { 'headers': this.headers })
  }
  DeleteTodo(id: number): Observable<any> {
    console.log(id)
    return this.http.delete(ApiUrl + "/todo/delete/" + id, { 'headers': this.headers })
  }
  UpdateTodo(todo: Todo): Observable<Todo> {
    return this.http.put<Todo>(ApiUrl + "/todo/update/"+todo.id, todo, { 'headers': this.headers })

  }

}
