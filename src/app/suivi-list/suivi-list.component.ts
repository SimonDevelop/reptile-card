import { Component, OnInit } from '@angular/core';
import { Reptile } from '../models/reptile.model';
import { Suivi } from 'src/app/models/suivi.model';
import { ReptilesService } from '../services/reptiles.service';
import { SuivisService } from '../services/suivis.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as firebase from 'firebase';;

@Component({
  selector: 'app-suivi-list',
  templateUrl: './suivi-list.component.html',
  styleUrls: ['./suivi-list.component.scss']
})
export class SuiviListComponent implements OnInit {

  reptile: Reptile;
  suivis: Suivi[];
  idSuivis: any;
  firstYearOfSuivis: number;
  idReptile = this.route.snapshot.params['id'];
  todayYear = new Date().getFullYear();
  year: number = this.route.snapshot.params['year'];

  constructor(private route: ActivatedRoute, private reptilesService: ReptilesService,
              private suivisService: SuivisService, private router: Router) {}

  ngOnInit() {
    this.reptile = new Reptile('', '', '', '', '', '', '', '');
    this.reptilesService.getShowReptile(this.idReptile).then(
      (reptile: Reptile) => {
        this.reptile = reptile;
      }
    );
    // Get last suivis
    firebase.database().ref('/suivis/'+this.idReptile).orderByChild('date').startAt(this.year).endAt(this.year+1)
      .on('value', (data) => {
        let suivisCheck = []
        let suivisCheckId = []
        data.forEach(function(child) {
          suivisCheckId.push(child.key)
          suivisCheck.push(child.val())
        });
        this.idSuivis = suivisCheckId.reverse();
        this.suivis = suivisCheck.reverse();
      });
    // Get first suivi
    firebase.database().ref('/suivis/'+this.idReptile).orderByChild('date').limitToFirst(1)
      .on('value', (data) => {
        let firstYear;
        data.forEach(function(child) {
          firstYear = child.val().date
        });
        this.firstYearOfSuivis = firstYear.substr(0, 4);
      });
  }

  counter(i: number) {
      return new Array(i);
  }

  onBackFiche() {
    this.router.navigate(['/reptiles', 'view', this.idReptile]);
  }

  onNewSuivi() {
    this.router.navigate(['/reptiles', this.idReptile, 'suivis', 'new']);
  }

  onDeleteSuivi(id) {
    if (confirm("êtes vous sûr de vouloir supprimer ce suivi ?")) {
      this.suivisService.removeSuivi(this.idReptile, id)
    }
  }

  onChangeSuiviByYear(y) {
    this.year = y
    firebase.database().ref('/suivis/'+this.idReptile).orderByChild('date').startAt(this.year).endAt(this.year+1)
      .on('value', (data) => {
        let suivisCheck = []
        let suivisCheckId = []
        data.forEach(function(child) {
          suivisCheckId.push(child.key)
          suivisCheck.push(child.val())
        });
        this.idSuivis = suivisCheckId.reverse();
        this.suivis = suivisCheck.reverse();
      });
    this.router.navigate(['/reptiles', this.idReptile, 'suivis', y]);
  }

}
