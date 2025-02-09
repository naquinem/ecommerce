import { Component, OnInit } from '@angular/core';
import { ProtectedService } from 'src/app/Services/protected.service';

@Component({
  selector: 'app-view-category',
  templateUrl: './view-category.component.html',
  styleUrls: ['./view-category.component.css']
})
export class ViewCategoryComponent implements OnInit {
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
