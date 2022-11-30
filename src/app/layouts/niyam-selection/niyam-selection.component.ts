import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NiyamDetailComponent } from './niyam-detail/niyam-detail.component';
import * as firebase from 'firebase';

@Component({
  selector: 'app-niyam-selection',
  templateUrl: './niyam-selection.component.html',
  styleUrls: ['./niyam-selection.component.scss']
})
export class NiyamSelectionComponent implements OnInit {
  niyams = [];

  constructor(public db: AngularFirestore, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getNiyams();
  }

  getNiyams() {
      let niyams = [];
      this.db.collection('niyams').get().subscribe((res: any) => {
        console.log(res);
        res.forEach(element => {
            console.log(element);
            niyams.push(element.data());
        });
        this.niyams = niyams;
      })
  }

  openNiyam(niyam) {
    const modalRef = this.modalService.open(NiyamDetailComponent, {centered: true, windowClass: 'niyam-popup'});
    modalRef.componentInstance.niyam = niyam;
    modalRef.result.then((result) => {
      console.log(result);
      if(result) {
        this.updateCount(niyam);
      }
    })
  }

  updateCount(niyam) {
    let niyamsRef = this.db.collection('niyams-counter').doc(niyam.id);

    niyamsRef.update({count: firebase.default.firestore.FieldValue.increment(1)}).then(() => {
    
    }).catch((e) => {
  
    })
  }

}
