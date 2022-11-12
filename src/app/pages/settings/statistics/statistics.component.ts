import { Component, OnDestroy, OnInit } from '@angular/core';
import { ICustomStatisticUser } from 'src/app/models/users';
import { StatisticService } from 'src/app/shared/services/statistic/statistic.service';


@Component({
  selector: 'app-statistic',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {
  cols = [
    {field: 'name', header: 'Имя'},
    {field: 'company', header: 'Компания'},
    {field: 'phone', header: 'Телефон'},
    {field: 'city', header: 'Город'},
    {field: 'street', header: 'Улица'},
  ]

  users: ICustomStatisticUser[] = [
    {
      id: 1,
      name: 'Some Name',
      company: 'COMPANY',
      phone: '123213',
      city: 'PZ',
      street: 'UU'
    }
  ]
  constructor(private statisticService: StatisticService) {}

  ngOnInit(): void {
    this.statisticService.getUserStatistic().subscribe( data => {
      this.users.push(...data)
    })
  }
}
