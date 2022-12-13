import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Register } from 'src/models/register.model';
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
      CI: [
        '',
        [Validators.required, Validators.min(0), Validators.minLength(6)],
      ],
    });
  }

  submitForm() {
    if (this.form.valid) {
      const cedula = this.form.controls['CI'].value;
      this.registerServise.confirmAssistance(cedula);
      // this.navCtrl.back();
    } else {
      console.log('Debes llenar los campos requeridos');
    }
  }

  verifyAssistance() {}

  confirmassistance() {
    // console.log('Confirmando', this.form.controls['email'].value);
    // this.disableBtn = true;
    // this.navCtrl.back();
    // this.registerServise.confirmAssistance(this.form.controls['email'].value);
  }
}
