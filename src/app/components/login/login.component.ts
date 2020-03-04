import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from './../../services/auth.service';
import { NotificationService } from './../../services/notification.service';

import { Router } from '@angular/router';
import { User } from '../../models/user.model'
import { Meme } from '../../models/meme.model'
import { FormsModule } from '@angular/forms';
import { NavComponent } from '../nav/nav.component';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  createForm: FormGroup;
  user: User;
  error: String;

  constructor(private fb: FormBuilder,
    private router: Router,
    private notificationService: NotificationService,
    private authService: AuthService) {
    this.createForm = this.fb.group({
      password: ['', Validators.required],
      username: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  signUp() {
    this.router.navigate(['register']);
  }

  signIn(username, password) {
    if (!password || !username) {
      return false;
    }

    this.authService
      .login(username, password)
      .subscribe((data: User) => {
        this.user = data;
        localStorage.setItem('token', this.user.token);
        localStorage.setItem('username', this.user.username);
        localStorage.setItem('userId', this.user.userId);
        this.notificationService.refreshNavbar('test');
        this.router.navigate(['login']);
        if (this.user.token != null) {
          this.router.navigate(['browser']);
        }
      }, (err) => {
        this.error = err.error.error; console.log(this.error);
      });
  }

}
