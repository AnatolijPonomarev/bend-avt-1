import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, TitleStrategy } from '@angular/router';
import { MessageService } from 'primeng/api';
import { IUser } from 'src/app/models/users';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { UserService } from 'src/app/shared/services/user/user.service';


@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.scss']
})

export class AuthorizationComponent implements OnInit {
  loginText: string = 'Login'
  pswText: string = 'Password'

  login: string;
  psw: string;
  isTabCached: boolean = false;
  selectedValue: boolean
  cardNumber: string;
  authTextButton: string
  constructor(private messageService: MessageService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService) { }

  ngOnInit(): void {
    this.authTextButton = 'Авторизоваться'
  }

  onAuth(event: Event):void {
    const authUser: IUser = {
      login: this.login,
      psw: this.psw
    }
    if (this.authService.checkUser(authUser)) {
      this.messageService.add({severity:'success', summary: this.login, detail:'Зашёл'});
      this.router.navigate(['/tickets/ticket-list'])
      this.userService.setUser(authUser)
    } else {
      this.messageService.add({severity:'error', summary: this.login + ' не найден', detail:'Пожалуйста зарегистрируйтесь'});
    }
  }

  vipStatusSelected() {
    // if (this.selectedValue) {
    //   console.log('true')
    // }
  }

}



