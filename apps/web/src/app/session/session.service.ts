import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Message } from '@seraphine/api-interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  constructor(private http: HttpClient) {}

  hello(): Observable<Message> {
    return this.http.get<Message>('/api/hello');
  }
}
