import { Component } from '@angular/core';
import { rawRegisters } from 'src/assets/data/rawRegisters';
import { RegisterService } from './services/register.service';
import { LocalStorageService } from './services/local-storage.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private storage: LocalStorageService,
    private registerService: RegisterService,
    private toastController: ToastController
  ) {
    this.storage.getRegisters().then(
      (res) => {
        if (res == null) {
          this.storage.setRegisters(rawRegisters);
          this.registerService.registers$ = rawRegisters;
          console.log(
            'se setean los registros por primera vez.',
            this.registerService.registers$
          );
        } else {          
          this.registerService.registers$ = res;
          console.log('ya existen los registros en el localStorage: ', this.registerService.registers$);
        }
      },
      async (err) => {
        let toast = await this.toastController.create({
          message: 'Ocurrió un error al cargar los datos',
          duration: 10000,
        });
        toast.present();
      }
    );
  }
}
