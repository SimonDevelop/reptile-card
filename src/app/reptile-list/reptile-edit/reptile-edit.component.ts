import { Component, OnInit, Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Reptile } from '../../models/reptile.model';
import { ReptilesService } from '../../services/reptiles.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbDatepickerConfig, NgbDatepickerI18n, NgbDateStruct, NgbCalendar, NgbDate } from '@ng-bootstrap/ng-bootstrap';

import * as firebase from 'firebase';

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
    config.minDate = {
      year: (new Date().getFullYear())-50,
      month: 1,
      day: 1
    };
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
  selector: 'app-reptile-edit',
  templateUrl: './reptile-edit.component.html',
  styleUrls: ['./reptile-edit.component.scss'],
  providers: [I18n, {provide: NgbDatepickerI18n, useClass: CustomDatepickerI18n}]
})
export class ReptileEditComponent implements OnInit {

  reptile: Reptile;
  idReptile = this.route.snapshot.params['id'];
  reptileEdit: FormGroup;
  fileIsUploading = false;
  fileUrl: string;
  fileUploaded = false;
  birthday;
  dateStart;

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute,
    private reptilesService: ReptilesService, private router: Router, private calendar: NgbCalendar) {}

  ngOnInit() {
    this.initForm();
  }

  toDate(dob) {
    const [year, month, day] = dob.split('-');
    return {"year": year, "month": month, "day": day};
  }

  initForm() {
    this.reptilesService.getShowReptile(this.idReptile).then(
      (reptile: Reptile) => {
        this.reptile = reptile;
        let birthday = this.toDate(this.reptile.birthday)
        let dateStart = this.toDate(this.reptile.date_start)
        this.birthday = new NgbDate(parseInt(birthday.year), parseInt(birthday.month), parseInt(birthday.day))
        this.dateStart = new NgbDate(parseInt(dateStart.year), parseInt(dateStart.month), parseInt(dateStart.day))
        this.reptileEdit = this.formBuilder.group({
          name: [this.reptile.name, Validators.required],
          vernacular: [this.reptile.vernacular, Validators.required],
          species: [this.reptile.species, Validators.required],
          birthday: [this.reptile.birthday, Validators.required],
          gender: [this.reptile.gender, Validators.required],
          origin: [this.reptile.origin, Validators.required],
          date_start: [this.reptile.date_start, Validators.required],
          supporting_start: [this.reptile.supporting_start, Validators.required],
          note: this.reptile.note
        });
      }
    );
  }

  onSaveReptile() {
    const name = this.reptileEdit.get('name').value;
    const vernacular = this.reptileEdit.get('vernacular').value;
    const species = this.reptileEdit.get('species').value;
    let datePickerB = this.reptileEdit.get('birthday').value;
    let birthday_let;
    if (datePickerB.year && datePickerB.month && datePickerB.day) {
        birthday_let = datePickerB.year+"-"+datePickerB.month+"-"+datePickerB.day;
    } else {
        birthday_let = datePickerB;
    }
    const birthday = birthday_let;
    const gender = this.reptileEdit.get('gender').value;
    const origin = this.reptileEdit.get('origin').value;
    let datePickerD = this.reptileEdit.get('date_start').value;
    let date_start_let;
    if (datePickerD.year && datePickerD.month && datePickerD.day) {
        date_start_let = datePickerD.year+"-"+datePickerD.month+"-"+datePickerD.day;
    } else {
        date_start_let = datePickerD;
    }
    const date_start = date_start_let;
    const supporting_start = this.reptileEdit.get('supporting_start').value;
    const note = this.reptileEdit.get('note').value;
    const newReptile = new Reptile(name, vernacular, species, birthday, gender, origin, date_start, supporting_start);
    newReptile.note = note;
    if (this.fileUrl && this.fileUrl !== "") {
      if (this.reptile.photo !== "") {
        const storageRef = firebase.storage().refFromURL(this.reptile.photo);
        storageRef.delete().then(
          () => {
            console.log("photo supprimé !");
          }
        ).catch(
          (error) => {
            console.log("photo non trouvé : "+error)
          }
        );
      }
      newReptile.photo = this.fileUrl;
    } else {
      newReptile.photo = this.reptile.photo;
    }
    this.reptilesService.editReptile(this.idReptile, newReptile);
    this.router.navigate(['/reptiles', 'view', this.idReptile]);
  }

  onUploadFile(file: File) {
    this.fileIsUploading = true;
    this.reptilesService.uploadFile(file).then(
      (url: string) => {
        this.fileUrl = url;
        this.fileIsUploading = false;
        this.fileUploaded = true;
      }
    )
  }

  detectFiles(event) {
    this.onUploadFile(event.target.files[0]);
  }

  onBackFiche() {
    this.router.navigate(['/reptiles', 'view', this.idReptile]);
  }

}
