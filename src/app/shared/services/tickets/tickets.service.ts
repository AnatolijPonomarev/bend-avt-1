import { Injectable } from '@angular/core';
import { TicketRestService } from '../rest/ticket-rest.service';

@Injectable({
  providedIn: 'root'
})
export class TicketsService {


  constructor(private ticketServiceRest: TicketRestService) { }

  getTickets() {
    return this.ticketServiceRest.getTickets()
  }
}
