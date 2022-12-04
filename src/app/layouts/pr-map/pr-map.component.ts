import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbCarousel } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-pr-map',
  templateUrl: './pr-map.component.html',
  styleUrls: ['./pr-map.component.scss']
})
export class PrMapComponent implements OnInit {
  slider: boolean = false;
  @ViewChild(NgbCarousel) carousel;

  constructor() { }

  ngOnInit(): void {
  }

  openLocation() {
    this.slider = true;
  }

  swipe(e) {
    if (e === 'swiperight') {
      this.carousel.prev();
    } else {
      this.carousel.next();
    } 
  }

}
