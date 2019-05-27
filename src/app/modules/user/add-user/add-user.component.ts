import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  addForm: FormGroup;
  submitted: boolean;

  constructor(
    private data: DataService,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router,
  ) {
    this.submitted = false;
   }

  ngOnInit() {
    this.data.changeTitle('Add User');

    this.addForm = this.formBuilder.group({
      id: [],
      username: ['', Validators.required],
      password: ['', Validators.required],
      role: [[], Validators.required]
    });
  }

  onSubmit() {
    this.submitted = true;
    console.log(this.addForm.value);

    if (this.addForm.valid) {
      this.userService.addUser(this.addForm.value).subscribe(data => {
        this.router.navigate(['/list-user']);
      });
    }
  }

  get f() { return this.addForm.controls; }
}
