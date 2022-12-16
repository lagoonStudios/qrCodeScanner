import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterService } from '../../services/register.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.page.html',
  styleUrls: ['./form.page.scss'],
})
export class FormPage implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private registerServise: RegisterService,
  ) {}
  form: FormGroup;
  disableBtn: boolean = false;
  userExists: boolean = false;
  submitted: boolean = false;
  @ViewChild('inputCI') input: HTMLIonInputElement;

  ngOnInit() {
    this.buildForm();
  }

  ionViewDidEnter(){
    console.log(this.input)
    this.input.setFocus();
  }

  buildForm() {
    this.form = this.formBuilder.group({
      CI: [
        '',
        [Validators.required, Validators.min(1000000), Validators.max(60000000)],
      ],
    });
  }

  submitForm() {
    this.submitted = true;
    if (this.form.valid) {
      const cedula = this.form.controls['CI'].value;
      this.registerServise.confirmAssistance(cedula);
    } else {
      console.log('Debes llenar los campos requeridos');
    }
  }

}
