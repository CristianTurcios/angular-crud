import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  userId: number;
  editForm: FormGroup;
  submitted: boolean;
  user: User;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private data: DataService,
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {
    this.submitted = false;
  }

  ngOnInit() {
    this.data.changeTitle('Edit User');

    console.log('aaaaaaaaaaaaaaa');
    
    this.editForm = this.formBuilder.group({
      id: [],
      username: ['', Validators.required],
      role: [[], Validators.required],
    });

    this.route.queryParams.subscribe(params => {
        const userId = params['userId'];
      console.log('eeeeee', userId);
        
        if (!userId) {
          this.router.navigate(['']);
        }
        this.userId = userId;
        this.userService.getUser(userId).subscribe((user: User) => {
          console.log('user 0000', user);
          this.editForm.patchValue(user);
        })
      });
  }

  onSubmit() {
    this.submitted = true;
    console.log(this.editForm.value)

    if (this.editForm.valid) {
      this.userService.editUser(this.editForm.value)
        .subscribe(data => {
          this.router.navigate(['/list-user']);
        });
    }
  }

  get f() { return this.editForm.controls; }

}
