import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from './../../services/auth.service';
import { Router } from '@angular/router';
import { User } from '../../models/user.model';




@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
//selectedFile: File = null;
//<input type="file" (change)="onFileSelected($event)"/>

createForm: FormGroup;
user: User;
errorMsg: String;
  
  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) { 
    this.createForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      username: ['', Validators.required]
      //picture: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  onFileSelected(event) {
    //this.selectedFile = <File>event.target.files[0];
   // console.log(this.selectedFile);
  }

  ValidForm(email, password, username) {

    //if(this.selectedFile)
    //{
    if( !email || !password || !username)
    {
      this.errorMsg = "Missing field"
    }
    this.authService
    .register(email,password,username)
    .subscribe((data: User) => {
      this.user = data;
      this.router.navigate(['login']);
    },(err) => {this.errorMsg = err.error.error; console.log(this.errorMsg)});
   // }
  };

  toLoginPage() {
    this.router.navigate(['login']);
  }

}
