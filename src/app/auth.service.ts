import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  hideSubject = new Subject<any>();
  openLoginService = new Subject<any>();

  cartSubject = new Subject<any>();
  
}
