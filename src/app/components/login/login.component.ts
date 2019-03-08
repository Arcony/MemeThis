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
  user : User;
  error:String;
  
  constructor(private fb: FormBuilder, private router: Router, private notificationService: NotificationService , private authService: AuthService) { 
    this.createForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      username: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  signUp() {
    this.router.navigate(['register']);
  }
  
  signIn( email , password ) {
    
    if( !password || !email )
    {
      return false;
    }

    this.authService
    .login(email,password)
    .subscribe((data: User) =>{
      this.user = data;
      
      console.log(this.user);
      localStorage.setItem('token',this.user.token);
      localStorage.setItem('username',this.user.username);
      localStorage.setItem('userId',this.user.userId);
      console.log(localStorage.getItem('userId'));
      console.log(localStorage.getItem('token'));
      this.notificationService.refreshNavbar("test");
      this.router.navigate(['login']);
      if(this.user.token != null)
        this.router.navigate(['browser']);
    },(err) => {this.error = err.error.error; console.log(this.error)});
    
  }

}
