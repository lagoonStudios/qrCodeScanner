import { Injectable } from '@angular/core';
import { Register } from 'src/models/register.model';
import { AlertController } from '@ionic/angular';
import { find } from 'lodash';
import { LocalStorageService } from './local-storage.service';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  registers$: Register[] = [];

  constructor(
    private alertController: AlertController,
    private sotrage: LocalStorageService,
    public FireStore: AngularFirestore
  ) {}

  async confirmAssistance(email: string) {
    const ind = this.registers$.findIndex((reg) => {
      return reg['Dirección de correo electrónico'] === email;
    });
    if (ind !== -1) {
      this.registers$[ind].Asistencia = true;

      const msg =
        '<ion-grid><ion-row><ion-col class="ion-text-center"><img src="../../assets/img/checkmark.svg" class="checkmark" /><br/><ion-text><ion-label>¡Registro exitoso!</ion-label></ion-text></ion-col></ion-row></ion-grid>' +
        this.registers$[ind]['Nombres y Apellidos'];
      console.log('Se registra asistencia del correo: ', email);
      const toast = await this.alertController.create({
        message: msg,
        buttons: [
          {
            text: 'Ok',
            role: 'destructive',
          },
        ],
      });
      toast.present();
    } else {
      const msg =
        '<ion-grid><ion-row><ion-col class="ion-text-center"><img src="../../assets/img/checkmark.svg" class="checkmark" /><br/><ion-text><ion-label>No se encontró registro</ion-label></ion-text></ion-col></ion-row></ion-grid>' +
        email;

      const toast = await this.alertController.create({
        message: msg,
        buttons: [
          {
            text: 'Ok',
            role: 'destructive',
          },
        ],
      });
      toast.present();
    }
  }

  async RegisterNewUser(register: Register) {
    const exists: boolean = find(this.registers$, (reg: Register) => {
      return (
        reg['Dirección de correo electrónico'] ===
        register['Dirección de correo electrónico']
      );
    });
    if (exists == undefined) {
      this.registers$.push(register);
      this.sotrage.setRegisters(this.registers$);
      this.createDocs(register, 'Registros');
      const msg =
        '<ion-grid><ion-row><ion-col class="ion-text-center"><img src="../../assets/img/checkmark.svg" class="checkmark" /></ion-icon><br/><ion-text><ion-label>¡Registro exitoso!</ion-label></ion-text></ion-col></ion-row></ion-grid>';
      let alert = await this.alertController.create({ message: msg });
      alert.present();
    } else {
      const msg =
        '<ion-grid><ion-row><ion-col class="ion-text-center"><img src="../../assets/img/checkmark.svg" class="checkmark" /></ion-icon><br/><ion-text><ion-label>El usuario ya está registrado</ion-label></ion-text></ion-col></ion-row></ion-grid>';
      let alert = await this.alertController.create({ message: msg });
      alert.present();
    }
  }

  createDocs(data: Register, url: string) {
    data.Id = this.FireStore.createId();
    let ref = this.FireStore.collection<Register>(url);
    return ref.doc().set(data);
  }

  getRegisters(): Observable<Register[]> {
    const items = this.FireStore.collection<Register>('Registros');
    return items.valueChanges();
  }
}
