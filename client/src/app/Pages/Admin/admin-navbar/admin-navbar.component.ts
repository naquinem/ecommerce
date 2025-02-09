import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/Services/authentication.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-navbar',
  templateUrl: './admin-navbar.component.html',
  styleUrls: ['./admin-navbar.component.css']
})
export class AdminNavbarComponent {
  constructor(private http: AuthenticationService, private router: Router){}
  handleLogout(){
    const logout = {}
    this.http.handleLogout(logout).subscribe({
      next: (response:any) => {
        if(response.status === 200) {
          Swal.fire({
            title: 'Success!',
            icon: 'success',
            confirmButtonText: response.message
          });
          this.router.navigate(['/sign-in']);
        }
      },
      error: (response:any) => {
        Swal.fire({
          title: 'Error!',
          titleText: response.error.message,
          text: 'Unauthorized User or authentication token mismatch',
          icon: 'warning',
          cancelButtonText: 'okay!'
        });
      }
    })
  }
}
