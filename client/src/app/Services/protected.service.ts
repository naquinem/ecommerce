import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProtectedService {

  constructor(private api: HttpClient) { }
  //Add product in database
  addProducts(product:any){
    return this.api.post('http://127.0.0.1:8000/api/add-product', product);
  }
  //Add category in database
  addCategory(category:any){
    return this.api.post('http://127.0.0.1:8000/api/add-category', category);
  }
  //View all products
  getProducts(){
    return this.api.get('http://127.0.0.1:8000/api/read-products');
  }
  //View all categories
  getCategories(){
    return this.api.get('http://127.0.0.1:8000/api/read-products');
  }
}
