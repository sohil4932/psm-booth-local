import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HostListener } from '@angular/core';
import html2canvas from "html2canvas";
(window as any).html2canvas = html2canvas;
import { HttpHeaders, HttpClient } from "@angular/common/http";
import QRCode from "qrcode";
(window as any).QRCode = QRCode;

@Component({
  selector: 'app-animation-camera',
  templateUrl: './animation-camera.component.html',
  styleUrls: ['./animation-camera.component.scss']
})
export class AnimationCameraComponent implements OnInit, AfterViewInit {
  // @ViewChild("video")
  // public video: ElementRef;

  // @ViewChild("canvas")
  // public canvas: ElementRef;

  video: HTMLVideoElement

  public captures: Array<any> = [];

  currentCapture:any;

  preview_url;

  constructor(public http: HttpClient) { }

  @HostListener('window:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) { 
    if(event.key && event.key == 'Enter') {
      if(this.currentCapture) {
        this.currentCapture = null;
      } else {
        this.captureAndShow();
      }
    }
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
      if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        let videoContainer = document.getElementById('webcam-container');
        this.video = document.createElement('video');
        this.video.setAttribute('autoplay', '');
        // this.video.setAttribute('playsinline', 'true');
        // this.video.setAttribute('webkit-playsinline', 'true');
        // this.video.width = videoContainer.offsetWidth;
        // this.video.height = videoContainer.offsetHeight;
        videoContainer.appendChild(this.video);
        navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
          this.video.srcObject = stream;
        });
      }
  }

  captureAndShow() {
    let videoContainer = document.getElementById('webcam-container');
    let that = this;
    html2canvas(videoContainer, { scrollY: -window.scrollY, scale: 1, width: videoContainer.offsetWidth, height: videoContainer.offsetHeight }).then(function (canvas) {
      that.currentCapture = canvas.toDataURL('image/png');
      console.log(that.currentCapture);
      setTimeout(() => {
        that.uploadImage();
      });
    });
  }

  uploadImage() {
      // this.preview_url = 'https://i.ibb.co/98W13PY/c1f64245afb2.gif';
      // QRCode(document.getElementById("qrcode"), 'https://i.ibb.co/98W13PY/c1f64245afb2.gif');
      let base64Img = this.currentCapture.replace('data:image/png;base64,', '');
      let headers: HttpHeaders = new HttpHeaders();
      headers = headers.append("Content-Type", "application/json");
      this.http.post('https://api.imgbb.com/1/upload?expiration=600&key=0c36535baa454956c6bb1f80b9ea5da4', {image: base64Img}).subscribe((res: any) => {
        console.log(res);
        try {
          let display_url = res.data.display_url;
          new QRCode(document.getElementById("qrcode"), display_url);
        } catch(e) {

        }
      });
  }

  public capture() {
    // var context = this.canvas.nativeElement.getContext("2d").drawImage(this.video, 0, 0, 640, 480);
    // this.captures.push(this.canvas.nativeElement.toDataURL("image/png"));

    // const canvas = document.createElement("canvas");
    // canvas.getContext('2d').drawImage(this.video, 0, 0, canvas.width, canvas.height);
    // this.captures.push(canvas.toDataURL('image/png'));

    // const canvas = document.createElement("canvas");
    // let videoContainer: ElementRef = <any>(document.getElementById('webcam-container'));
    // canvas.getContext('2d').drawImage(videoContainer.nativeElement, 0, 0, canvas.width, canvas.height);
    // this.captures.push(canvas.toDataURL('image/png'));

    let videoContainer = document.getElementById('webcam-container');
    let that = this;
    html2canvas(videoContainer, { scrollY: -window.scrollY, scale: 1, width: videoContainer.offsetWidth, height: videoContainer.offsetHeight }).then(function (canvas) {
      that.captures.push(canvas.toDataURL('image/png'));
      // var link = document.createElement("a");
      // document.body.appendChild(link);
      // link.download = download_name;
      // link.href = canvas.toDataURL("image/png");
      // link.target = '_blank';
      // link.click();
      // that.downloadActivityLoader = false;
    });

  }

}
