import { Injectable } from '@angular/core';
import { IUser } from 'src/app/models/users';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private user: IUser
  private token: string | undefined | null
  private tokenStorage: any
  constructor() { }

  getUser():IUser {
    return this.user
  }
  setUser(user: IUser) {
    this.user = user;
  }

  setToken(token: string) {
    this.token = token
  }

  getToken(): string | null | undefined {
    return this.token
  }

  setToStore(token: string | undefined) {
    this.tokenStorage = token
    window.localStorage.setItem('user_token', JSON.stringify(this.tokenStorage))
  }

  getTokenFromStore() {
    return window.localStorage.getItem('user_token')
  }
  getUserToken(): string | undefined | null {
    console.log('realTOKEN', this.token)
    if (this.token) {
      this.setToStore(this.token)
      return this.token
    } else  {
      this.tokenStorage = window.localStorage.getItem('user_token')
      this.token = JSON.parse(this.tokenStorage)
      return this.token
    }
  }

  removeUserToken(): void {
  window.localStorage.removeItem('user_token')
  console.log(this.token)
  }
  getUserFromStore() {
    return window.localStorage.getItem('user_1')
  }
}
