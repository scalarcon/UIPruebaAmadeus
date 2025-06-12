import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Employee } from '../Interfaces/Employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private endPoint: string = environment.endPoint;
  private apiUrl: string = this.endPoint + "Employee/"

    constructor(private http: HttpClient) { }

    getEmployees(): Observable<Employee[]> {
      const headers =
      {
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
        'accept': '*/*',
        'My-Custom-Header': 'foobar'
      };

      return this.http.get<Employee[]>(`${this.apiUrl}GetEmployees`, { headers });
    }

    deleteEmployed(id: number): Observable<Employee[]> {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
        'accept': '*/*',
        'My-Custom-Header': 'foobar'
      });
    
      return this.http.put<Employee[]>(
        `${this.apiUrl}DeleteEmployeeById`,
        id ,
        { headers }
      );
    }
    

    editEmployed(employeeDTO: Employee): Observable<Employee[]> {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
        'accept': '*/*',
        'My-Custom-Header': 'foobar'
      });
    
      return this.http.put<Employee[]>(
        `${this.apiUrl}EditEmployee`,
        employeeDTO,
        { headers }
      );
    }

    createEmployee(employeeDTO: Employee): Observable<Employee[]> {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
        'accept': '*/*',
        'My-Custom-Header': 'foobar'
      });
    
      return this.http.post<Employee[]>(
        `${this.apiUrl}RegisterEmployee`,
        employeeDTO,
        { headers }
      );
    }

}
