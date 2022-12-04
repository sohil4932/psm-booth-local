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

  private swipeCoord?: [number, number];
  private swipeTime?: number;

  constructor() { }

  ngOnInit(): void {
  }

  openLocation() {
    this.slider = true;
  }

  // swipe(e) {
  //   if (e === 'swiperight') {
  //     this.carousel.prev();
  //   } else {
  //     this.carousel.next();
  //   } 
  // }

  swipe(e: TouchEvent, when: string) {
    try {
      const coord: [number, number] = [e.changedTouches[0].clientX, e.changedTouches[0].clientY];
      const time = new Date().getTime();

      if (when === 'start') {
        this.swipeCoord = coord;
        this.swipeTime = time;
      } else if (when === 'end') {
        const direction = [coord[0] - this.swipeCoord[0], coord[1] - this.swipeCoord[1]];
        const duration = time - this.swipeTime;

        if (duration < 1000 //
          && Math.abs(direction[0]) > 30 // Long enough
          && Math.abs(direction[0]) > Math.abs(direction[1] * 3)) { // Horizontal enough
          const swipe = direction[0] < 0 ? 'next' : 'previous';
          if (swipe === 'next') {
            this.carousel.prev();
          } else {
            this.carousel.next();
          }
        }
      }
    } catch(e) {

    }
  }

}
