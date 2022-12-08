import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Capacitor } from '@capacitor/core';
import { RegisterService } from '../../services/register.service';
import { Register } from 'src/models/register.model';
import { AlertController, ModalController } from '@ionic/angular';

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
}
