import { Component } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  name!: string;
  username!: string;
  phone!: string;
  address!: string;
  zipcode!: number;
  email!: string;
  password!: string;
  cpassword!: string;
}
