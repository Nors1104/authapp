import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private _idNum: string = '555';
  constructor() {}

  getId() {
    //return [...this._idNum];
    return this._idNum;
  }
  setId(user: string) {
    debugger;
    this._idNum = user;
  }
}
