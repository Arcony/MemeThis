import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

import { AuthService } from './../../services/auth.service';
import { PostService } from 'src/app/services/post.service';
import { MemeService } from 'src/app/services/meme.service';
import { LikeService } from 'src/app/services/like.service';
import { CommentService } from 'src/app/services/comment.service';
import { UserService } from 'src/app/services/user.service';
import { NotificationService } from 'src/app/services/notification.service';


import { User } from '../../models/user.model';
import { Post } from '../../models/post.model';
import { Meme } from '../../models/meme.model';
import { Comment } from '../../models/comment.model';
import { Notification } from '../../models/notification.model';

@Component({
  selector: 'app-meme',
  templateUrl: './meme.component.html',
  styleUrls: ['./meme.component.scss']
})
export class MemeComponent implements OnInit {

  meme: Meme;
  comments: Comment[];
  userConnected: User;
  message: string;
  replyActivate: number;
  reply: string;
  seeResponse: number;
  constructor(
    private router: Router,
    private notificationService: NotificationService,
    private userService: UserService,
    private commentService: CommentService,
    private likeService: LikeService,
    private postService: PostService,
    private memeService: MemeService,
    private route: ActivatedRoute) {

    notificationService.MemeState$.subscribe(
      response => {
        this.loadPage(response);
      }
    );
  }
  ngOnInit() {
    this.loadPage(this.route.snapshot.paramMap.get('memeId'));
  }

  loadPage(memeId) {
    this.fetchMeme(memeId);
    this.fetchMemeComments(memeId);
    this.userService.getMyself().subscribe((data: User) => {
      this.userConnected = data;
    });
  }

  fetchMeme(memeId) {
    this.memeService
      .getMeme(memeId)
      .subscribe((data: Meme) => {
        this.meme = data;
      });
  }

  fetchMemeComments(memeId) {
    this.comments = null;
    this.commentService
      .getMemeComments(memeId)
      .subscribe((data: Comment[]) => {
        this.message = '';
        this.comments = data;
      });
  }

  newCommentComment(text, commentId, indexReplyBox) {
    const memeId = this.meme._id;
    const postId = this.meme.postId;
    this.commentService
      .newCommentComment(memeId, postId, text, commentId)
      .subscribe((data: Comment) => {

        this.fetchMemeComments(memeId);
        this.activeResponse(indexReplyBox);
      });
  }

  newCommentMeme(text) {
    const memeId = this.meme._id;
    const postId = this.meme.postId;
    this.commentService
      .newComment(memeId, postId, text)
      .subscribe((data: Comment) => {
        this.fetchMemeComments(memeId);
        this.notificationService
          .createNotificationForComment(this.meme.userId, this.meme.postId, data._id, this.meme._id)
          .subscribe((retour: Notification) => {
          });
      });
  }

  activeReply(value, replyTarget) {
    if (value !== this.replyActivate) {
      this.replyActivate = value;
      this.reply = '@' + replyTarget;
    }
  }

  activeResponse(value) {
    this.seeResponse = value;
    this.replyActivate = -1;
    this.reply = '';
  }
}
