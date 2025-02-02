import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/Services/authentication.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(private http: AuthenticationService){}
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
