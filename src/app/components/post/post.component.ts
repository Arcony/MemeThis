import { Component, OnInit , Input, Output, EventEmitter} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

import { AuthService } from './../../services/auth.service';
import { PostService } from 'src/app/services/post.service';
import { MemeService } from 'src/app/services/meme.service';


import { User } from '../../models/user.model';
import { Post } from '../../models/post.model';
import { Meme } from '../../models/meme.model';


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  memes : Meme[];
  post : Post;
  postId : string;
  postContent : string;
  message:string;
  that = this;

  constructor(private router: Router, private postService: PostService, private memeService: MemeService, private route: ActivatedRoute) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.fetchPost(id);
    this.postId = id;
    this.fetchMemes(this.postId);
  }

  fetchPost(id) {
    this.postService
    .getPost(id)
    .subscribe((data: Post ) => {
        this.post = data; 
        this.postContent = data.content;     
        
    }); 
  }

  fetchMemes(id) {
    this.memeService
    .getMemes(id)
    .subscribe((data: Meme[] ) => {
        this.memes = data;
    });
  }

  receiveMessage($event) {
    this.fetchMemes($event);
  }
  
}
