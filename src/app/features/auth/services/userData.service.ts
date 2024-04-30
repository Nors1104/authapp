import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  private userId = new BehaviorSubject('');
  currentUser = this.userId.asObservable();
  private _idNum: string = '123';
  constructor() {}

  updateUserId(value: string) {
    debugger;
    this.userId.next(value);
  }
  get id() {
    //return [...this._idNum];
    return this._idNum;
  }
  setId(user: string) {
    debugger;
    this._idNum = user;
  }
}
