import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Suivi } from '../../models/suivi.model';
import { Reptile } from '../../models/reptile.model';
import { SuivisService } from '../../services/suivis.service';
import { ReptilesService } from 'src/app/services/reptiles.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-suivi-form',
  templateUrl: './suivi-form.component.html',
  styleUrls: ['./suivi-form.component.scss']
})
export class SuiviFormComponent implements OnInit {

  reptile: Reptile;
  idReptile = this.route.snapshot.params['id'];
  suiviForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute,
    private reptilesService: ReptilesService, private suivisService: SuivisService, private router: Router) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.reptilesService.getShowReptile(+this.idReptile).then(
      (reptile: Reptile) => {
        this.reptile = reptile;
      }
    );
    this.suiviForm = this.formBuilder.group({
      action: ['', Validators.required],
      date: ['', Validators.required],
      note: ['', Validators.required]
    });
  }

  onSaveSuivi() {
    const action = this.suiviForm.get('action').value;
    const date = this.suiviForm.get('date').value;
    const note = this.suiviForm.get('note').value;
    const newSuivi = new Suivi(action, date, note);
    this.suivisService.createNewSuivi(this.idReptile, newSuivi);
    this.router.navigate(['/reptiles', 'view', this.idReptile]);
  }

}
