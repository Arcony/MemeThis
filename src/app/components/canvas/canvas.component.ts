import {
  Component, Input, ElementRef, AfterViewInit, ViewChild, Output, EventEmitter
} from '@angular/core';
import { fromEvent } from 'rxjs';
import { switchMap, takeUntil, pairwise } from 'rxjs/operators'
import { OnInit} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from './../../services/auth.service';
import { MemeService } from './../../services/meme.service';

import { Router , ActivatedRoute, Params} from '@angular/router';
import { User } from '../../models/user.model'
import { Meme } from '../../models/meme.model'
import { Post } from '../../models/post.model'


@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss']
})
export class CanvasComponent implements AfterViewInit {

  constructor(private activatedRoute: ActivatedRoute, private fb: FormBuilder, private router: Router, private authService: AuthService, private memeService: MemeService) { 
  }

  meme : Meme;
  errorMsg: String;
  @ViewChild('canvas') public canvas: ElementRef;

  @Input() public width = 360;
  @Input() public height = 360;
  @Input() postId: string;
  @Input() postContent: string;
  @Output() messageEvent = new EventEmitter<string>();
  

  private cx: CanvasRenderingContext2D;

  public ngAfterViewInit() {
   this.drawCanvas();
  }

  drawOnCanvas(top,bot){

    const canvasEl: HTMLCanvasElement = this.canvas.nativeElement;
    let kitten = new Image();
    kitten.crossOrigin="anonymous";
    kitten.src = 'http://127.0.0.1:8887/'+ this.postContent;
   
    kitten.onload = () => {
      const iw = kitten.width;
      const ih = kitten.height;
      const maxW = 360;
      const maxH = 360;
      const scale = Math.min((maxW / iw), (maxH / ih));
      const iwScaled = iw * scale;
      const ihScaled = ih * scale;
      canvasEl.width = iwScaled;
      canvasEl.height = ihScaled;
      this.cx.drawImage(kitten, 0, 0, iwScaled, ihScaled);
      this.cx.fillStyle = '#ffffff'; 
      this.cx.font = "30px Impact";
      this.cx.shadowBlur = 4;
      this.cx.shadowOffsetX = 3;
      this.cx.shadowOffsetY = 3;
      this.cx.shadowColor = "rgba(0,0,0,0.3)";
      this.cx.lineWidth    = 5;
      var topWidth = this.cx.measureText(top).width;
      var botWidth = this.cx.measureText(bot).width;
      this.cx.fillText(top, (canvasEl.width/2) - (topWidth /2), 50);
      this.cx.fillText(bot, (canvasEl.width/2) - (botWidth /2), canvasEl.height - 20);
    };
  }

  drawCanvas(){

    const canvasEl: HTMLCanvasElement = this.canvas.nativeElement;
    this.cx = canvasEl.getContext('2d');

    canvasEl.width = this.width;
    canvasEl.height = this.height;

    this.cx.lineWidth = 3;
    this.cx.lineCap = 'round';
    this.cx.strokeStyle = '#000';
    

    let kitten = new Image();
    kitten.crossOrigin="anonymous";
    kitten.src = 'http://127.0.0.1:8887/'+ this.postContent;
    
    kitten.onload = () => {
      const iw = kitten.width;
      const ih = kitten.height;
      const maxW = 360;
      const maxH = 360;
      const scale = Math.min((maxW / iw), (maxH / ih));
      const iwScaled = iw * scale;
      const ihScaled = ih * scale;
      canvasEl.width = iwScaled;
      canvasEl.height = ihScaled;
      this.cx.drawImage(kitten, 0, 0, iwScaled, ihScaled);
     
    };
}


postCanvas(title,tag, topText, botText) {
  var date = new Date;
  console.log( Date.parse(date.toString()) < Date.parse(localStorage.getItem('lastUpdate')) + 60000 );

  if( Date.parse(date.toString()) < Date.parse(localStorage.getItem('lastUpdate')) + 60000 ) {
    this.errorMsg = "Please wait a minute to post again."
  }
  else if( !title || (!botText && !topText))
  {
    this.errorMsg = "Missing field."
  }
  else {
  var newImg = document.createElement('img');
  newImg.crossOrigin = "anonymous";
  const canvasEl: HTMLCanvasElement = this.canvas.nativeElement;
    this.cx = canvasEl.getContext('2d');
    var that = this;

    canvasEl.toBlob(function(blob){ 
      var file = new File([blob], that.postId+".jpg" , {type: 'image/jpeg'});
      that.memeService
      .newMeme(file, that.postId ,title,tag)
      .subscribe((data: Meme) =>{
        that.meme = data;
        that.messageEvent.emit(that.postId);
        var date = new Date;
        localStorage.setItem("lastUpdate", date.toString());
      });
    }, 'image/jpeg', 0.95); 
  }
}

}