import { Injectable } from '@angular/core';
import { Register } from 'src/models/register.model';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  registers$: Register[] = [];

  constructor(private alertController: AlertController) {}

  async confirmAssistance(email: string) {
    const ind = this.registers$.findIndex((reg) => {
      return reg['Dirección de correo electrónico'] === email;
    });
    if (ind !== -1) {
      this.registers$[ind].Asistencia = true;

      const msg =
        '<ion-grid><ion-row><ion-col class="ion-text-center"><ion-icon name="checkmark-outline"></ion-icon><br/><ion-text><ion-label>Registro exitoso</ion-label></ion-text></ion-col></ion-row></ion-grid>' +
        email;
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
        '<ion-grid><ion-row><ion-col class="ion-text-center"><ion-icon name="close-outline"></ion-icon><br/><ion-text><ion-label>No se encontró registro</ion-label></ion-text></ion-col></ion-row></ion-grid>' +
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
}
