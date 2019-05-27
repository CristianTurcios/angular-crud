import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { Category } from 'src/app/models/Category';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {
  categories: Category[];
  constructor(
    private categoryService: CategoryService,
    private router: Router,
    private data: DataService
  ) { }

  ngOnInit() {
    this.data.changeTitle('Category');
    this.categoryService.getCategories().subscribe((categories: Category[]) => {
      this.categories = categories;
    });
  }

  editCategory(categoryId) {
    this.router.navigate(['/edit-category'], { queryParams: { categoryId: categoryId } });
  }

  deleteCategory(categoryId) {
    this.categoryService.deletePost(categoryId).subscribe(() => {
      const postIndex = this.categories.findIndex((category) => category.id === categoryId);
      this.categories.splice(postIndex, 1);
    });
  }

}
