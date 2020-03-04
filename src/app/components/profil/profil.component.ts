import { Component, OnInit , Input, Output, EventEmitter} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import {ViewChild, ElementRef  } from '@angular/core';


import { AuthService } from './../../services/auth.service';
import { PostService } from 'src/app/services/post.service';
import { MemeService } from 'src/app/services/meme.service';
import { LikeService } from 'src/app/services/like.service';
import { UserService } from 'src/app/services/user.service';




import { User } from '../../models/user.model';
import { Post } from '../../models/post.model';
import { Meme } from '../../models/meme.model';


@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})

export class ProfilComponent implements OnInit {
  form: FormGroup;
  id: string;
  userFetch: User;
  userConnected: User;
  errorMsg: String;
  posts: Post[];
  formData: FormData = new FormData();
  tabSelected: number;
  memes: Meme[];
  meme: Meme;
  memesLiked: Meme[];
  files: File[] = [];
  @ViewChild ('form') public formModal: any;
  @ViewChild('fileInput') fileInput: ElementRef;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private userService: UserService,
    private likeService: LikeService,
    private postService: PostService,
    private memeService: MemeService,
    private route: ActivatedRoute) {
    this.createForm();
  }

  ngOnInit() {
    this.id = this.route.snapshot.params.id;
    this.userService.getUser(this.id)
    .subscribe((data: User) => {
      this.userFetch = data;
    });
    this.userService.getMyself().subscribe((data: User) => {
      console.log(data);
      this.userConnected = data;
    });
  }

  createForm() {
    this.form = this.fb.group({
      content: null
    });
  }

  updateProfil(oldPassword, newPassword, newPasswordBis) {
    if ( (oldPassword || newPassword || newPasswordBis) && (!oldPassword || !newPassword || !newPasswordBis) ) {
        this.errorMsg = 'Missing Password Field';
    } else if ( newPassword !== newPasswordBis) {
        this.errorMsg = 'New passwords don\'t match';
    }

    this.userService
          .updateMyself(oldPassword, newPassword , this.formData)
          .subscribe((data: User) => {
            if (data) {
            this.userFetch = data;
            this.files = [];
            } else {
              this.errorMsg = 'error';
            }
          });

  }

  onFileChange(event) {
    this.files.splice(this.files.indexOf(event), 1);
    this.files.push(...event.addedFiles);
    const file: File = event.addedFiles[0];
    if (file.type !== 'image/jpg' && file.type !== 'image/jpeg' && file.type !== 'image/png') {
      this.errorMsg = 'File extension can\'t be uploaded';
      return false;
    } else {
      this.errorMsg = '';
      this.formData.set('picture', null);
      this.formData.set('picture', file, file.name);
    }
  }

  onRemove(event) {
    this.files.splice(this.files.indexOf(event), 1);
  }

  selectTab(value) {
    this.tabSelected = value;
    if (value === 1) {
        this.postService
        .getPostsAndMemesForProfil(this.userFetch.userId)
        .subscribe((data: Post[] ) => {
            this.posts = data;
        });
    }
    if (value === 2) {
      this.memeService
      .getMemesLikesAndCommentsForProfil(this.userFetch.userId)
      .subscribe((data: Meme[] ) => {
          this.memes = data;
      });
    }
    if (value === 3) {
      this.memeService
      .getMemesLikedForProfil(this.userFetch.userId)
      .subscribe((data: Meme[] ) => {
          this.memesLiked = data;
      });
    }
  }

  newLikeMeme(memeId, postId, commentId) {
    this.likeService
    .newLike(memeId, postId, commentId)
    .subscribe((data: Meme ) => {
        this.meme = data;
        this.fetchMemesLikesAndComments(this.userConnected.userId);
    });
  }

  dislikeMeme(memeId, postId, commentId) {
    this.likeService
    .dislike(memeId, postId, commentId)
    .subscribe((data: Meme ) => {
        this.meme = data;
        this.fetchMemesLikesAndComments(this.userConnected.userId);
    });
  }

  newLikeMemeLiked(memeId, postId, commentId) {
    this.likeService
    .newLike(memeId, postId, commentId)
    .subscribe((data: Meme ) => {
        this.meme = data;
        this.fetchLikedMemes();
    });
  }

  dislikeMemeLiked(memeId, postId, commentId) {
    this.likeService
    .dislike(memeId, postId, commentId)
    .subscribe((data: Meme ) => {
        this.meme = data;
        this.fetchLikedMemes();
    });
  }

  fetchMemesLikesAndComments(userId) {
    this.memeService
    .getMemesLikesAndCommentsForProfil(this.userFetch.userId)
    .subscribe((data: Meme[] ) => {
        this.memes = data;

    });
  }

  fetchLikedMemes() {
    this.memeService
    .getMemesLikesAndCommentsForProfil(this.userFetch.userId)
    .subscribe((data: Meme[] ) => {
        this.memes = data;
    });
}

}
