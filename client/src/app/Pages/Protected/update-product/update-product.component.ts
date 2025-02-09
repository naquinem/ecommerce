import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProtectedService } from 'src/app/Services/protected.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {
  constructor(private http: ProtectedService, private router: Router, private routes: ActivatedRoute){}
  product: any = {};
  image!: File | null;
  name!: string;
  description!: string;
  price: number | null = null;
  quantity: number | null = null;
  error: string | null = null;
  ngOnInit(): void {
    const id = this.routes.snapshot.paramMap.get('id');
    this.http.getProduct(id).subscribe({
      next: (response: any) => {
        if(response.status === 200) {
          this.product = response.product
        }
      },
      error: (error:any) => {
        if(error.status === 404) {
          this.error = error.message
        }
      }
    })
  }
  handleUpdate(){
    const id = this.routes.snapshot.paramMap.get('id');
    const formData = new FormData;
    formData.append('image', this.image as File);
    formData.append('name', this.name);
    formData.append('description', this.description);
    formData.append('price', this.price?.toString() || '');
    formData.append('quantity', this.quantity?.toString() || '');

    this.http.updateProduct(formData,id).subscribe({
      next: (response:any) => {
        if(response.status === 200) {
          Swal.fire({
            title: 'Success',
            text: response.message,
            icon: 'success',
            confirmButtonText: 'Okay'
          });
          this.router.navigate(['/home']);
        }
      }
    })
  }
}
