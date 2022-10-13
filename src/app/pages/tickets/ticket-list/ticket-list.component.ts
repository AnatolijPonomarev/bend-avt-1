import { Component, OnInit } from '@angular/core';
import { Tour } from 'src/app/models/tours';
import {TicketsService} from '../../../shared/services/tickets/tickets.service'

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.scss']
})
export class TicketListComponent implements OnInit {
  tickets: Tour[]
  constructor(private ticketService: TicketsService) { }

  ngOnInit(): void {
    this.ticketService.getTickets().subscribe(
      (data) => {
        this.tickets = data
      }
      )
  }

}
