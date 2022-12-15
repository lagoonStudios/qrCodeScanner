import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { Capacitor } from '@capacitor/core';
import { RegisterService } from '../../services/register.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.page.html',
  styleUrls: ['./scanner.page.scss'],
})
export class ScannerPage implements OnInit {
  showCamera: boolean = true;
  isApp: boolean = false;

  constructor(
    private registerService: RegisterService,
    private router: Router
  ) {
    this.isApp = Capacitor.isNativePlatform();
  }

  ngOnInit() {
    if (this.isApp) {
      BarcodeScanner.prepare();
      this.checkPermission();
    }
  }

  ionViewWillLeave() {
    this.stopScan();
  }

  async startScan() {
    this.showCamera = true;
    await BarcodeScanner.checkPermission({ force: true });
    BarcodeScanner.hideBackground();
    const result = await BarcodeScanner.startScan();
    this.showCamera = false;
    if (result.hasContent) {
      BarcodeScanner.showBackground();
      this.registerService.confirmAssistance(result.content);
      this.router.navigate(['/home']);
    }
  }

  async checkPermission() {
    const status = await BarcodeScanner.checkPermission({ force: true });

    if (status.denied) {
      // the user denied permission for good
      // redirect user to app settings if they want to grant it anyway
      const c = confirm(
        'Si deseas dar permisos para usar la camara, activalo en la configuración de la app'
      );
      if (c) {
        BarcodeScanner.openAppSettings();
      }
    } else if (status.granted) {
      // the user granted permission
      this.startScan();
    }
  }

  stopScan() {
    BarcodeScanner.stopScan();
    BarcodeScanner.showBackground();
    this.showCamera = false;
    this.router.navigate(['/home']);
  }
}
