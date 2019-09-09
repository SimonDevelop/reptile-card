import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Reptile } from '../models/reptile.model';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class ReptilesService {

  reptiles: Reptile[] = [];
  reptilesSubject = new Subject<Reptile[]>();

  emitReptiles() {
    this.reptilesSubject.next(this.reptiles);
  }

  saveReptiles() {
    firebase.database().ref('/reptiles').set(this.reptiles);
  }

  getReptiles() {
    firebase.database().ref('/reptiles')
      .on('value', (data) => {
          this.reptiles = data.val() ? data.val() : [];
          this.emitReptiles();
        }
      );
  }

  getShowReptile(id: number) {
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/reptiles/' + id).once('value').then(
          (data) => {
            resolve(data.val());
          }, (error) => {
            reject(error);
          }
        );
      }
    );
  }

  createNewReptile(newReptile: Reptile) {
    this.reptiles.push(newReptile);
    this.saveReptiles();
    this.emitReptiles();
  }

  removeReptile(reptile: Reptile) {
    const reptileIndexToRemove = this.reptiles.findIndex(
      (reptileEl) => {
        if(reptileEl === reptile) {
          return true;
        }
      }
    );
    this.reptiles.splice(reptileIndexToRemove, 1);
    this.saveReptiles();
    this.emitReptiles();
  }

  constructor() {
    this.getReptiles();
  }
}
