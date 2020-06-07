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
      for(let i = 0; i < this.posts.length; i++){
        console.log(i);
        if(this.posts[i].completed.localeCompare("Completed")){
          if (this.datestring<=this.posts[i].duedate.toString())
            this.message=this.posts[i].title+" is due in "+this.posts[i].duedate;
          else
            this.message=this.posts[i].title+" is overdue from "+this.posts[i].duedate;
          break;
        }
      }
    });

  }
  onDelete(postId: string){
    this.post.deletePost(postId);
  }
  ngOnDestroy(){
    this.postSub.unsubscribe();
  }
}
