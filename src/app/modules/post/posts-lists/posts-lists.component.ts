import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { Post } from 'src/app/models/Post';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-posts-lists',
  templateUrl: './posts-lists.component.html',
  styleUrls: ['./posts-lists.component.scss']
})
export class PostsListsComponent implements OnInit {
  posts: Post[];
  userRole: string;

  constructor(
    private postService: PostService,
    private router: Router,
    private data: DataService,
    private authService: AuthService
  ) {
    this.userRole = this.authService.getUserRole();
   }

  ngOnInit() {
    this.data.changeTitle('Posts');
    this.postService.getPosts().subscribe( (posts: Post[]) => {
      this.posts = posts;
    });
  }

  editPost(postId){
    this.router.navigate(['/edit-post'], { queryParams: { postId: postId } });
  }

  deletePost(postId){
    this.postService.deletePost(postId).subscribe( () => {
      const postIndex = this.posts.findIndex( (post) => post.id === postId);
      this.posts.splice(postIndex, 1);
    });
  }
}
