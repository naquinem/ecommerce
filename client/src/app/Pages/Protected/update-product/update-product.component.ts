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
  image!: File | null;
  name!: string;
  description!: string;
  price: number | null = null;
  quantity: number | null = null;
  product: any = {
    name: this.name,
    description: this.description,
    price: this.price,
    quantity: this.quantity
  };
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
    const formData = {
      name: this.product.name,
      description: this.product.description,
      price: this.product.price,
      quantity: this.product.quantity
    };
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
  onFileSelected(event: any) {
    this.image = event.target.files[0];
  }
}
