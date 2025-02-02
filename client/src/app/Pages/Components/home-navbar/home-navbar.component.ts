import { Component, OnInit } from '@angular/core';
import { UnprotectedService } from 'src/app/Services/unprotected.service';

@Component({
  selector: 'app-home-navbar',
  templateUrl: './home-navbar.component.html',
  styleUrls: ['./home-navbar.component.css']
})
export class HomeNavbarComponent implements OnInit {
  searchTerm: string = '';
  allProducts: any[] = [];
  searchResults: any[] = [];

  constructor(private http: UnprotectedService) {}

  ngOnInit() {
    // Fetch all products once
    this.http.getProductData().subscribe((response: any) => {
      this.allProducts = response.product;
      console.log(response);
    });
  }

  searchProducts() {
    const term = this.searchTerm.toLowerCase().trim();

    if (term === '') {
      this.searchResults = [];
      return;
    }

    // Filter products in frontend
    this.searchResults = this.allProducts.filter(product =>
      product.name.toLowerCase().includes(term) ||
      product.description.toLowerCase().includes(term)
    );
  }
}
