import { Component, OnInit, Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Reptile } from '../../models/reptile.model';
import { ReptilesService } from '../../services/reptiles.service';
import { Router } from '@angular/router';
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
  selector: 'app-reptile-form',
  templateUrl: './reptile-form.component.html',
  styleUrls: ['./reptile-form.component.scss'],
  providers: [I18n, {provide: NgbDatepickerI18n, useClass: CustomDatepickerI18n}]
})

export class ReptileFormComponent implements OnInit {

  reptileForm: FormGroup;
  fileIsUploading = false;
  fileUrl: string;
  fileUploaded = false;

  constructor(private formBuilder: FormBuilder, private reptilesService: ReptilesService,
              private router: Router) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.reptileForm = this.formBuilder.group({
      name: ['', Validators.required],
      vernacular: ['', Validators.required],
      species: ['', Validators.required],
      birthday: ['', Validators.required],
      gender: ['', Validators.required],
      origin: ['', Validators.required],
      date_start: ['', Validators.required],
      supporting_start: ['', Validators.required],
      note: ''
    });
  }

  onSaveReptile() {
    const name = this.reptileForm.get('name').value;
    const vernacular = this.reptileForm.get('vernacular').value;
    const species = this.reptileForm.get('species').value;
    let datePickerB = this.reptileForm.get('birthday').value;
    let birthday_let;
    if (datePickerB.year && datePickerB.month && datePickerB.day) {
        birthday_let = datePickerB.year+"-"+datePickerB.month+"-"+datePickerB.day;
    } else {
        birthday_let = datePickerB;
    }
    const birthday = birthday_let;
    const gender = this.reptileForm.get('gender').value;
    const origin = this.reptileForm.get('origin').value;
    let datePickerD = this.reptileForm.get('date_start').value;
    let date_start_let;
    if (datePickerD.year && datePickerD.month && datePickerD.day) {
        date_start_let = datePickerD.year+"-"+datePickerD.month+"-"+datePickerD.day;
    } else {
        date_start_let = datePickerD;
    }
    const date_start = date_start_let;
    const supporting_start = this.reptileForm.get('supporting_start').value;
    const note = this.reptileForm.get('note').value;
    const newReptile = new Reptile(name, vernacular, species, birthday, gender, origin, date_start, supporting_start);
    if (this.fileUrl && this.fileUrl !== "") {
      newReptile.photo = this.fileUrl;
    }
    newReptile.note = note;
    this.reptilesService.createNewReptile(newReptile);
    this.router.navigate(['/reptiles']);
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

  onBackList() {
    this.router.navigate(['/reptiles']);
  }

}
