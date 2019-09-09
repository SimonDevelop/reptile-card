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
