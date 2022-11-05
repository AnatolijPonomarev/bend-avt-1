import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, Subscription, take, takeLast, takeUntil } from 'rxjs';
import { SettingsService } from 'src/app/shared/services/settings/settings.service';
import { ObservableExampleService } from 'src/app/shared/services/testing/observable-example.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/shared/services/user/user.service';
import { IUser } from 'src/app/models/users';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit, OnDestroy {
  private subjectScope: Subject<string> //oberver
  private subjectUnsubscribe: Subscription //observer для отписки
  settingsData: Subscription
  settingsDataSubject: Subscription
  //change password variables
  user: any
  password: string
  userName: string
  newPassword: string
  repeatNewPassword: string
  //takeUntil Subject
  private subjectForUnSubscribe = new Subject()

  constructor(private ObserverExampleService: ObservableExampleService,
    private settingsService: SettingsService,
    private userService: UserService,
    private messageService: MessageService) { }

  ngOnInit(): void {
    const observer = this.ObserverExampleService.getObservable()
    this.subjectScope = this.ObserverExampleService.getSubject()
    this.subjectUnsubscribe = this.subjectScope.subscribe(data => console.log('data is: ', data))

    this.subjectScope.next('value')
    this.subjectScope.next('Move Value')
    const unsubscribe = observer.subscribe(value => console.log(value))
    unsubscribe.unsubscribe()
    //settingsData observable
    this.settingsService.loadUserSettings().pipe(takeUntil(this.subjectForUnSubscribe)).subscribe( (data) => {
      console.log('settingsData', data)
    })

    //settingsData Subject
    // this.settingsDataSubject = this.settingsService.getUserSettingsSubjectObservable().pipe(take(1)).subscribe(
    //   (data) => {
    //     console.log('Settings Data from Subject', data)
    //   }
    // )

    this.settingsService.getUserSettingsSubjectObservable().pipe(takeUntil(this.subjectForUnSubscribe)).subscribe( (data) => {
      console.log('Subject For Subscribe', data)
    })

    //Get user name from store
    this.userName = this.userService.getUser()?.login

  }
  ngOnDestroy(): void {
    // this.subjectUnsubscribe.unsubscribe()
    // this.settingsData.unsubscribe()
    this.subjectForUnSubscribe.next(true)
    this.subjectForUnSubscribe.complete()
  }

  onSubmit() {

  }

  changePass(e: Event): void | boolean {
    this.user = this.userService.getUserFromStore()
    const pass = JSON.parse(this.user)
    if (this.password !== pass.psw) {
      if (this.newPassword !== this.repeatNewPassword) {
        this.messageService.add({severity:'error', summary:'Пароли не совпадают', detail:''});
        return false;
      }
      this.messageService.add({severity:'error', summary:'Пароль неправильный', detail:''});
    } else {
      const user = JSON.parse(this.user)
      const newUser = {
        psw: this.newPassword,
        login: user.login
      }
      const userString = JSON.stringify(newUser)
      window.localStorage.setItem('user_' + newUser.login, userString)
      this.messageService.add({severity:'success', summary:'Пароль изменен', detail:''});
    }
  }

}
