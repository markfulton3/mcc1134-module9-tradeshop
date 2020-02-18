import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { map } from 'rxjs/operators';
import { Post } from 'src/app/models/post';
import { Router, Params } from '@angular/router';
 
@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
 
  posts: any;

 
  constructor(public service: PostService, public router: Router) { }
 
  ngOnInit() {
    this.getPostsList();
  }
 
  getPostsList() {
    this.service.getPostsList().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.doc.id,
             title: c.payload.doc.data().title,
             category: c.payload.doc.data().category,
             description: c.payload.doc.data().description,
             imageUrl: c.payload.doc.data().imageUrl,
             location: c.payload.doc.data().location,
             price: c.payload.doc.data().price,
             user: c.payload.doc.data().user
             })
        )
      )
    ).subscribe(posts => {
      this.posts = posts;
    });
  }
 
  viewPost(post) {
    this.router.navigate(['/post-details/' + post.key]);
  }

  editPost(post) {
    this.router.navigate(['/edit-post/' + post.key]);
  }

  deletePosts() {
    this.service.deleteAll();
  }
 
}