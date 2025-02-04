import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProtectedService } from 'src/app/Services/protected.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-delete-category',
  templateUrl: './delete-category.component.html',
  styleUrls: ['./delete-category.component.css']
})
export class DeleteCategoryComponent implements OnInit {
  constructor(private http: ProtectedService, private routes: ActivatedRoute, private router: Router){}
  category: any = {}
  error!: string;
  ngOnInit(): void {
    const id = this.routes.snapshot.paramMap.get('id');
    this.http.getCategory(id).subscribe({
      next: (response:any) => {
        if(response.status === 200) {
          this.category = response.category
        }
      },
      error: (error:any) => {
        if(error.status === 404) {
          this.error = error.message
        }
      }
    })
  }
  handleDelete(){
    const id = this.routes.snapshot.paramMap.get('id');
    this.http.deleteCategory(id).subscribe({
      next: (response:any) => {
        if(response.status === 200) {
          Swal.fire({
            title: 'Success!',
            text: response.message,
            icon: 'success',
            confirmButtonText: 'Okay'
          });
          this.router.navigate(['/home/view-categories']);
        }
      },
      error: (error:any) => {
        if(error.status === 404) {
          Swal.fire({
            title: 'Error!',
            text: error.message,
            icon: 'error',
            confirmButtonText: 'Error'
          });
          this.router.navigate(['/home/view-categories']);
        }
      }
    })
  }
}
