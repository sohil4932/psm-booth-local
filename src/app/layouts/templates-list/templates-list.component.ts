import { SCREENS } from 'app/shared/constants/common.constants';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-templates-list',
  templateUrl: './templates-list.component.html',
  styleUrls: ['./templates-list.component.scss']
})
export class TemplatesListComponent implements OnInit {
  screens = SCREENS;

  constructor() { }

  ngOnInit(): void {
  }

}
