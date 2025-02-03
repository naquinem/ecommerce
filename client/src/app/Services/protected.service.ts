import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProtectedService {

  constructor(private api: HttpClient) { }

  //For Products http routes
  //View all products
  getProducts(){
    return this.api.get('http://127.0.0.1:8000/api/read-products');
  }
  //View individual product
  getProduct(id:any){
    return this.api.get(`http://127.0.0.1:8000/api/show-product/${id}`);
  }
  //Add product in database
  addProducts(product:any){
    return this.api.post('http://127.0.0.1:8000/api/add-product', product);
  }
  //Update individual product
  updateProduct(product:any,id:any){
    return this.api.put(`http://127.0.0.1:8000/api/update-product/${id}`, product);
  }
  //Delete individual product
  deleteProduct(id:any){
    return this.api.delete(`http://127.0.0.1:8000/api/delete-product/${id}`);
  }


  //For Categories http routes
  //View all categories
  getCategories(){
    return this.api.get('http://127.0.0.1:8000/api/read-categories');
  }
  //View individual product
  getCategory(id:any){
    return this.api.get(`http://127.0.0.1:8000/api/show-category/${id}`);
  }
  //Add category in database
  addCategory(category:any){
    return this.api.post('http://127.0.0.1:8000/api/add-category', category);
  }
  //Update individual category
  updateCategory(category:any,id:any){
    return this.api.get(`http://127.0.0.1:8000/api/update-category/${id}`, category);
  }
}
