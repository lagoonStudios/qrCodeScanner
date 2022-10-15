import { Component, Injector, OnInit } from '@angular/core';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { Capacitor } from '@capacitor/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.page.html',
  styleUrls: ['./scanner.page.scss'],
})
export class ScannerPage implements OnInit {

  navCtrl: NavController
  isApp: boolean = false;

  constructor(injector: Injector) { 
    this.navCtrl = injector.get(NavController);
    this.isApp = Capacitor.isNativePlatform();
  }

  ngOnInit() {
    if(this.isApp){
      BarcodeScanner.prepare();
      this.checkPermission();
    }
  }

  ionViewWillLeave(){
    this.stopScan();
  }

  async startScan(){
    await BarcodeScanner.checkPermission({ force: true });
    BarcodeScanner.hideBackground();
    const result = await BarcodeScanner.startScan();
    if (result.hasContent) {
      alert('Resultado: ' + result.content);
      console.log(result.content);
    }
  }

  async checkPermission(){
    const status = await BarcodeScanner.checkPermission({force: true});

    if (status.denied) {
      // the user denied permission for good
      // redirect user to app settings if they want to grant it anyway
      const c = confirm('Si deseas dar permisos para usar la camara, activalo en la configuración de la app');
      if (c) {
        BarcodeScanner.openAppSettings();
      }
    }else if (status.granted) {
      // the user granted permission
      this.startScan()
    }
  }

  stopScan(){
    BarcodeScanner.stopScan();
    this.navCtrl.back();
  }


}
