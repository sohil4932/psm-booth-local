import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-niyam-detail',
  templateUrl: './niyam-detail.component.html',
  styleUrls: ['./niyam-detail.component.scss']
})
export class NiyamDetailComponent implements OnInit {
  @Input() niyam;

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

  close(value) {
    this.activeModal.close(value ? true : false);
  }

  confirm() {
    this.close(true);
  }

}
