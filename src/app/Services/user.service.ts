import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { User } from '../Interfaces/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private endPoint: string = environment.endPoint;
  private apiUrl: string = this.endPoint + "Access/"

  constructor(private http: HttpClient) { }

  validateLogin(request: User): Observable<any> {
    return this.http.post<User>(`${this.apiUrl}Login`, request);
  }

  createUser(userDTO: User): Observable<User[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
      'accept': '*/*',
      'My-Custom-Header': 'foobar'
    });
  
    return this.http.post<User[]>(
      `${this.apiUrl}RegisterUser`,
      userDTO,
      { headers }
    );
  }
}
