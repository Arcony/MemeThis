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

  createForm: FormGroup;
  user: User;
  errorMsg: String;
  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) {
    this.createForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      username: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  onFileSelected(event) {
  }

  ValidForm(email, password, username) {

    if (!email || !password || !username) {
      this.errorMsg = 'Missing field';
    }
    this.authService
      .register(email, password, username)
      .subscribe((data: User) => {
        this.user = data;
        this.router.navigate(['login']);
      },
        (err) => {
        this.errorMsg = err.error.error;
        });
  }

  toLoginPage() {
    this.router.navigate(['login']);
  }

}
