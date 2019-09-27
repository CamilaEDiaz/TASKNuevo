import { Injectable } from '@angular/core';
import {Task} from '../models/task';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { MessageService } from '../message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
const httpOptions={
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})

export class TaskDataService {
  private taskUrl= 'api/tasks';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  
  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }
    
    add (task: Task): Observable<Task> {
      return this.http.post<Task>(this.taskUrl, task, this.httpOptions).pipe(
        tap((newTask: Task) => this.log(`added task w/ id=${newTask.id}`)),
        catchError(this.handleError<Task>('add'))
      );
    }

    getTask(): Observable<Task[]> {
      return this.http.get<Task[]>(this.taskUrl).pipe(
        tap(tasks => {
          return this.log('Consulta de Tareas');
        }),
        catchError(this.handleError<Task[]>('getTask', [])));
    }
  
  seeachTask(id: number): Observable<Task> {
    const url = `${this.taskUrl}/${id}`;
    return this.http.get<Task>(url).pipe(
      tap(_ => this.log(`fetched task id=${id}`)),
      catchError(this.handleError<Task>(`getTask id=${id}`))
    );
  }
  /** PUT: update the Task on the server */
update (task: Task): Observable<any> {
  const url = `${this.taskUrl + 'api/Task'}/${task.id}`;
  return this.http.put(url, task, httpOptions).pipe(
  tap(_ => this.log(`updated task id=${task.id}`)),
  catchError(this.handleError<any>('task'))
  );
  }

 

  
  private log(message: string) {
    this.messageService.add(`TaskDataService: ${message}`);
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
