import { Component, OnInit } from '@angular/core';
import { ProtectedService } from 'src/app/Services/protected.service';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-products',
  templateUrl: './view-products.component.html',
  styleUrls: ['./view-products.component.css'],

})
export class ViewProductsComponent implements OnInit {
  constructor(private http: ProtectedService, private router: Router){}
  products: any [] = [];
  error: string|null = null;
  ngOnInit(): void {
    this.http.getProducts().subscribe({
      next: (response:any) => {
        if(response.status === 200) {
          this.products = response.products
        }
      },
      error: (error:any) => {
        if(error.status === 404) {
          this.error= error.message
        }
      }
    });
  }
}
