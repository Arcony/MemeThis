import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavComponent } from './components/nav/nav.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/login/login.component';
import { MatToolbarModule, MatFormFieldModule, MatInputModule, MatOptionModule, MatSelectModule, MatIconModule, MatButtonModule, MatCardModule, MatTableModule, MatDividerModule, MatSnackBarModule } from '@angular/material';
import { RouterModule, Routes, CanActivate} from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { RegisterComponent } from './components/register/register.component';
import { BrowserComponent } from './components/browser/browser.component';
import { AuthGuard } from './auth.guard';
import { PostComponent } from './components/post/post.component';
import { CanvasComponent } from './components/canvas/canvas.component';
import { ModalModule, WavesModule, InputsModule, MDBBootstrapModule } from 'angular-bootstrap-md'
import {  ReactiveFormsModule, FormControl, FormsModule } from '@angular/forms';
import { ProfilComponent } from './components/profil/profil.component';
import { MemeComponent } from './components/meme/meme.component';
import { NotificationService } from './services/notification.service';


const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'browser', component: BrowserComponent, canActivate: [AuthGuard]},
  { path: 'post/:id', component: PostComponent, canActivate: [AuthGuard]},
  { path: 'user/:id', component: ProfilComponent, canActivate: [AuthGuard]},
  { path: 'meme/:memeId', component: MemeComponent, canActivate: [AuthGuard]},
  { path: '', redirectTo: 'login', pathMatch: 'full'}

];

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    LoginComponent,
    RegisterComponent,
    BrowserComponent,
    PostComponent,
    CanvasComponent,
    ProfilComponent,
    MemeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    MatToolbarModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    MatDividerModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MDBBootstrapModule,
    ModalModule.forRoot(),
    FormsModule,
    ReactiveFormsModule
    ],
  providers: [NotificationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
