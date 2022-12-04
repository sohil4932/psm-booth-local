import { ActivatedRoute } from '@angular/router';
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
  loader: boolean = false;

  language = 'englishLabel';

  constructor(public db: AngularFirestore, private modalService: NgbModal, public route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
        try {
          if(params && params.language && params.language == 'gujarati') {
            this.language = 'gujaratiLabel';
          }
        } catch(e) {
        }
      }
    );
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
    this.loader = true;
    setTimeout(() => {
      this.loader = false;
    }, 2000);
    let niyamsRef = this.db.collection('niyams-counter').doc(niyam.id);

    niyamsRef.update({count: firebase.default.firestore.FieldValue.increment(1)}).then(() => {
    }).catch((e) => {
    })
  }

}
