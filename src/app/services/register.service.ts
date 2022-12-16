import { Injectable } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Register } from 'src/models/register.model';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  loader: HTMLIonLoadingElement;

  constructor(
    private alertController: AlertController,
    public FireStore: AngularFirestore,
    private loadingCtrl: LoadingController,
    private router: Router
  ) {}

  // setDoc(data: any, url: string) {
  //   let ref = this.FireStore.collection<any>(url);
  //   return ref.doc().set(data);
  // }

  confirmAssistance(CI: string) {
    this.showLoadingView();
    this.FireStore.doc('Registers/' + CI)
      .get()
      .subscribe((res) => {
        const data: any = res.data();
        console.log(data);
        if (data) {
          if (data.attendance === false) {
              this.FireStore.doc('Registers/' + CI).update({
                attendance: true,
              });
              this.dismissLoadingView();
              this.router.navigate(['/home']);
              this.showAlert('Registro exitoso', data);
          } else {
            this.dismissLoadingView();
            this.router.navigate(['/home']);
            this.showAlert('El usuario ya fué verificado una vez', data);
          }
        } else {
          this.dismissLoadingView();
          this.router.navigate(['/home']);
          this.showAlert('El usuario no existe', data);
        }
      });
  }

  async showAlert(msj: string, data: Register) {
    const mesage = data != undefined ? `<p>Nombre: <b>${data.name}</b></p> <p>Documento de Identidad: <b>${data.id}</b></p>` : '';
    const alert = await this.alertController.create({
      header: msj,
      message: data != undefined ? mesage : '',
      buttons: [
        {
          text: 'Ok',
          role: 'confirm',
        },
      ],
    });
    alert.present();
  }

  async showLoadingView() {
    this.loader = await this.loadingCtrl.create({
      message: 'Cargando...',
      spinner: 'circular',
      backdropDismiss: false,
    });
    this.loader.present();
  }

  dismissLoadingView() {
    if (!this.loader) {
      return;
    }
    this.loader.dismiss();
  }
}
