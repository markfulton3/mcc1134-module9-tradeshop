import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/post';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
 
@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.scss']
})
export class PostDetailsComponent implements OnInit {
 
  post:any;
  postKey: string;
 
  constructor(private service: PostService,private route: ActivatedRoute, private router: Router) { 
    this.postKey = route.snapshot.params.id;
  }
 
  ngOnInit() {
    this.getPost();
  }
 
  getPost(){
    this.service.getPost(this.postKey)
        .subscribe(result => {
            this.post = result.payload.data();
            this.post.key = result.payload.id;
        });
      
  }

  editPost(){
    this.router.navigate(['/edit-post/' + this.postKey ]);
  }
}
