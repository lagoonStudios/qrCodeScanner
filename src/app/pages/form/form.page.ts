import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Register } from 'src/models/register.model';
import escape from 'lodash';
import { RegisterService } from '../../services/register.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-form',
  templateUrl: './form.page.html',
  styleUrls: ['./form.page.scss'],
})
export class FormPage implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private registerServise: RegisterService,
    private navCtrl: NavController
  ) {}
  form: FormGroup;
  disableBtn: boolean = false;
  userExists: boolean = false;

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.email, Validators.required]],
      CI: ['', [Validators.required, Validators.min(0)]],
      donative_type: [''],
    });
  }

  submitForm() {
    if (this.form.valid && !this.userExists) {
      let register: Register = {
        name: escape(this.form.controls.name.value).__wrapped__,
        email: escape(this.form.controls.email.value).__wrapped__,
        id: escape(this.form.controls.CI.value).__wrapped__,
        attendance: true,
        donative: false,
        donative_type: this.form.controls['donative_type'].value,
      };
      console.log(register);
      // this.registerServise.RegisterNewUser(register);
      // this.navCtrl.back();
    } else {
      console.log('Debes llenar los campos requeridos');
    }
  }

  verifyAssistance() {}

  confirmassistance() {
    console.log('Confirmando', this.form.controls['email'].value);
    this.disableBtn = true;
    this.navCtrl.back();
    this.registerServise.confirmAssistance(this.form.controls['email'].value);
  }
}
