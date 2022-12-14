import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { HostListener } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
// import { AngularFireStorage } from '@angular/fire/compat/storage';
import html2canvas from "html2canvas";
(window as any).html2canvas = html2canvas;
import { finalize } from 'rxjs/operators';

import {NgxImageCompressService} from "ngx-image-compress";
import { ActivatedRoute } from '@angular/router';
import { SCREENS } from 'app/shared/constants/common.constants';

@Component({
  selector: 'app-animation-camera',
  templateUrl: './animation-camera.component.html',
  styleUrls: ['./animation-camera.component.scss']
})
export class AnimationCameraComponent implements OnInit, AfterViewInit, OnDestroy {
  video: HTMLVideoElement

  public captures: Array<any> = [];

  currentCapture:any;

  preview_url;

  interval;
  timeLeft: number = 0;

  loading:any = 0;
  capturing: boolean = false;

  screens = SCREENS;
  currentScreen;

  capturingEffect: boolean = false;

  constructor(private storage: AngularFireStorage, private imageCompress: NgxImageCompressService, private route: ActivatedRoute, public http: HttpClient) { }

  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    console.log('Key Log > ', event.key); 
    if(event.key && (event.key == 'Enter' || event.key == 'PageUp') && !this.capturing) {
      if(this.currentCapture) {
        this.currentCapture = null;
        this.preview_url = null;
        this.loading = 0;
      } else {
        this.startCaptureTimer();
      }
    }
  }

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
        try {
          let currentScreen;
          if(params && params.booth) {
            currentScreen = params.booth;
          } else {
            currentScreen = this.screens[0].name;
          }
          let screen = this.screens.find(s => s.name == currentScreen);
          this.currentScreen = screen;
          console.log(this.currentScreen);
        } catch(e) {

        }
      }
    );
  }

  startCaptureTimer() {
    this.capturing = true;
    this.loading = 0;
    this.timeLeft = 3;
    this.interval = setInterval(() => {
      if(this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.timeLeft = 0;
        setTimeout(() => {
          this.captureAndShow();
          this.stopCaptureTimer();
        });
      }
    },1000);
  }

  stopCaptureTimer() {
    clearInterval(this.interval);
  }

  ngAfterViewInit(): void {
      if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        let videoContainer = document.getElementById('webcam-container');
        this.video = document.createElement('video');
        this.video.setAttribute('autoplay', '');
        videoContainer.appendChild(this.video);
        // navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
        // navigator.mediaDevices.getUserMedia({ video: {advanced: [{width: 2160, height: 3840}]} }).then((stream) => {
        // navigator.mediaDevices.getUserMedia({ video: {advanced: [{aspectRatio: 9/16}]} }).then((stream) => {  

        navigator.mediaDevices.getUserMedia({ video: { width: {ideal: 1920 }, height: {ideal: 1080 } } }).then((stream) => {  
          this.video.srcObject = stream;
          setTimeout(() => {
            const [videoTrack] = stream.getVideoTracks();
            const capabilities = videoTrack.getCapabilities();
            const settings = videoTrack.getSettings();
            console.log(settings);
            // try {
              // let imageTag = document.getElementById('camera-overlay');
              // let imgWidth = imageTag.offsetWidth;
            //   let marginLeft = 0;
            //   marginLeft = (imgWidth/2) - (this.video.offsetWidth/2);
            //   this.video.style.marginLeft = marginLeft + 'px';
            // } catch(e) {
            //   this.video.style.marginLeft = '-50%';
            // }
          }, 3000);
        });
      }
  }

  captureAndShow() {
    let videoContainer = document.getElementById('webcam-container');
    let that = this;
    that.capturingEffect = true;
    setTimeout(() => {
      that.capturingEffect = false;
    }, 1500);
    html2canvas(videoContainer).then(function (canvas) {
    that.currentCapture = canvas.toDataURL('image/png');

      canvas.toBlob(blob => {
        const file = new File([blob], (new Date().getTime() + ".png"));
        // that.currentCapture = file;
        setTimeout(() => {
          // that.uploadImage();
          that.uploadImageNew(file);
        });
      });

      // setTimeout(() => {
      //   // that.uploadImage();
      //   that.uploadImageNew();
      // });
    });
  }

  uploadImageNew(file) {
    const fileName = new Date().getTime();
    const filePath = 'http://192.168.0.100:8000/' + fileName + '.png';
    this.loading = 30;

    var formData:FormData = new FormData();
    formData.append('files', file);
    
    let headers: HttpHeaders = new HttpHeaders();
    // headers = headers.append("Content-Type", "multipart/form-data");
    this.http.post('http://192.168.0.100:8000/upload', formData).subscribe((res: any) => {
      this.preview_url = filePath;
      this.loading = 100;
      this.capturing = false;
    }, (err) => {
      console.warn({err});
      this.capturing = false;
    });
  }

  uploadImage() {
    const fileName = new Date().getTime();
    const filePath = '/booth1/' + fileName + '.png';
    const storageRef = this.storage.ref(filePath);

    this.imageCompress.compressFile(this.currentCapture, 1).then((compressedImage) => {
      console.log(compressedImage);
      const uploadTask = storageRef.putString(compressedImage, 'data_url');
      uploadTask.snapshotChanges().pipe(
        finalize(() => {
          storageRef.getDownloadURL().subscribe(downloadURL => {
            this.preview_url = location.origin + '/preview' + '?booth=booth1' + '&fileName=' + fileName.toString();
            this.capturing = false;
            console.log(this.preview_url);
          });
        })
      ).subscribe((res:any) => {
        try {
          this.loading = ((100 * res.bytesTransferred) / res.totalBytes).toFixed(0);
        } catch(e) {
          this.loading = 100;
        }
        console.log(this.loading);
      }, (err) => {
        console.error({err});
        this.capturing = false;
      });
    })
  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
  }

}
