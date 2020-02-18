import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Post } from '../models/post';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private dbPath = '/posts';
  postsRef: AngularFirestoreCollection<Post> = null;
  
  constructor(public db: AngularFirestore) {
    this.postsRef = db.collection(this.dbPath);
  }

  createPost(post: Post) {
    return this.postsRef.add(post);
  }
  
  updatePost(key: string, value: any): Promise<void> {
    return this.postsRef.doc(key).update(value);
  }

  deletePost(key: string): Promise<void>{
    return this.postsRef.doc(key).delete();
  }

  getPostsList(): AngularFirestoreCollection<Post> {
    return this.postsRef;
  }

  getPost(key: string){
    return this.postsRef.doc(key).snapshotChanges();
  }
 
  deleteAll() {
    this.postsRef.get().subscribe(
      querySnapshot => {
        querySnapshot.forEach((doc) => {
          doc.ref.delete();
        });
      },
      error => {
        console.log('Error: ', error);
      });
  }
  
}