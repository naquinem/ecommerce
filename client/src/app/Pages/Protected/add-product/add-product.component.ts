import { Component, OnInit } from '@angular/core';
import { ProtectedService } from 'src/app/Services/protected.service';
import { UnprotectedService } from 'src/app/Services/unprotected.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  constructor(private protectedhttp: ProtectedService, private unprotectedHttp: UnprotectedService){}
  categories: any [] = [];
  selectedCategory: number | null = null;
  name!: string;
  image!: File | null;
  description!: string;
  price: number | null = null;
  quantity: number | null = null;
  ngOnInit(): void {
    this.unprotectedHttp.getAllCategory().subscribe({
      next: (response:any) => {
        this.categories = response.categories
      }
    })
  }
  addProduct(){
    const formData = new FormData();
    formData.append('category_id', this.selectedCategory?.toString() || '');
    formData.append('image_url', this.image as File);
    formData.append('name', this.name);
    formData.append('description', this.description);
    formData.append('price', this.price?.toString() || '');
    formData.append('quantity', this.quantity?.toString() || '');
    this.protectedhttp.addProducts(formData).subscribe({
      next: (response:any) => {
        Swal.fire({
          title: 'Success!',
          text: response.message,
          icon: 'success',
          confirmButtonText: 'Okay'
        });
        this.selectedCategory = null,
        this.name = '';
        this.image = null;
        this.description = '';
        this.price = null;
        this.quantity = null;

      },
      error: (response:any) => {
        if(response.status === 401) {
          Swal.fire({
            title: 'Error!',
            text: response.message,
            icon: 'error',
            confirmButtonText: 'Okay'
          });
        } else if(response.status === 422) {
          Swal.fire({
            title: 'Error!',
            text: response.error.message,
            icon: 'error',
            confirmButtonText: 'Okay'
          });
        }
      }
    });
  }
  onFileSelected(event: any) {
    this.image = event.target.files[0];
  }
}
