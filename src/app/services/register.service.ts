import { Injectable } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';

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
            const now = new Date().valueOf();
            const eventDate = new Date('12/18/2022').valueOf();
            if (now >= eventDate) {
              this.FireStore.doc('Registers/' + CI).update({
                attendance: true,
              });
              this.showAlert('Registro exitoso');
            } else {
              this.showAlert('Registro exitoso (Solo pruebas)');
            }
          } else {
            this.showAlert('El usuario ya fué verificado una vez');
          }
        } else {
          this.showAlert('El usuario no existe');
        }
        this.dismissLoadingView();
        setTimeout(() => {
          this.router.navigate(['/home']);
        }, 1000);
      });
  }

  async showAlert(msj: string) {
    // A este se le puede poner un icono de confirmacion
    const alert = await this.alertController.create({
      message: msj,
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
      //duration: 3000,
    });
  }

  dismissLoadingView() {
    if (!this.loader) {
      return;
    }

    this.loader.dismiss();
  }
}
