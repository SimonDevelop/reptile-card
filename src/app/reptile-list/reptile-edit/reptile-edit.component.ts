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
          birthday: [this.reptile.birthday, Validators.required],
          species: [this.reptile.species, Validators.required],
          gender: [this.reptile.gender, Validators.required],
          note: this.reptile.note
        });
      }
    );
  }

  onSaveReptile() {
    const name = this.reptileEdit.get('name').value;
    const birthday = this.reptileEdit.get('birthday').value;
    const species = this.reptileEdit.get('species').value;
    const gender = this.reptileEdit.get('gender').value;
    const note = this.reptileEdit.get('note').value;
    const newReptile = new Reptile(name, birthday, species, gender);
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
