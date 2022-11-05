import { EmitterVisitorContext } from '@angular/compiler';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MessageService } from 'primeng/api';
import { IMenuType } from 'src/app/models/menuType';
import { ITourTypeSelect } from 'src/app/models/tours';
import { SettingsService } from 'src/app/shared/services/settings/settings.service';
import { TicketsService } from 'src/app/shared/services/tickets/tickets.service';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.scss']
})
export class AsideComponent implements OnInit {
  menuTypes: IMenuType[];
  obj = { type: 'custom', label: 'Обычное'};
  selectedMenuType: IMenuType;
  tourTypes: ITourTypeSelect[] = [
    {label: 'Все', value: 'all'},
    {label: 'Одиночный', value: 'single'},
    {label: 'Групповой', value: 'multi'},
]

  @Output()
  updateMenuType: EventEmitter<IMenuType> = new EventEmitter()

  constructor(private ticketsService: TicketsService, private messageService: MessageService, private settings: SettingsService) { }

  ngOnInit(): void {
    this.menuTypes = [
      {type: 'custom', label: 'Обычное'},
      {type: 'extended', label: 'Расширенное'}
    ]
    // console.log(this.selectedMenuType)
  }
  changeType(ev: {ev: Event, value: IMenuType}): void {
    console.log('ev', ev)
    this.updateMenuType.emit(ev.value)
  }

  changeTourType(ev: {ev: Event, value: ITourTypeSelect}) {
    this.ticketsService.updateTour(ev.value)
    console.log(ev + 'changeTourType')
  }
  selectDate(ev: string) {
    console.log('ev', ev)
    this.ticketsService.updateTour({date:ev})
}

initRestError(): void {
  this.ticketsService.getError().subscribe({
    next: (data) => {
    },
    error: (err) => {
      this.messageService.add({severity:'error', summary: 'Ошибка' , detail: err.error});
      console.log(err)
    }
  })
 }
//кнопка обновить данные
 initSettingsData(): void {
  this.settings.loadUserSettingsSubject({saveToken: false})
 }
}
