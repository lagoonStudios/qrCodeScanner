import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Capacitor } from '@capacitor/core';
import { RegisterService } from '../../services/register.service';
import { Register } from 'src/models/register.model';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  isApp: boolean = false;

  constructor(private registerService: RegisterService, private router: Router, private alertController: AlertController) { 
    this.isApp = Capacitor.isNativePlatform();
  }

  ngOnInit() {}

  goToForm(){
    this.router.navigate(['/form']);
  }

  async exportData(){
    //Obtener registros
      // this.registerService.getRegisters().subscribe((regs) =>{
      //   console.log('Registros: ', regs);
      // });

    //Realizar registros
    

    let alert = await this.alertController.create({
      header: 'Enviar infromación',
      message: '¿Seguro que deseas envíar los datos?, por favor realiza esta acción solamente al finalizar el evento.',
      buttons: [
        {
          text: 'cancelar',
          role: 'cancel'
        },
        {
          text: 'Envíar',
          role: 'confirm',
          handler: () => {
            console.log('Enviando registros');
            this.registerService.registers$.forEach(reg => {
              this.registerService.createDocs(reg, 'Registros');
            });
          }
        }
      ]
    });
    alert.present();
  }
}
