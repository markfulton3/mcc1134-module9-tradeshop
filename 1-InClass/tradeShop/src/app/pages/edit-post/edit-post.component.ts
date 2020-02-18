import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { PostService } from '../../services/post.service';
import { Post } from 'src/app/models/post';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss']
})
export class EditPostComponent implements OnInit {

  editForm: FormGroup;
  post: any;
  postKey: string;

  validation_messages = {
   'title': [
     { type: 'required', message: 'Title is required.' }
   ],
   'category': [
     { type: 'required', message: 'Category is required.' }
   ],
   'description': [
     { type: 'required', message: 'Description is required.' },
   ]
 };

 constructor(
  public service: PostService,
  private route: ActivatedRoute,
  private fb: FormBuilder,
  private router: Router
) {
    this.postKey = route.snapshot.params.id;
 }

  ngOnInit() {
    this.resetFields();
    this.getPost();
  }

  getPost(){
    this.service.getPost(this.postKey)
        .subscribe(result => {
            this.post = result.payload.data();
            this.post.key = result.payload.id;
            this.buildForm();
        });
      
  }

  buildForm() {
    const data = this.post;
    this.editForm = this.fb.group({
      title: [data.title, Validators.required ],
      category: [data.category, Validators.required ],
      description: [data.description, Validators.required ],
      imageUrl: [data.imageUrl],
      location: [data.location],
      price: [data.price],
      user: [data.user]
    });
  }

  resetFields(){
    this.editForm = this.fb.group({
      title: new FormControl('', Validators.required),
      category: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      imageUrl: [''],
      location: [''],
      price: [''],
      user: ['']
    });
  }

  onSubmit(value){
    this.service.updatePost(this.post.key, value)
    .then(
      res => {
        this.router.navigate(['/home']);
      }
    )
  }

  delete(){
    this.service.deletePost(this.post.key)
    .then(
      res => {
        this.router.navigate(['/home']);
      }
    )
  }

  cancel() {
    this.router.navigate(['/home']);
  }

}