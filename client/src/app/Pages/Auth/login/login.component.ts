import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/Services/authentication.service';
import Swal  from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private http: AuthenticationService, private router: Router){}
  email! : string;
  password!: string;
  handleSignIn(){
    const login = {
      email: this.email,
      password: this.password
    }
    this.http.handleSignIn(login).subscribe({
      next: (response: any) => {
        if(response.status === 200) {
          Swal.fire({
            title: 'Success!',
            text: response.message,
            icon: 'success',
            confirmButtonText: 'Great!'
          });
          this.router.navigate(['/home']);
        }
      },
      error: (response: any) => {
        if(response.status === 401) {
          Swal.fire({
            title: 'Error!',
            titleText: 'Unauthorized',
            text: response.error.message,
            icon: 'error',
            confirmButtonText: 'Okay!'
          });
        } else if (response.status === 422){
          Swal.fire({
            title: 'Error!',
            titleText: 'Unprocessable Content',
            text: response.error.message,
            icon: 'error',
            confirmButtonText: 'Okay!'
          });
        }
      }
    })
  }
}
