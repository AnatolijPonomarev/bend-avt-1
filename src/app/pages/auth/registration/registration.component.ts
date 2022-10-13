import { Component, OnDestroy, OnInit } from '@angular/core';
import {MessageService} from 'primeng/api';
import { IUser } from 'src/app/models/users';
import { AuthService } from 'src/app/shared/services/auth/auth.service';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit, OnDestroy {
  login: string;
  psw: string;
  pswRepeat: string;
  email: string
  cardNumber: string;
  saveUserInStore: string

  loginText: string = 'Login'
  pswText: string = 'Password'

  constructor(private messageService: MessageService, private authService: AuthService) { }

  ngOnInit(): void {
  }
  ngOnDestroy(){
    console.log('Destroyed')
  }

  registration(e:Event):void | boolean {
    if (this.psw !== this.pswRepeat) {
      this.messageService.add({severity:'error', summary:'Пароли не совпадают', detail:''});
      return false;
    }
    const userObj: IUser = {
      psw: this.psw,
      cardNumber: this.cardNumber,
      login: this.login,
      email: this.email,
    }
    if (!this.authService.isUserExists(userObj)) {
      this.authService.setUser(userObj)
      if (this.saveUserInStore) {
        const objUserJsonStr = JSON.stringify(userObj)
        window.localStorage.setItem('user_' + userObj?.login, objUserJsonStr)
      }
      this.messageService.add({severity:'success', summary: this.login + ' зарегистрирован', detail:''});
    } else {
      this.messageService.add({severity:'warn', summary: this.login + ' уже есть', detail:''});
    }

  }
}
