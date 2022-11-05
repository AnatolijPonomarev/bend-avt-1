import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TicketListComponent } from './ticket-list/ticket-list.component';
import { TicketsComponent } from './tickets/tickets.component';
import { SettingsComponent } from '../settings/settings/settings.component';
const routes: Routes = [
  { path: '',
  component: TicketsComponent,
  children: [
    {
      path: 'ticket-list',
      component: TicketListComponent
    },
    {
      //вариант передачи роутинга 1
      // path: 'ticket/:id',
      //вариант 2
      path: 'ticket',
      loadChildren: () => import('../ticket-info/ticket-info.module').then(m => m.TicketInfoModule)
    },
    {
      path: 'settings',
      component: SettingsComponent
    }
  ]
 },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TicketsRoutingModule { }
