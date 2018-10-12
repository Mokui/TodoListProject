import { Action } from './../action';

import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { MessageService } from './message.service';

import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ActionService {

  private BASE_URL = 'localhost:8080/api/';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  constructor(private http: HttpClient,
  private messageService: MessageService) { }

  getActions(): Observable<Action[]> {
    return this.http.get<Action[]>(this.BASE_URL + 'actions')
    .pipe(
      map(this.extractData));
  }

  getAction(id: number): Observable<Action> {
    return this.http.get<Action>(this.BASE_URL + 'actions/' + id)
    .pipe(
      map(this.extractData));
  }

  addAction (action: Action): Observable<Action> {
    return this.http.post<Action>(this.BASE_URL + 'actions', action, this.httpOptions)
    .pipe(
      // tslint:disable-next-line:no-shadowed-variable
      tap((action) => console.log(`added action w/ id=${action.id}`)),
      catchError(this.handleError<any>('addAction'))
    );
  }

  updateAction (id, action): Observable<Action> {
    return this.http.put(this.BASE_URL + 'actions/' + id, JSON.stringify(action), this.httpOptions).pipe(
      tap(_ => console.log(`updated action id=${id}`)),
      catchError(this.handleError<any>('updateAction'))
    );
  }

  deleteAction (id): Observable<Action> {
    return this.http.delete<any>(this.BASE_URL + 'actions/' + id, this.httpOptions).pipe(
      tap(_ => console.log(`deleted action id=${id}`)),
      catchError(this.handleError<any>('deleteAction'))
    );
  }

  private extractData(res: Response) {
    let body;
    body = res;
    return body || { };
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
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

  /** Log a ActionService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`ActionService: ${message}`);
  }
}
