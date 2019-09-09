import { Component } from '@angular/core';
import * as firebase from 'firebase';
import config from '../../config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'reptile-card';
  constructor() {
    firebase.initializeApp(config);
  }
}
