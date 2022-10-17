import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { Register } from 'src/models/register.model';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

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
}
