import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TicketListComponent } from './ticket-list/ticket-list.component';
import { TicketsComponent } from './tickets/tickets.component';

const routes: Routes = [
  { path: '',
  component: TicketsComponent,
  children: [
    {
      path: 'ticket-list',
      component: TicketListComponent
    }
  ]
 },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TicketsRoutingModule { }
