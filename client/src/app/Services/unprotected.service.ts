import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UnprotectedService {
  constructor(private api: HttpClient) { }

  getProductData() {
    return this.api.get('http://127.0.0.1:8000/api/read-products');
  }
  getAllCategory() {
    return this.api.get('http://127.0.0.1:8000/api/show-categories');
  }
}
