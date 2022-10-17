import { Component } from '@angular/core';
import { rawRegisters } from 'src/assets/data/rawRegisters';
import { RegisterService } from './services/register.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private registerService: RegisterService ) {
    this.registerService.registers$ = rawRegisters;
    console.log('Se copia los datos desde el rawRegisters.ts al registerService');
  }
}
