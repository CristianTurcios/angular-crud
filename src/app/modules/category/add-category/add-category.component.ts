import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { CategoryService } from 'src/app/services/category.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {
  addForm: FormGroup;
  submitted: boolean = false;

  constructor(
    private data: DataService,
    private categoryService: CategoryService,
    private formBuilder: FormBuilder,
    private router: Router,
  ) { }

  ngOnInit() {
    this.data.changeTitle('Add Category');

    this.addForm = this.formBuilder.group({
      id: [],
      name: ['', Validators.required],
    });
  }

  onSubmit() {
    this.submitted = true;

    if (this.addForm.valid) {
      this.categoryService.addCategory(this.addForm.value).subscribe(data => {
          this.router.navigate(['/list-category']);
      });
    }
  }

  get f() { return this.addForm.controls; }
}
