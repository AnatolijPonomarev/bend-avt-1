import { Component, OnInit, OnDestroy, Input, OnChanges, SimpleChanges } from '@angular/core';
import {MenuItem} from 'primeng/api';
import { IMenuType } from 'src/app/models/menuType';
import { IUser } from 'src/app/models/users';
import { UserService } from 'src/app/shared/services/user/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  items: MenuItem[]
  time: Date;
  user: string;
  private settingsActive = false;
  private timerInterval: number
  @Input() menuType: IMenuType;
  @Input() test: string

  constructor(private userService:UserService) { }

  ngOnInit(): void {
    this.items
    this.items = [
      {
          label: 'Билеты',
          routerLink: ['ticket-list']
      },
      {
        label: 'Выйти',
        routerLink: ['auth']
    }

  ];
  this.timerInterval = window.setInterval( () => {
    this.time = new Date()
  }, 1000 ),

  this.user = this.userService.getUser()?.login

  }
  ngOnDestroy(): void {
    if (this.timerInterval) {
      window.clearInterval(this.timerInterval)
    }
  }

  ngOnChanges(ev: SimpleChanges): void {
    console.log(this.menuType)
    if (ev['menuType']) {
      this.settingsActive = (this.menuType?.type === 'extended');
      this.items = this.initMenuItems();
    }
  }

  initMenuItems(): MenuItem[] {
    return [
        {
            label: 'Билеты',
            routerLink: ['ticket-list']
        },
        {
          label: 'Настройки',
          routerLink: ['/settings'],
          visible: this.settingsActive
        },
        {
          label: 'Выйти',
          routerLink: ['auth']
      }
    ];
  }
}
