import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { Register } from 'src/models/register.model';
import { RegisterService } from './register.service';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor(private registerService: RegisterService) {}

  async setRegisters(registers: Register[]) {
    await Preferences.set({
      key: 'Registers',
      value: JSON.stringify(registers),
    });
  }

  async getRegisters(): Promise<Register[]> {
    const ret = await Preferences.get({ key: 'Registers' });
    if (ret.value !== 'undefined') return JSON.parse(ret.value);
    else return null;
  }

  createBackup() {
    setInterval(async () => {
      await Preferences.set({
        key: 'Registers',
        value: JSON.stringify(this.registerService.registers$),
      });
      console.log('backup', this.registerService.registers$);
    }, 600000);
  }
}
