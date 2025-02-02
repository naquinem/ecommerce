import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private api: HttpClient) { }
    handleSignIn(login:any){
      return this.api.post('http://127.0.0.1:8000/api/login', login);
    }
    handleRegiter(register:any){
      return this.api.post('http://127.0.0.1:8000/api/register', register);
    }
    handleLogout(logout:any){
      return this.api.post('http://127.0.0.1:8000/api/logout',logout);
    }
}
