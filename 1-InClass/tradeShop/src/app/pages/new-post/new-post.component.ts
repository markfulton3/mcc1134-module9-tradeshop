import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss']
})
export class NewPostComponent implements OnInit {

  createForm: FormGroup;

  validation_messages = {
   'title': [
     { type: 'required', message: 'Title is required.' }
   ],
   'category': [
     { type: 'required', message: 'Category is required.' }
   ],
   'description': [
     { type: 'required', message: 'Description is required.' },
   ],
   'price': [
     { type: 'required', message: 'Price is required.' },
   ]
 };

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private router: Router,
    public service: PostService
  ) { }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.createForm = this.fb.group({
      title: ['', Validators.required ],
      category: ['', Validators.required ],
      description: ['', Validators.required ],
      imageUrl: [''],
      location: [''],
      price: ['', Validators.required ],
      user: ['']
    });
  }

  resetFields(){
    this.createForm = this.fb.group({
      title: new FormControl('', Validators.required),
      category: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      imageUrl: new FormControl(''),
      location: new FormControl(''),
      price: new FormControl('', Validators.required),
      user: new FormControl('')
    });
  }

  onSubmit(value){
    this.service.createPost(value)
    .then(
      res => {
        this.resetFields();
        this.router.navigate(['/home']);
      }
    )
  }

}