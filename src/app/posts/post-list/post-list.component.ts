import { Component,  OnInit, OnDestroy } from '@angular/core';
import {Posts} from '../post-model';
import {PostService} from '../post.service';
import {Subscription} from 'rxjs';

@Component({
  selector:'app-post-list',
  templateUrl:'./post-list.component.html',
  styleUrls:['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy{
  // posts=[
  //   {title:'First Post', content:'This is the first post\'s content'},
  //   {title:'Second Post', content:'This is the second post\'s content'},
  //   {title:'Third Post', content:'This is the third post\'s content'}
  // ]
posts: Posts[]=[];
private postSub: Subscription;
  constructor(public post:PostService){}
  ngOnInit(){
    this.post.getPosts();
    this.postSub=this.post.getPostUpdateListener().subscribe((posts: Posts[])=>{
      this.posts=posts;
    })
  }
  onDelete(postId: string){
    this.post.deletePost(postId);
  }
  ngOnDestroy(){
    this.postSub.unsubscribe();
  }
}
