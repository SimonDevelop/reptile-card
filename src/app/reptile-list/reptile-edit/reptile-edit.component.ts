import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Reptile } from '../../models/reptile.model';
import { ReptilesService } from '../../services/reptiles.service';
import { Router, ActivatedRoute } from '@angular/router';
import * as firebase from 'firebase';

@Component({
  selector: 'app-reptile-edit',
  templateUrl: './reptile-edit.component.html',
  styleUrls: ['./reptile-edit.component.scss']
})
export class ReptileEditComponent implements OnInit {

  reptile: Reptile;
  idReptile = this.route.snapshot.params['id'];
  reptileEdit: FormGroup;
  fileIsUploading = false;
  fileUrl: string;
  fileUploaded = false;

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute,
    private reptilesService: ReptilesService, private router: Router) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.reptilesService.getShowReptile(+this.idReptile).then(
      (reptile: Reptile) => {
        this.reptile = reptile;
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
    const birthday = this.reptileEdit.get('birthday').value;
    const gender = this.reptileEdit.get('gender').value;
    const origin = this.reptileEdit.get('origin').value;
    const date_start = this.reptileEdit.get('date_start').value;
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
            console.log("photo non trouvé !")
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
