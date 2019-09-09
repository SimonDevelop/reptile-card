import { Component, OnInit } from '@angular/core';
import { ReptilesService } from '../services/reptiles.service';
import { Reptile } from '../models/reptile.model';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reptile-list',
  templateUrl: './reptile-list.component.html',
  styleUrls: ['./reptile-list.component.scss']
})
export class ReptileListComponent implements OnInit {

  reptiles: Reptile[];
  reptilesSubscription: Subscription;

  constructor(private reptilesService: ReptilesService, private router: Router) {}

  ngOnInit() {
    this.reptilesSubscription = this.reptilesService.reptilesSubject.subscribe(
      (reptiles: Reptile[]) => {
        this.reptiles = reptiles;
      }
    );
    this.reptilesService.emitReptiles();
  }

  onNewReptile() {
    this.router.navigate(['/reptiles', 'new']);
  }

  onDeleteReptile(reptile: Reptile) {
    this.reptilesService.removeReptile(reptile);
  }

  onViewReptile(id: number) {
    this.router.navigate(['/reptiles', 'view', id]);
  }

  ngOnDestroy() {
    this.reptilesSubscription.unsubscribe();
  }

}
