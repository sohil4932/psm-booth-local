import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pr-map',
  templateUrl: './pr-map.component.html',
  styleUrls: ['./pr-map.component.scss']
})
export class PrMapComponent implements OnInit {
  slider: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  openLocation() {
    this.slider = true;
  }

}
