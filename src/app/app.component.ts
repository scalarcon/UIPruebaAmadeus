import { Component, OnInit } from '@angular/core';
import { EmailValidator, Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from './Interfaces/User';
import { Employee } from './Interfaces/Employee';
import { UserService } from './Services/user.service';
import { EmployeeService } from './Services/employee.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  user?: User;
  employees?: Employee[];
  formUser: FormGroup;
  formEmployee: FormGroup;
  isOpenEdit = false
  idEdit = 0

  constructor(private _userService: UserService, private _fbUser: FormBuilder,
    private _employeeService: EmployeeService, private _fbEmployee: FormBuilder) {
    this.formUser = this._fbUser.group({
      Email: ['', Validators.required],
      Password: ['', Validators.required]
    });

    this.formEmployee = this._fbEmployee.group({
      Name: ['', Validators.required],
      Email: ['', Validators.required],
      PhoneNumber: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    localStorage.setItem('jwt', '')
  }

  login() {
    const request: User = {
      Email: this.formUser.value.Email,
      Password: this.formUser.value.Password,
    };

    this._userService.validateLogin(request).subscribe({
      next: ((data: any) => {
        if (data.isSuccess === true) {
          localStorage.setItem('jwt', data.token)
          alert('Inicio sesión');
          this.loadEmploye();
        } else {
          alert('Credenciales no validas');
        }

        this.formUser.patchValue({
          Email: "",
          Password: ""
        })
      })
    })
  }

  validateSession() {
    if (localStorage.getItem('jwt')) {
      return true
    } else {
      return false
    }
  }

  editEmployed(Employee: Employee) {
    const btn = document.getElementById('btnOpenEditModal');
    if (btn) {
      btn.click();
    }

    this.idEdit = Employee.id
    this.formEmployee.patchValue(
      {
        Name: Employee.name,
        Email: Employee.email,
        PhoneNumber: Employee.phoneNumber
      });
  }

  deleteEmployed(Employee: Employee) {
    this._employeeService.deleteEmployed(Employee.id).subscribe({
      next: (data: any) => {
        const btn = document.getElementById('btnOpenEditModalClose');
        if (btn) {
          btn.click();
        }
        if (data.isSuccess === true) {
          this.loadEmploye();
          alert(`se elimino al usuario ${Employee.name} correctamente`)
        }
      }
    });
  }

  saveEdit() {
    this.formEmployee.value.Id = this.idEdit;
    this.formEmployee.value.PhoneNumber = String(this.formEmployee.value.PhoneNumber);
    this._employeeService.editEmployed(this.formEmployee.value).subscribe({
      next: (data: any) => {
        if (data.isSuccess === true) {
          this.loadEmploye();
          alert('Editado correctamente');
        }
      }
    });
  }

  closeEditModal() {
    this.isOpenEdit = false;
  }

  loadEmploye() {
    this._employeeService.getEmployees().subscribe({
      next: (data2: any) => {
        if (data2.value.length > 0) {
          this.employees = data2.value;
        }
      }
    });
  }

  createEmployee() {
    if (this.formEmployee.valid) {
      this.formEmployee.value.PhoneNumber = String(this.formEmployee.value.PhoneNumber);
      this._employeeService.createEmployee(this.formEmployee.value).subscribe({
        next: (data: any) => {
          if (data.isSuccess === true) {
            this.loadEmploye();
            alert('Agregado correctamente');
          }

          this.formEmployee.patchValue({
            Name: "",
            Email: "",
            PhoneNumber: ""
          })
        }
      });


    }
  }

  createUser() {
    const request: User = {
      Email: this.formUser.value.Email,
      Password: this.formUser.value.Password,
    };

    this._userService.createUser(request).subscribe({
      next: (data: any) => {
        if (data.isSuccess === true) {
          alert('Agregado correctamente');
        } else {

          if (data.mensaje) {
            alert(data.mensaje)

          }
        }

        this.formUser.patchValue({
          Email: "",
          Password: ""
        })
      }
    });

  }

}
