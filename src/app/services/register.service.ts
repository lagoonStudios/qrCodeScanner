import { Injectable } from '@angular/core';
import { Register } from 'src/models/register.model';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  registers$: Register[] = [];


  constructor() {
   }
}
