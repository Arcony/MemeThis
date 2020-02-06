import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ModalModule, WavesModule, InputsModule } from 'angular-bootstrap-md';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from './../../services/auth.service';
import { PostService } from './../../services/post.service';
import { Subject } from 'rxjs';

import { Router } from '@angular/router';
import { User } from '../../models/user.model';
import { Meme } from '../../models/meme.model';
import { Notification } from '../../models/notification.model';

import { ReactiveFormsModule, FormControl, FormsModule } from '@angular/forms';
import { Post } from 'src/app/models/post.model';
import { NotificationService } from 'src/app/services/notification.service';
import { routerNgProbeToken } from '@angular/router/src/router_module';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  form: FormGroup;
  post: Post;
  formData: FormData = new FormData();
  errorMsg: String;
  username: String;
  userId: String;
  notificationTrigger: boolean;
  notifications: Notification[];
  newNotifNb: number;



  @ViewChild('form') public formModal: any;
  @ViewChild('fileInput') fileInput: ElementRef;

  constructor(
    private modal: ModalModule,
    private fb: FormBuilder,
    private router: Router,
    private notificationService: NotificationService,
    private authService: AuthService,
    private postService: PostService) {
    this.createForm();
    this.notificationTrigger = false;
    notificationService.navState$.subscribe(
      response => {
        this.getDataLogin();
      }
    );
  }

  getDataLogin() {
    this.username = localStorage.getItem('username');
    this.userId = localStorage.getItem('userId');
    this.getNotificationUser(localStorage.getItem('userId'));
  }
  ngOnInit() {
    if (localStorage.getItem('username')) {
      this.getDataLogin();
    }
  }

  triggerNotification() {
    if (!this.notificationTrigger) {
      this.notificationTrigger = true;
      this.notificationSeeAll();
    } else {
      this.notificationTrigger = false;
    }
  }

  clickNotification(notificationId, seen, itemTarget) {
    if (!seen) {
      this.notificationService
        .notificationClick(notificationId)
        .subscribe((data: Notification) => {
          this.getNotificationUser(data.userId);
          this.notificationService.refreshMeme(data.memeId);

        });
    } else {
      this.router.navigate(['meme/' + itemTarget]);
      this.notificationService.refreshMeme(itemTarget);

    }
  }

  notificationSeeAll() {

    this.notificationService
      .notificationSeeAll()
      .subscribe((data: Notification) => {
        this.getNotificationUser(data.userId);
      });
  }

  createForm() {
    this.form = this.fb.group({
      content: null
    });
  }

  uploadPost(title, tag) {
    const date = new Date;

    if (Date.parse(date.toString()) < Date.parse(localStorage.getItem('lastMemeGenerated')) + 60000) {
      this.errorMsg = 'Please wait a minute to post again.';
    } else if (!title) {
      this.errorMsg = 'Choose a title for your post';
    } else {
      this.postService
        .createPost(title, tag, this.formData)
        .subscribe((data: Post) => {
          if (data) {
            this.post = data;
            const newDate = new Date;
            localStorage.setItem('lastUpdlastMemeGeneratedate', newDate.toString());
            this.formModal.hide();
            this.router.navigate(['post/' + this.post._id]);
          }
        });
    }
  }

  onFileChange(event) {
    const fileList: FileList = event.target.files;
    const file: File = fileList[0];
    if (file.type !== 'image/jpg' && file.type !== 'image/jpeg' && file.type !== 'image/png') {
      this.errorMsg = 'File extension can\'t be uploaded';
      return false;
    } else {
      this.errorMsg = '';
      this.formData.append('content', file, file.name);
    }
  }

  logOut() {
    localStorage.clear();
    this.router.navigate(['login']);
  }

  getNotificationUser(userId) {
    this.notificationService
      .getNotificationUser(userId)
      .subscribe((data: Notification[]) => {

        this.notifications = data;
        this.newNotifNb = this.notifications[0].newNotifNb;
      });
  }

}
