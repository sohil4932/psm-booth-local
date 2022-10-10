import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { HostListener } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
// import { AngularFireStorage } from '@angular/fire/compat/storage';
import html2canvas from "html2canvas";
(window as any).html2canvas = html2canvas;
import { HttpHeaders, HttpClient } from "@angular/common/http";
// import QRCode from "qrcode";
// (window as any).QRCode = QRCode;
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-animation-camera',
  templateUrl: './animation-camera.component.html',
  styleUrls: ['./animation-camera.component.scss']
})
export class AnimationCameraComponent implements OnInit, AfterViewInit, OnDestroy {
  // @ViewChild("video")
  // public video: ElementRef;

  // @ViewChild("canvas")
  // public canvas: ElementRef;

  video: HTMLVideoElement

  public captures: Array<any> = [];

  currentCapture:any;

  preview_url;

  interval;
  timeLeft: number = 0;

  constructor(public http: HttpClient, private storage: AngularFireStorage) { }

  @HostListener('window:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) { 
    if(event.key && event.key == 'Enter') {
      if(this.currentCapture) {
        this.currentCapture = null;
      } else {
        this.startCaptureTimer();
      }
    }
  }

  ngOnInit(): void {
  }

  startCaptureTimer() {
    this.timeLeft = 7;
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

  clickImage() {
    if(this.currentCapture) {
      this.currentCapture = null;
    } else {
      this.startCaptureTimer();
    }
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
          setTimeout(() => {
            try {
              let imageTag = document.getElementById('camera-overlay');
              let imgWidth = imageTag.offsetWidth;
              let marginLeft = 0;
              marginLeft = (imgWidth/2) - (this.video.offsetWidth/2);
              this.video.style.marginLeft = marginLeft + 'px';
            } catch(e) {
              this.video.style.marginLeft = '-50%';
            }
          }, 3000);
        });
      }
  }

  captureAndShow() {
    let videoContainer = document.getElementById('webcam-container');
    let that = this;
    // html2canvas(videoContainer, { scrollY: -window.scrollY, scale: 1, width: videoContainer.offsetWidth, height: videoContainer.offsetHeight }).then(function (canvas) {
    //   that.currentCapture = canvas.toDataURL('image/png');
    //   // setTimeout(() => {
    //   //   that.uploadImage();
    //   // });
    // });

    html2canvas(videoContainer).then(function (canvas) {
      that.currentCapture = canvas.toDataURL('image/png');
      setTimeout(() => {
        that.uploadImage();
      });
    });
  }

  onInput(event) {
    console.log(event.target.files[0])

      var form:FormData = new FormData();
      form.append('image', event.target.files[0]);
      
      let headers: HttpHeaders = new HttpHeaders();
      headers = headers.append("Content-Type", "multipart/form-data");
      this.http.post('https://api.imgbb.com/1/upload?key=361d86bf4ea57e82a5666a1c1505647e', form, { headers: headers }).subscribe((res: any) => {
        // console.log(res); expiration=600&
        console.log(res);
        res = res.json();
        try {
          let display_url = res.data.display_url;
          this.preview_url = display_url;
          // new QRCode(document.getElementById("qrcode"), display_url);
        } catch(e) {
          console.log({e})
        }
      }, (err) => {
        console.warn({err});
      });
  }

  uploadImage() {
    const fileName = new Date().getTime();
    const filePath = '/booth1/' + fileName + '.png';
    const storageRef = this.storage.ref(filePath);
    // const uploadTask = this.storage.upload(filePath, this.currentCapture, 'data_url');
    const uploadTask = storageRef.putString(this.currentCapture, 'data_url');
    uploadTask.snapshotChanges().pipe(
      finalize(() => {
        storageRef.getDownloadURL().subscribe(downloadURL => {
          this.preview_url = location.origin + '/preview' + '?booth=booth1' + '&fileName=' + fileName.toString();
          // this.preview_url = encodeURI(location.origin + '/preview' + '?booth=booth1' + '&fileName=' + fileName.toString());
          // this.preview_url = encodeURI(location.host + '/preview?url=' + downloadURL.split('?')[0].replace('https://', '') + '&booth=booth1' + '&fileName=' + fileName.toString());
          console.log(this.preview_url);
        });
      })
    ).subscribe((res:any) => {
      console.log({res});
    }, (err) => {
      console.error({err});
    });

      // let base64Img = this.currentCapture.replace('data:image/png;base64,', '');
    
      // var formData:FormData = new FormData();
      // formData.append('image', base64Img);
      // var xhr = new XMLHttpRequest();
      // xhr.withCredentials = false;
      // xhr.addEventListener("readystatechange", function() {
      //   if(this.readyState === 4) {
      //     console.log(this.responseText);
      //   }
      // });
      // xhr.open("POST", "https://api.imgbb.com/1/upload?key=2af08229230607703946abc667658877");
      // xhr.setRequestHeader("Content-Type", "multipart/form-data");
      // xhr.send(formData);
      // return;

      // let headers: HttpHeaders = new HttpHeaders();
      // headers = headers.append("Content-Type", "multipart/form-data");
    
      // this.http.post('https://api.imgbb.com/1/upload?expiration=600&key=2af08229230607703946abc667658877', formData, { headers: headers }).subscribe((res: any) => {
      //   res = res.json();
      //   try {
      //     let display_url = res.data.display_url;
      //     this.preview_url = display_url;
      //     new QRCode(document.getElementById("qrcode"), display_url);
      //   } catch(e) {
      //     console.log({e})
      //   }
      // }, (err) => {
      //   console.warn({err});
      // });
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

  ngOnDestroy(): void {
    clearInterval(this.interval);
  }

}
