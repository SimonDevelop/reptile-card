import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Reptile } from '../../models/reptile.model';
import { ReptilesService } from '../../services/reptiles.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reptile-end',
  templateUrl: './reptile-end.component.html',
  styleUrls: ['./reptile-end.component.scss']
})
export class ReptileEndComponent implements OnInit {

  reptile: Reptile;
  idReptile = this.route.snapshot.params['id'];
  reptileEnd: FormGroup;

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute,
    private reptilesService: ReptilesService, private router: Router) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.reptilesService.getShowReptile(+this.idReptile).then(
      (reptile: Reptile) => {
        this.reptile = reptile;
        this.reptileEnd = this.formBuilder.group({
          destination: ['', Validators.required],
          date_end: ['', Validators.required],
          death: '',
          supporting_end: ['', Validators.required]
        });
      }
    );
  }

  onSaveReptile() {
    const name = this.reptile.name;
    const vernacular = this.reptile.vernacular;
    const species = this.reptile.species;
    const birthday = this.reptile.birthday;
    const gender = this.reptile.gender;
    const origin = this.reptile.origin;
    const date_start = this.reptile.date_start;
    const supporting_start = this.reptile.supporting_start;
    const note = this.reptile.note;
    const photo = this.reptile.photo;

    const destination = this.reptileEnd.get('destination').value;
    const date_end = this.reptileEnd.get('date_end').value;
    const death = this.reptileEnd.get('death').value;
    const supporting_end = this.reptileEnd.get('supporting_end').value;

    const newReptile = new Reptile(name, vernacular, species, birthday, gender, origin, date_start, supporting_start);
    newReptile.note = note;
    newReptile.photo = photo;
    newReptile.destination = destination;
    newReptile.date_end = date_end;
    newReptile.death = death;
    newReptile.supporting_end = supporting_end;

    this.reptilesService.editReptile(this.idReptile, newReptile);
    this.router.navigate(['/reptiles', 'view', this.idReptile]);
  }

  onBackFiche() {
    this.router.navigate(['/reptiles', 'view', this.idReptile]);
  }

}
