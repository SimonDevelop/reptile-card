import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Reptile } from '../models/reptile.model';

@Injectable({
  providedIn: 'root'
})
export class ReptilesService {

  reptiles: Reptile[] = [];
  reptilesSubject = new Subject<Reptile[]>();

  emitReptiles() {
    this.reptilesSubject.next(this.reptiles);
  }
}
