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
      birthday: ['', Validators.required],
      species: ['', Validators.required],
      gender: ['', Validators.required],
      note: ''
    });
  }

  onSaveReptile() {
    const name = this.reptileForm.get('name').value;
    const birthday = this.reptileForm.get('birthday').value;
    const species = this.reptileForm.get('species').value;
    const gender = this.reptileForm.get('gender').value;
    const note = this.reptileForm.get('note').value;
    const newReptile = new Reptile(name, birthday, species, gender);
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
