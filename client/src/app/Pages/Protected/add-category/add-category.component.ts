import { Component } from '@angular/core';
import { ProtectedService } from 'src/app/Services/protected.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent {
  constructor(private http: ProtectedService){}
  name!: string;
  description!: string;
  addCategory(){
    const category = {
      name: this.name,
      description: this.description
    }
    this.http.addCategory(category).subscribe({
      next: (response:any) => {
        if(response.status === 200) {
          Swal.fire({
            title: 'Success!',
            text: response.message,
            icon: 'success',
            confirmButtonText: 'Ok'
          });
          this.name = '';
          this.description = '';
        }
      },
      error: (response: any) => {
        if(response.status === 422) {
          Swal.fire({
            title: response.errors,
            text: response.message,
            icon: 'error',
            confirmButtonText: 'Okay!'
          });
        } else if(response.status === 401) {
          Swal.fire({
            title: response.errors,
            text: response.message,
            icon: 'error',
            confirmButtonText: 'Okay!'
          });
        }
      }
    })
  }
}
