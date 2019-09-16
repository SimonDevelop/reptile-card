import { Component, OnInit } from '@angular/core';
import { Reptile } from '../../models/reptile.model';
import { Suivi } from 'src/app/models/suivi.model';
import { ReptilesService } from '../../services/reptiles.service';
import { SuivisService } from '../../services/suivis.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as firebase from 'firebase';

@Component({
  selector: 'app-show-reptile',
  templateUrl: './show-reptile.component.html',
  styleUrls: ['./show-reptile.component.scss']
})
export class ShowReptileComponent implements OnInit {

  todayYear = new Date().getFullYear();
  reptile: Reptile = null;
  suivis: Suivi[];
  idSuivis: any;
  idReptile = this.route.snapshot.params['id'];
  showLoadingSuivis: boolean = true;

  constructor(private route: ActivatedRoute, private reptilesService: ReptilesService,
              private suivisService: SuivisService, private router: Router) {}

  ngOnInit() {
    this.reptile = new Reptile('', '', '', '', '', '', '', '');
    const id = this.idReptile;
    this.reptilesService.getShowReptile(id).then(
      (reptile: Reptile) => {
        this.reptile = reptile;
      }
    );
    // Get last suivis
    firebase.database().ref('/suivis/'+id).orderByChild('date').limitToLast(10)
      .on('value', (data) => {
        let suivisCheck = []
        let suivisCheckId = []
        data.forEach(function(child) {
          suivisCheckId.push(child.key)
          suivisCheck.push(child.val())
        });
        this.idSuivis = suivisCheckId.reverse();
        this.suivis = suivisCheck.reverse();
        this.showLoadingSuivis = false;
      });
  }

  onBack() {
    this.router.navigate(['/reptiles']);
  }

  onEditReptile() {
    this.router.navigate(['/reptiles', 'edit', this.idReptile]);
  }

  onEndReptile() {
    this.router.navigate(['/reptiles', 'end', this.idReptile]);
  }

  onNewSuivi() {
    this.router.navigate(['/reptiles', this.idReptile, 'suivis', 'new']);
  }

  onDeleteSuivi(id) {
    if (confirm("êtes vous sûr de vouloir supprimer ce suivi ?")) {
      this.suivisService.removeSuivi(this.idReptile, id)
    }
  }

  onShowSuivisByYear(year) {
    this.router.navigate(['/reptiles', this.idReptile, 'suivis', year]);
  }

}
