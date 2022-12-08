import { Injectable } from '@angular/core';
import { Register } from 'src/models/register.model';
import { AlertController } from '@ionic/angular';
import { find } from 'lodash';
import {
  AngularFirestore,
} from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  // registers$: Register[] = [];

  constructor(
    private alertController: AlertController,
    public FireStore: AngularFirestore
  ) {}

  async confirmAssistance(email: string) {
  }

  async RegisterNewUser(register: Register) {
    await this.createDocs(register, 'Registers');
  }

  createDocs(data: any, url: string) {
    let ref = this.FireStore.collection<any>(url);
    return ref.doc().set(data);
  }

  getRegisters(): Observable<Register[]> {
    const items = this.FireStore.collection<Register>('Registers');
    return items.valueChanges();
  }
}
