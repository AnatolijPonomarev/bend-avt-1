import { Component, OnInit } from '@angular/core';
import { IMenuType } from 'src/app/models/menuType';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss']
})
export class TicketsComponent implements OnInit {
  selectedType: IMenuType = {type: 'common', label: 'Обычное'}
  constructor() { }

  ngOnInit(): void {
    }

    updateSelectedType(ev: IMenuType):void {
      console.log('ev', ev)
      this.selectedType = ev
    }
}
