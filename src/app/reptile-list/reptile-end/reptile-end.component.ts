import { Component, OnInit, Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Reptile } from '../../models/reptile.model';
import { ReptilesService } from '../../services/reptiles.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbDatepickerConfig, NgbDatepickerI18n, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

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

  constructor(private _i18n: I18n, config: NgbDatepickerConfig) {
    super();
    config.maxDate = {
        year: (new Date().getFullYear()),
        month: (new Date().getMonth()+1),
        day: (new Date().getDate())
    };
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
  selector: 'app-reptile-end',
  templateUrl: './reptile-end.component.html',
  styleUrls: ['./reptile-end.component.scss'],
  providers: [I18n, {provide: NgbDatepickerI18n, useClass: CustomDatepickerI18n}]
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
    let datePickerD = this.reptileEnd.get('date_end').value;
    let date_end_let;
    if (datePickerD.year && datePickerD.month && datePickerD.day) {
        date_end_let = datePickerD.year+"-"+datePickerD.month+"-"+datePickerD.day;
    } else {
        date_end_let = datePickerD;
    }
    const date_end = date_end_let;
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
