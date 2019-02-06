import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

import { secrets } from '../secrets';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedFeature = 'recipe';

  ngOnInit() {
    firebase.initializeApp({
      apiKey: secrets.apiKey,
      authDomain: secrets.authDomain
    });
  }

  onNavigate(feature: string) {
    this.loadedFeature = feature;
  }
}
