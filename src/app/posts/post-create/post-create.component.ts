import { Component, OnInit } from '@angular/core';
import {Posts} from '../post-model';
import { NgForm } from '@angular/forms';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { PostService } from '../post.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
// import { Labels } from '../label-model';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-post-create',
  templateUrl:'./post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit{
  // labels: Labels[]=[];
  enteredContent='';
  enteredTitle='';
  selected='';
  private mode='create';
  private postId: string;
  private labelSub: Subscription;
  post: Posts;
  oldDate= new Date();
  minDate= new Date(this.oldDate.toDateString());

  constructor(public postsService: PostService, public label:PostService, public route: ActivatedRoute){}

  ngOnInit(){
    // this.label.getLabels();
        // this.labelSub=this.label.getLabelUpdateListener().subscribe((labels: Labels[])=>{
        //   this.labels=labels;
        //   console.log("final labels: "+JSON.stringify(this.labels))
        // });
    this.route.paramMap.subscribe((paramMap: ParamMap)=>{
      if(paramMap.has('postId')){
        this.mode='edit';
        this.postId=paramMap.get('postId');
        this.postsService.getPost(this.postId).subscribe(postData=>{
          this.post={id: postData._id, title: postData.title, content: postData.content, label: postData.label, duedate: postData.duedate, completed: postData.completed};
        });
      }
      else{
        this.mode='create';
        this.postId=null;
      }
    });
  }
  onSavePost(form: NgForm){
    if(form.invalid){
      return;
    }
    if(this.mode==='create'){
      if((form.value.picker<this.minDate)){
        console.log(this.minDate);
        console.log(form.value.picker);
        alert('Enter a date today or later');
        return;
      }
      this.postsService.addPost(form.value.title,form.value.content,form.value.label, form.value.picker, form.value.completed);
      console.log("new post: "+form.value.title+", "+form.value.label+", "+form.value.picker);
      form.resetForm();
    }
    else{
      this.postsService.updatePost(this.postId,form.value.title,form.value.content,form.value.label, form.value.picker, form.value.completed);
    }
    alert("Post saved successfully");
  }
}
