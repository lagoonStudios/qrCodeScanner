import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  loading: HTMLIonAlertElement;

  constructor(
    private alertController: AlertController,
    public FireStore: AngularFirestore
  ) {}

  setDoc(data: any, url: string) {
    let ref = this.FireStore.collection<any>(url);
    return ref.doc().set(data);
  }

  confirmAssistance(CI: string) {
    this.showLoadingView();
    this.FireStore.doc('Registers/' + CI)
      .get()
      .subscribe((res) => {
        const data: any = res.data();
        console.log(data);
        if (data) {
          if (data.attendance === false) {
            this.FireStore.doc('Registers/' + CI).update({ attendance: true });
            this.showAlert('Registro exitoso');
          } else {
            this.showAlert('El usuario ya fué verificado una vez');
          }
        } else {
          this.showAlert('El usuario no existe');
        }
        this.dismissLoadingView();
      });
  }

  async showAlert(msj: string) {
    // A este se le puede poner un icono de confirmacion
    const alert = await this.alertController.create({
      message: msj,
    });
    alert.present();
  }

  async showLoadingView() {
    // A este se le puede poner un loader
    this.loading = await this.alertController.create({
      backdropDismiss: false,
      message: 'Cargando...',
    });
    this.loading.present();
  }

  dismissLoadingView() {
    if (this.loading) {
      this.loading.dismiss();
    }
  }
}
