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
  constructor(private formBuilder: FormBuilder, private registerServise: RegisterService, private navCtrl: NavController) {}
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
      CI: ['',],
      tlf: [''],
      socialMedia: [''],
      institution: [''],
    });
  }

  submitForm() {
    if (this.form.valid && !this.userExists) {
      let register: Register = {
        'Nombres y Apellidos': escape(this.form.controls.name.value)
          .__wrapped__,
        'Dirección de correo electrónico': escape(
          this.form.controls.email.value
        ).__wrapped__,
        'Cédula de Identidad': escape(this.form.controls.CI.value).__wrapped__,
        'Teléfono móvil': escape(this.form.controls.tlf.value).__wrapped__,
        'Redes sociales': escape(this.form.controls.socialMedia.value)
          .__wrapped__,
        'Institución de donde vienes': escape(
          this.form.controls.institution.value
        ).__wrapped__,
        'Marca temporal': new Date().toISOString(),
        'Teléfono de habitación': '',
        Ocupación: '',
        Asistencia: true,
        Puntuación: '',
      };
      this.registerServise.RegisterNewUser(register)
      this.navCtrl.back();
      ;
    } else {
      console.log('Debes llenar los campos requeridos');
    }
  }

  verifyAssistance(): boolean{
    const ind = this.registerServise.registers$.findIndex((reg) => {
      return reg['Dirección de correo electrónico'] === this.form.controls['email'].value;
    });
    if(ind !== -1 && this.form.controls['email'].value != ''){
      this.disableBtn = true;
      this.userExists = true;
      return true
    }else{
      this.disableBtn = false;
      this.userExists = false;
      return false
    }
  }

  confirmassistance(){
    console.log('Confirmando', this.form.controls['email'].value);
    this.disableBtn = true;
    this.navCtrl.back();
    this.registerServise.confirmAssistance(this.form.controls['email'].value);
  }
}
