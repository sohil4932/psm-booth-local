import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-preview-image',
  templateUrl: './preview-image.component.html',
  styleUrls: ['./preview-image.component.scss']
})
export class PreviewImageComponent implements OnInit {
  preview_url;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.preview_url = 'https://'+ this.route.snapshot.queryParams['url'] + '?alt=media';
  }

}
