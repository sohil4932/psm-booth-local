import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-niyams-preview',
  templateUrl: './niyams-preview.component.html',
  styleUrls: ['./niyams-preview.component.scss']
})
export class NiyamsPreviewComponent implements OnInit {
  niyams = [];
  niyamsCounter = {};

  language = 'englishLabel';

  constructor(public db: AngularFirestore, public route: ActivatedRoute) { }

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
    this.db.collection('niyams').snapshotChanges().subscribe((res: any) => {
      this.db.collection('niyams').get().subscribe((res: any) => {
        let niyams = [];
        res.forEach(element => {
          niyams.push(element.data());
        });
        this.niyams = niyams;
      })
    })

    this.db.collection('niyams-counter').snapshotChanges().subscribe((res: any) => {
      this.db.collection('niyams-counter').get().subscribe((res: any) => {
        let niyamsCounter = {};
        res.forEach(element => {
          niyamsCounter[element.id] = (element.data() && element.data().count) ? element.data().count : 0;
        });
        this.niyamsCounter = niyamsCounter;
      })
    })
}

}
