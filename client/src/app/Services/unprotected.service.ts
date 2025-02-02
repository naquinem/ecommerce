import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UnprotectedService {
  private apiUrl = 'http://127.0.0.1:8000/api/read-products';

  constructor(private api: HttpClient) { }

  getProductData() {
    return this.api.get(this.apiUrl);
  }

  // Optional: API supports search
  searchProducts(query: string) {
    return this.api.get(`${this.apiUrl}?search=${query}`);
  }
}
