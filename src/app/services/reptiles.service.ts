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

  editReptile(id: number, newReptile: Reptile) {
    this.reptiles[id] = newReptile;
    this.saveReptiles();
    this.emitReptiles();
  }

  removeReptile(reptile: Reptile) {
    if (reptile.photo) {
      const storageRef = firebase.storage().refFromURL(reptile.photo);
      storageRef.delete().then(
        () => {
          console.log("photo supprimé !");
        }
      ).catch(
        (error) => {
          console.log("photo non trouvé !")
        }
      );
    }
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

  uploadFile(file: File) {
    return new Promise(
      (resolve, reject) => {
        const almostUniqueFileName = Date.now().toString();
        const upload = firebase.storage().ref()
          .child("images/" + almostUniqueFileName + file.name)
          .put(file);
        upload.on(firebase.storage.TaskEvent.STATE_CHANGED,
          () => {
            console.log("Chargement en cours...");
          },
          (error) => {
            console.log("Erreur de chargement : " + error);
            reject();
          },
          () => {
            resolve(upload.snapshot.ref.getDownloadURL())
          }
        )
      }
    )
  }

  constructor() {
    this.getReptiles();
  }
}
