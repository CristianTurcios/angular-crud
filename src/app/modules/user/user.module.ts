import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddUserComponent } from './add-user/add-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';

@NgModule({
  declarations: [
    AddUserComponent,
    EditUserComponent
  ],
  imports: [
    CommonModule
  ]
})
export class UserModule { }
