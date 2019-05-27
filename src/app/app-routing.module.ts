import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AddPostComponent } from './components/add-post/add-post.component';
import { EditPostComponent } from './components/edit-post/edit-post.component';
import { LoginComponent } from './components/login/login.component';
import { GuardService } from './services/guard.service';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [GuardService],
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'add-post',
    component: AddPostComponent,
    canActivate: [GuardService],
  },
  {
    path: 'add-post',
    component: AddPostComponent,
    canActivate: [GuardService],
  },
  {
    path: 'edit-post',
    component: EditPostComponent,
    canActivate: [GuardService],
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
