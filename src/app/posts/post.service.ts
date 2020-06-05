import {Posts} from './post-model';
import {Labels} from './label-model';

import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({providedIn: "root"})
export class PostService{
  private posts: Posts[]=[];
  private labels: Labels[]=[];
  private postsUpdated= new Subject<Posts[]>();
  private labelsUpdated= new Subject<Labels[]>();
  constructor(private http: HttpClient){}
  getPosts(){
      this.http.get<{message:string,posts:any}>('http://localhost:3000/api/posts')
      .pipe(map((postData)=>{
        return postData.posts.map(post=>{
          return {
          title: post.title,
          content: post.content,
          id:post._id,
          label: post.label
        };
      });
      }))
      .subscribe((transformedposts)=>{
      this.posts=transformedposts;
      this.postsUpdated.next([...this.posts]);
    });
  }
  getLabels(){
    this.http.get<{message:string,labels:any}>('http://localhost:3000/api/labels')
    .pipe(map((labelData)=>{
      return labelData.labels.map(label=>{
        return {
        name: label.name,
      };
    });
    }))
    .subscribe((transformedlabels)=>{
    this.labels=transformedlabels;
    this.labelsUpdated.next([...this.labels]);
  });
}
  getPostUpdateListener(){
    return this.postsUpdated.asObservable();
  }
  getLabelUpdateListener(){
    return this.labelsUpdated.asObservable();
  }

  getPost(id: string){
    return this.http.get<{_id: string, title: string, content: string, label: string}>("http://localhost:3000/api/posts/" + id);
  }

  addPost(title: string, content: string, label: string){
    const post={id:null, title: title, content: content, label: label};

    this.http
    .post<{message: string, postId: string}>('http://localhost:3000/api/posts', post).subscribe(responseData=>{
      console.log(responseData.message);
      const id = responseData.postId;
      post.id = id;
      this.posts.push(post);
      this.postsUpdated.next([...this.posts]);
    });

  }
  addLabel(title: string){
    const post={id:null, name: title};

    this.http
    .post<{message: string, postId: string}>('http://localhost:3000/api/labels', post).subscribe(responseData=>{
      console.log(responseData.message);
      const id = responseData.postId;
      post.id = id;
      this.labels.push(post);
      this.postsUpdated.next([...this.posts]);
    });

  }
  updatePost(id: string, title:string, content:string, label: string){
    const post={id:id, title: title, content:content, label: label};
    this.http.put("http://localhost:3000/api/posts/" + id, post).subscribe(response=>{
      const updatedPosts= [...this.posts];
      const oldPostIndex= updatedPosts.findIndex(p => p.id===post.id);
      updatedPosts[oldPostIndex]=post;
      this.posts= updatedPosts;
      this.postsUpdated.next([...this.posts]);
    });
  }
  deletePost(postId: string) {
    this.http.delete("http://localhost:3000/api/posts/" + postId)
      .subscribe(() => {
        const updatedPosts= this.posts.filter(post => post.id!==postId);
        this.posts=updatedPosts;
        this.postsUpdated.next([...this.posts]);
     });
  }
}