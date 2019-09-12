import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Suivi } from '../models/suivi.model';
import { ActivatedRoute } from '@angular/router';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class SuivisService {

  suivis: Suivi[] = [];
  suivisSubject = new Subject<Suivi[]>();

  emitSuivis() {
    this.suivisSubject.next(this.suivis);
  }

  saveSuivis(idReptile: number, newSuivi: Suivi) {
    firebase.database().ref('/suivis/'+idReptile).push(newSuivi);
  }

  getSuivis(idReptile: number) {
    firebase.database().ref('/suivis/'+idReptile)
      .on('value', (data) => {
          this.suivis = data.val() ? data.val() : [];
          this.emitSuivis();
        }
      );
  }

  getShowSuivi(idReptile: number, id) {
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/suivis/' + idReptile + '/' + id).once('value').then(
          (data) => {
            resolve(data.val());
          }, (error) => {
            reject(error);
          }
        );
      }
    );
  }

  createNewSuivi(idReptile: number, newSuivi: Suivi) {
    this.suivis.push(newSuivi);
    this.saveSuivis(idReptile, newSuivi);
    this.emitSuivis();
  }

  removeSuivi(idReptile: number, id) {
    firebase.database().ref('/suivis/' + idReptile + '/' + id).remove();
    this.suivis.splice(id, 1);
    this.emitSuivis();
  }

  constructor(private route: ActivatedRoute) {
    this.getSuivis(this.route.snapshot.params['id']);
  }
}
