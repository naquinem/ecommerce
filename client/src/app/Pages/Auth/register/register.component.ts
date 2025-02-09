import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/Services/authentication.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor(private http: AuthenticationService, private router: Router) {}

  name!: string;
  username!: string;
  email!: string;
  password!: string;
  cpassword!: string;

  handleRegister() {
    const register = {
      name: this.name,
      username: this.username,
      email: this.email,
      password: this.password,
      password_confirmation: this.cpassword,
    };

    this.http.handleRegiter(register).subscribe({
      next: (response: any) => {
        if (response.status === 200) {
          Swal.fire({
            title: 'Success!',
            text: response.message,
            icon: 'success',
            confirmButtonText: 'Great!',
          });
          this.router.navigate(['/sign-in']);
        }
      },
      error: (response: any) => {
        if (response.status === 422) {
          Swal.fire({
            title: 'Error!',
            text: response.error.message,
            icon: 'error',
            confirmButtonText: 'Okay',
          });
        }
      },
    });
  }
}
