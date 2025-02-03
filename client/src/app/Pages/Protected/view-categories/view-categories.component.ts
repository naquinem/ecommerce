import { Component, OnInit } from '@angular/core';
import { ProtectedService } from 'src/app/Services/protected.service';

@Component({
  selector: 'app-view-categories',
  templateUrl: './view-categories.component.html',
  styleUrls: ['./view-categories.component.css']
})
export class ViewCategoriesComponent implements OnInit {
  constructor(private http: ProtectedService){}
  categories: any [] = [];
  error: string|null = null;
  ngOnInit(): void {
    this.http.getCategories().subscribe({
      next: (response:any) => {
        if(response.status === 200) {
          this.categories = response.categories
        }
      },
      error: (error:any) => {
        this.categories = error.message
      }
    });
  }
}
