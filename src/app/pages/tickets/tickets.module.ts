import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TicketsRoutingModule } from './tickets-routing.module';
import { TicketsComponent } from './tickets/tickets.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { TicketListComponent } from './ticket-list/ticket-list.component';
import { AsideComponent } from './aside/aside.component';
import {MenubarModule} from 'primeng/menubar';
import {DropdownModule} from 'primeng/dropdown';
import {FormsModule} from '@angular/forms';
import { BlockStyleDirective } from 'src/app/directive/block-style.directive';
import { SettingsComponent } from '../settings/settings/settings.component';
import {CalendarModule} from 'primeng/calendar';
import {ToastModule} from 'primeng/toast';
import {MessageService} from 'primeng/api';
import {TabViewModule} from 'primeng/tabview';
import { StatisticsComponent } from '../settings/statistics/statistics.component';
import {TableModule} from 'primeng/table';

@NgModule({
  declarations: [
    TicketsComponent,
    HeaderComponent,
    FooterComponent,
    TicketListComponent,
    AsideComponent,
    BlockStyleDirective,
    SettingsComponent,
    StatisticsComponent
  ],
  imports: [
    CommonModule,
    TicketsRoutingModule,
    MenubarModule,
    DropdownModule,
    FormsModule,
    CalendarModule,
    ToastModule,
    TabViewModule,
    TableModule
  ],
  providers: [
    MessageService
  ]
})
export class TicketsModule { }
