import { Component, OnInit, ViewChild, ElementRef  } from '@angular/core';
import { ModalModule, WavesModule, InputsModule } from 'angular-bootstrap-md'
import { FormGroup, FormBuilder, Validators } from '@angular/forms';;
import { AuthService } from './../../services/auth.service';
import { PostService } from './../../services/post.service';

import { Router } from '@angular/router';
import { User } from '../../models/user.model'
import { Meme } from '../../models/meme.model'
import {  ReactiveFormsModule, FormControl, FormsModule } from '@angular/forms';
import { Post } from 'src/app/models/post.model';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  form: FormGroup;
  post: Post;
  formData:FormData = new FormData();
  errorMsg : String;
  username: String;
  userId: String;
@ViewChild ('form') public formModal: any;
@ViewChild('fileInput') fileInput: ElementRef;

  constructor(private modal : ModalModule, private fb: FormBuilder, private router: Router, private authService: AuthService, private postService: PostService) { 
    this.createForm();
  }

  ngOnInit() {
    this.username =  localStorage.getItem('username');
    this.userId =  localStorage.getItem('userId');

  }

  createForm() {
    this.form = this.fb.group({
      content: null
    });
  }

  uploadPost(title,tag) {
   var date = new Date;

    if( Date.parse(date.toString()) < Date.parse(localStorage.getItem('lastUpdate')) + 60000 ) {
      this.errorMsg = "Please wait a minute to post again."
    }
    else if( !title ) {
      this.errorMsg = "Choose a title for your post"
    }
    else {
      this.postService
          .createPost(title, tag , this.formData)
          .subscribe((data: Post) =>{
            console.log(data);
            if(data) {
            this.post = data;
            this.router.navigate(['post/'+this.post._id]);
            var date = new Date;
            localStorage.setItem("lastUpdate", date.toString());
            this.formModal.hide();
            }
          });
      }
    }
   
      onFileChange(event) {
        let fileList: FileList = event.target.files;
        let file: File = fileList[0]; 
        
        if(file.type != "image/jpg" && file.type != "image/jpeg" && file.type != "image/png")
        {
          this.errorMsg="File extension can't be uploaded"
          return false;
        }
        else
        {
          this.errorMsg=""
          this.formData.append('content', file, file.name);
        }       
      }

}
