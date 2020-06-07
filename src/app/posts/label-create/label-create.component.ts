// import { Component, OnInit } from '@angular/core';
// import {Posts} from '../post-model';
// import { NgForm } from '@angular/forms';
// import { PostService } from '../post.service';
// import { ActivatedRoute, ParamMap } from '@angular/router';
// import { Labels } from '../label-model';

// @Component({
//   selector: 'app-post-create',
//   templateUrl:'./label-create.component.html',
//   styleUrls: ['./label-create.component.css']
// })
// export class LabelCreateComponent implements OnInit{
//   name='';
//   enteredName='';
//   private mode='create';
//   private postId: string;
//   post: Posts;
//   label: Labels;

//   constructor(public postsService: PostService, public route: ActivatedRoute){}

//   ngOnInit(){
//     this.route.paramMap.subscribe((paramMap: ParamMap)=>{
//       // if(paramMap.has('postId')){
//       //   this.mode='edit';
//       //   this.postId=paramMap.get('postId');
//       //   this.postsService.getPost(this.postId).subscribe(postData=>{
//       //     this.post={id: postData._id, title: postData.title, content: postData.content, label: postData.label};
//       //   });
//       // }
//       // else{
//         this.mode='create';
//         this.postId=null;
//       // }
//     });
//   }
//   onSaveLabel(form: NgForm){
//     if(form.invalid){
//       return;
//     }
//     if(this.mode==='create'){
//       // this.postsService.addLabel(form.value.name);
//       form.resetForm();
//     }
//     // else{
//     //   this.postsService.updatePost(this.postId,form.value.title,form.value.content,form.value.label);
//     // }

//   }
// }
