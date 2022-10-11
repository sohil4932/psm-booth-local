import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { ActivatedRoute } from '@angular/router';
import html2canvas from "html2canvas";
(window as any).html2canvas = html2canvas;

@Component({
  selector: 'app-preview-image',
  templateUrl: './preview-image.component.html',
  styleUrls: ['./preview-image.component.scss']
})
export class PreviewImageComponent implements OnInit {
  preview_url;

  booth;
  fileName;

  loader = true;

  constructor(private route: ActivatedRoute, private httpClient: HttpClient, private storage: AngularFireStorage) { }

  ngOnInit(): void {
    // this.preview_url = 'https://' + this.route.snapshot.queryParams['url'] + '?alt=media';
    this.booth = this.route.snapshot.queryParams['booth'];
    this.fileName = this.route.snapshot.queryParams['fileName'];
    this.getImage();
    setTimeout(() => {
      // this.downloadImage({target: 123});
    }, 10000);
  }

  getImage() {
    const filePath = '/' + this.booth + '/' + this.fileName + '.png';
    const storageRef = this.storage.ref(filePath);
    storageRef.getDownloadURL().subscribe(downloadURL => {
      this.preview_url = downloadURL;
      this.loader = false;
    })
    storageRef.getMetadata().subscribe(metaData => {
      console.log({metaData});
    })
  }

  downloadImage(event) {
    // console.log(event);
    // if (event && event.target) {
    //   let videoContainer = document.getElementById('preview_img');
    //   console.log(videoContainer)
    //   html2canvas(videoContainer, { scrollY: -window.scrollY, scale: 1}).then(function (canvas) {
    //     console.log(canvas)
    //     var link = document.createElement("a");
    //     document.body.appendChild(link);
    //     link.download = 'PhotoBooth.png';
    //     link.href = canvas.toDataURL("image/png");
    //     link.target = '_blank';
    //     link.click();
    //     link.remove();
    //   });
    // }
    // return;

    // let link = document.createElement('a');
    // link.setAttribute('type', 'hidden');
    // link.href = this.preview_url;
    // link.download = this.preview_url;
    // document.body.appendChild(link);
    // link.click();
    // link.remove();
    // return;

    const imgUrl = this.preview_url;
    const imgName = imgUrl.substr(imgUrl.lastIndexOf('/') + 1);
    this.httpClient.get(imgUrl, { responseType: 'blob' as 'json' })
      .subscribe((res: any) => {
        const file = new Blob([res], { type: res.type });

        try {
          // IE
          if (window.navigator && window.navigator['msSaveOrOpenBlob']) {
            // @ts-ignore:next-line
            window.navigator.msSaveOrOpenBlob(file);
            return;
          }
        } catch (e) { }

        const blob = window.URL.createObjectURL(file);
        const link = document.createElement('a');
        link.href = blob;
        link.download = imgName;

        // Version link.click() to work at firefox
        link.dispatchEvent(new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
          view: window
        }));

        setTimeout(() => { // firefox
          window.URL.revokeObjectURL(blob);
          link.remove();
        }, 100);
      });
  }

  share() {
    let text = 'Checkout my latest Photo booth image here:' + window.location.href;
    let title = 'Photo Booth';
    if (navigator.share) {
      navigator.share({
        title: title,
        text: text,
      })
        .then(() => { })
        .catch((error) => { });
    } else {
      alert('Sharing is not supported in your browser.')
    }
  }

  download() {
      let videoContainer = document.getElementById('preview-img');
      console.log(videoContainer)
      html2canvas(videoContainer, { scrollY: -window.scrollY, scale: 1}).then(function (canvas) {
        console.log(canvas)
        var link = document.createElement("a");
        document.body.appendChild(link);
        link.download = 'PhotoBooth.png';
        link.href = canvas.toDataURL("image/png");
        link.target = '_blank';
        link.click();
        link.remove();
      });
  }

  getBase64Image() {
    // var xhr = new XMLHttpRequest();
    // xhr.responseType = 'blob';
    // xhr.onload = (event) => {
    //   var blob = xhr.response;
    // };
    // xhr.open('GET', this.preview_url);
    // xhr.send();
    // return;

    let img = new Image();
    img.crossOrigin = 'Anonymous';
    img.src = this.preview_url;
    img.onload = () => {
      // We create a HTML canvas object that will create a 2d image
      var canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      var ctx = canvas.getContext("2d");
      // This will draw image    
      ctx.drawImage(img, 0, 0);
      // Convert the drawn image to Data URL
      var dataURL = canvas.toDataURL("image/png");
      // return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
      console.log(dataURL);
    };
  }

}
