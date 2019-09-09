import { Component, OnInit, Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbDatepickerI18n, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Reptile } from '../../models/reptile.model';
import { ReptilesService } from '../../services/reptiles.service';
import { Router } from '@angular/router';

const I18N_VALUES = {
  'fr': {
    weekdays: ['Lu', 'Ma', 'Me', 'Je', 'Ve', 'Sa', 'Di'],
    months: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Aou', 'Sep', 'Oct', 'Nov', 'Déc'],
  }
};

@Injectable()
export class I18n {
  language = 'fr';
}

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
    return `${date.day}/${date.month}/${date.year}`;
  }
}

@Component({
  selector: 'app-reptile-form',
  templateUrl: './reptile-form.component.html',
  styleUrls: ['./reptile-form.component.scss'],
  providers: [I18n, {provide: NgbDatepickerI18n, useClass: CustomDatepickerI18n}]
})

export class ReptileFormComponent implements OnInit {

  reptileForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private reptilesService: ReptilesService,
              private router: Router) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.reptileForm = this.formBuilder.group({
      name: ['', Validators.required],
      birthday: ['', Validators.required],
      note: ''
    });
  }

  onSaveReptile() {
    const name = this.reptileForm.get('name').value;
    const birthday = this.reptileForm.get('birthday').value;
    const note = this.reptileForm.get('note').value;
    const newReptile = new Reptile(name, birthday);
    newReptile.note = note;
    this.reptilesService.createNewReptile(newReptile);
    this.router.navigate(['/reptiles']);
  }

}
