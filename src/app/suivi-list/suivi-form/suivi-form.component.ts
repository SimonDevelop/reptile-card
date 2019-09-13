import { Component, OnInit, Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Suivi } from '../../models/suivi.model';
import { Reptile } from '../../models/reptile.model';
import { SuivisService } from '../../services/suivis.service';
import { ReptilesService } from 'src/app/services/reptiles.service';
import { Router, ActivatedRoute } from '@angular/router';
import {NgbDatepickerI18n, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';

const I18N_VALUES = {
  'fr': {
    weekdays: ['Lu', 'Ma', 'Me', 'Je', 'Ve', 'Sa', 'Di'],
    months: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Aou', 'Sep', 'Oct', 'Nov', 'Déc'],
  }
  // other languages you would support
};

@Injectable()
export class I18n {
  language = 'fr';
}

// Define custom service providing the months and weekdays translations
@Injectable()
export class CustomDatepickerI18n extends NgbDatepickerI18n {

  constructor(private _i18n: I18n) {
    super();
  }

  getWeekdayShortName(weekday: number): string {
    return I18N_VALUES[this._i18n.language].weekdays[weekday - 1];
  }
  getMonthShortName(month: number): string {
    return I18N_VALUES[this._i18n.language].months[month - 1];
  }
  getMonthFullName(month: number): string {
    return this.getMonthShortName(month);
  }

  getDayAriaLabel(date: NgbDateStruct): string {
    return `${date.year}-${date.month}-${date.day}`;
  }
}

@Component({
  selector: 'app-suivi-form',
  templateUrl: './suivi-form.component.html',
  styleUrls: ['./suivi-form.component.scss'],
  providers: [I18n, {provide: NgbDatepickerI18n, useClass: CustomDatepickerI18n}]
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
    let datePicker = this.suiviForm.get('date').value;
    let date_let;
    if (datePicker.year && datePicker.month && datePicker.day) {
        date_let = datePicker.year+"-"+datePicker.month+"-"+datePicker.day;
    } else {
        date_let = datePicker;
    }
    const date = date_let;
    const note = this.suiviForm.get('note').value;
    const newSuivi = new Suivi(action, date, note);
    this.suivisService.createNewSuivi(this.idReptile, newSuivi);
    this.router.navigate(['/reptiles', 'view', this.idReptile]);
  }

  onBackFiche() {
    this.router.navigate(['/reptiles', 'view', this.idReptile]);
  }

}
