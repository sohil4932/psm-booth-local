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

  slides = {
    tanki: [
              'assets/pr/collections/tanki/1.png',
              'assets/pr/collections/tanki/2.png'
           ],
    balSnehiGarden: [
              'assets/pr/collections/balSnehiGarden/1.png',
              'assets/pr/collections/balSnehiGarden/2.png',
              'assets/pr/collections/balSnehiGarden/3.png',
              'assets/pr/collections/balSnehiGarden/4.png',
              'assets/pr/collections/balSnehiGarden/5.png',
              'assets/pr/collections/balSnehiGarden/6.png',
              'assets/pr/collections/balSnehiGarden/7.png'
           ],
    train: [
            'assets/pr/collections/train/1.png',
            'assets/pr/collections/train/2.png'
           ],
    bapaniMurti: [
            'assets/pr/collections/bapaniMurti/1.png',
            'assets/pr/collections/bapaniMurti/2.png',
            'assets/pr/collections/bapaniMurti/3.png',
            'assets/pr/collections/bapaniMurti/4.png'
          ],
    fassadWithCharacter: [
            'assets/pr/collections/fassadWithCharacter/1.png',
            'assets/pr/collections/fassadWithCharacter/2.png',
            'assets/pr/collections/fassadWithCharacter/3.png'
          ],
    animalCorner: [
            'assets/pr/collections/animalCorner/1.png',
            'assets/pr/collections/animalCorner/2.png',
            'assets/pr/collections/animalCorner/4.png',
            'assets/pr/collections/animalCorner/5.png',
            'assets/pr/collections/animalCorner/6.png',
            'assets/pr/collections/animalCorner/7.png',
            'assets/pr/collections/animalCorner/8.png',
            'assets/pr/collections/animalCorner/9.png'
          ],
    talentStage: [
            'assets/pr/collections/talentStage/1.png',
            'assets/pr/collections/talentStage/2.png'
          ],
    balBalikaDance: [
            'assets/pr/collections/balBalikaDance/1.png',
            'assets/pr/collections/balBalikaDance/2.png',
            'assets/pr/collections/balBalikaDance/3.png'
          ],
    mascot: [
            'assets/pr/collections/mascot/1.png',
            'assets/pr/collections/mascot/2.png',
            'assets/pr/collections/mascot/3.png',
            'assets/pr/collections/mascot/4.png',
            'assets/pr/collections/mascot/5.png'
          ]
  };

  currentSliders = [];

  constructor() { }

  ngOnInit(): void {
  }

  openLocation(location?) {
    this.currentSliders = this.slides[location];
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
