import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from './../../services/auth.service';
import { Router } from '@angular/router';
import { User } from '../../models/user.model'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  createForm: FormGroup;
  user : User;
  
  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) { 
    this.createForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      username: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  signUp() {
    this.router.navigate(['/register']);
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
      this.router.navigate(['login']);
      localStorage.setItem('token',this.user.token);
      localStorage.setItem('username',this.user.username);
      if(this.user.token != null)
        console.log("OK");
    });
    
  }

}
