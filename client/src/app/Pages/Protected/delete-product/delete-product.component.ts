import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProtectedService } from 'src/app/Services/protected.service';

@Component({
  selector: 'app-delete-product',
  templateUrl: './delete-product.component.html',
  styleUrls: ['./delete-product.component.css']
})
export class DeleteProductComponent implements OnInit {
  product: any = {};  // Change to an object to store the product
  error: string | null = null;

  constructor(
    private http: ProtectedService,
    private routes: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.routes.snapshot.paramMap.get('id');
    if (id) {
      this.http.getProduct(id).subscribe({
        next: (response: any) => {
          if (response.status === 200) {
            this.product = response.product;  // Assuming response.product is an object
            console.log(this.product);
          }
        },
        error: (error: any) => {
          if (error.status === 404) {
            this.error = error.message;
          }
        }
      });
    }
  }

  handleDelete(): void {
    const id = this.routes.snapshot.paramMap.get('id');
    if (id) {
      this.http.deleteProduct(id).subscribe({
        next: (response: any) => {
          if (response.status === 200) {
            this.router.navigate(['/home/view-products']);
          }
        },
        error: (error: any) => {
          this.error = error.message
        }
      });
    }
  }
}
