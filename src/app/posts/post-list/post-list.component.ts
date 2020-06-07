import { Component,  OnInit, OnDestroy } from '@angular/core';
import {Posts} from '../post-model';
import {PostService} from '../post.service';
import {Subscription} from 'rxjs';
import { DatePipe } from '@angular/common';

@Component({
  selector:'app-post-list',
  templateUrl:'./post-list.component.html',
  styleUrls:['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy{
date: Date;
datestring: string;
message: string;
posts: Posts[]=[];
private postSub: Subscription;
postsWork: Posts[]=[];
private postSubWork: Subscription;
postsPersonal: Posts[]=[];
private postSubPersonal: Subscription;
  constructor(public post:PostService, public datepipe: DatePipe){}
  ngOnInit(){
    this.date=new Date();
    this.datestring=this.datepipe.transform(this.date, 'dd/MM/yyyy')
    this.post.getPosts();
    this.postSub=this.post.getPostUpdateListener().subscribe((posts: Posts[])=>{
      this.posts=posts;
      console.log(JSON.stringify(this.posts));

      if (this.datestring<this.posts[0].duedate.toString())
      this.message=this.posts[0].title+" is due in "+this.posts[0].duedate;
    else
      this.message=this.posts[0].title+" is overdue from "+this.posts[0].duedate;
    });

  }
  onDelete(postId: string){
    this.post.deletePost(postId);
  }
  ngOnDestroy(){
    this.postSub.unsubscribe();
  }
}
