import { Component, OnInit } from '@angular/core';
import { Capacitor } from '@capacitor/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  isApp: boolean = false;

  constructor(
  ) {
    this.isApp = Capacitor.isNativePlatform();
  }

  ngOnInit() {}
}
