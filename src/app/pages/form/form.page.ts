import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterService } from '../../services/register.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.page.html',
  styleUrls: ['./form.page.scss'],
})
export class FormPage implements OnInit {
  form: FormGroup;
  disableBtn = false;
  userExists = false;

  constructor(
    private formBuilder: FormBuilder,
    private registerServise: RegisterService
  ) {}

  ngOnInit() {
    this.buildForm();
  }

  ionViewDidEnter() {
    document.querySelector('ion-input').setFocus();
  }

  buildForm() {
    this.form = this.formBuilder.group({
      ci: ['', [Validators.required, Validators.min(1000000)]],
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  submitForm() {
    console.log('form: ', this.form);
    // this.submitted = true;
    // if (this.form.valid) {
    //   const cedula = this.form.controls['ci'].value;
    //   this.registerServise.confirmAssistance(cedula);
    // } else {
    //   console.log('Debes llenar los campos requeridos');
    // }
  }
}
