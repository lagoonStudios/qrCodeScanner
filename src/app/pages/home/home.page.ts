import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Capacitor } from '@capacitor/core';
import { RegisterService } from '../../services/register.service';
import { Register } from 'src/models/register.model';
import { AlertController, ModalController } from '@ionic/angular';
import { rawRegisters } from '../../../assets/data/rawRegisters';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  isApp: boolean = false;

  constructor(
    private registerService: RegisterService,
    private router: Router,
    private alertController: AlertController,
    protected modalController: ModalController
  ) {
    this.isApp = Capacitor.isNativePlatform();
  }

  ngOnInit() {}

  goToForm() {
    this.router.navigate(['/form']);
  }

  async exportData() {
    //Obtener registros
    // this.registerService.getRegisters().subscribe((regs) =>{
    //   console.log('Registros: ', regs);
    // });

    //Realizar registros

    const msg = '<ion-label class="ion-text-center">¿Seguro que deseas envíar los datos? <br /><br /> <b> Por favor realiza esta acción solamente al finalizar el evento.</b></ion-label';

    let alert = await this.alertController.create({
      header: 'Enviar infromación',
      message: msg,
      buttons: [
        {
          text: 'cancelar',
          role: 'cancel',
        },
        {
          text: 'Envíar',
          role: 'confirm',
          handler: async () => {
            let msg2 = '<ion-grid><ion-row><ion-col class="ion-text-center"><img src="../../assets/img/checkmark.svg" class="checkmark" /></ion-icon><br/><ion-text><ion-label>¡Registro exitoso!</ion-label></ion-text></ion-col></ion-row></ion-grid>';
            this.registerService.registers$.forEach(async (reg: Register) => {
              if (Boolean(reg.Asistencia))
                await this.registerService.createDocs(reg, 'Registros');
            });
            this.registerService.registers$ = rawRegisters;
            let alert2 = await this.alertController.create({
              message: msg2,
              buttons: [
                {
                  text: 'Ok',
                  role: 'destructive'
                }
              ]
            });
            alert2.present();
          },
        },
      ],
    });
    alert.present();
  }
}
