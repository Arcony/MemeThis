import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';


import { AuthService } from './../../services/auth.service';
import { PostService } from 'src/app/services/post.service';

import { User } from '../../models/user.model';
import { Post } from '../../models/post.model';





@Component({
  selector: 'app-browser',
  templateUrl: './browser.component.html',
  styleUrls: ['./browser.component.scss']
})
export class BrowserComponent implements OnInit {

  posts : Post[];
  post : Post;

  constructor(private router: Router, private postService: PostService,) { }

  ngOnInit() {
    this.fetchPosts();
  }

  fetchPosts() {
    this.postService
    .getPostsAndMemes()
    .subscribe((data: Post[] ) =>{
        this.posts = data;
    });
  }

  countPostMemes(postId) {
    this.postService
    .countPostMemes(postId)
    .subscribe((data: string ) =>{
        return data;
    });
  }

}
