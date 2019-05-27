import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Post } from 'src/app/models/Post';
import { CategoryService } from 'src/app/services/category.service';
import { Category } from 'src/app/models/Category';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent implements OnInit {
  categoryId: number;
  editForm: FormGroup;
  submitted: boolean = false;
  category: Category;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private data: DataService,
    private formBuilder: FormBuilder,
    private categoryService: CategoryService
  ) { }

  ngOnInit() {
    this.data.changeTitle('Edit Category');

    this.editForm = this.formBuilder.group({
      id: [],
      name: ['', Validators.required],
    });

    this.route.queryParams
      .subscribe(params => {
        const categorytId = params['categoryId'];
        if (!categorytId) {
          this.router.navigate(['']);
        }
        this.categoryId = categorytId;
        this.categoryService.getCategory(categorytId).subscribe((category: Category) => {
          this.editForm.patchValue(category);
        })
      });
  }

  onSubmit() {
    this.submitted = true;
    console.log(this.editForm.value)

    if (this.editForm.valid) {
      this.categoryService.editCategory(this.editForm.value)
        .subscribe(data => {
          this.router.navigate(['/list-category']);
        });
    }
  }

  get f() { return this.editForm.controls; }
}
