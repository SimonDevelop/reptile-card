import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Reptile } from '../../models/reptile.model';
import { ReptilesService } from '../../services/reptiles.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reptile-form',
  templateUrl: './reptile-form.component.html',
  styleUrls: ['./reptile-form.component.scss']
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
    const birthday = this.reptileForm.get('birthday').value;
    const gender = this.reptileForm.get('gender').value;
    const origin = this.reptileForm.get('origin').value;
    const date_start = this.reptileForm.get('date_start').value;
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

}
