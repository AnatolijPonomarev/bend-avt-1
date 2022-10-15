import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Tour } from 'src/app/models/tours';
import { TicketsStorageService } from 'src/app/shared/services/ticketStorage/tickets-storage.service';

@Component({
  selector: 'app-ticket-item',
  templateUrl: './ticket-item.component.html',
  styleUrls: ['./ticket-item.component.scss']
})
export class TicketItemComponent implements OnInit {
  ticket: Tour | undefined
  constructor(private route: ActivatedRoute, private ticketStorage: TicketsStorageService) { }

  ngOnInit(): void {
    const routeIdParam = this.route.snapshot.paramMap.get('id') // for route
    const queryIdParam = this.route.snapshot.queryParamMap.get('id') // for Query Params
    const paramValueId = routeIdParam || queryIdParam
    console.log(queryIdParam)
    if (paramValueId) {
      const ticketStorage = this.ticketStorage.getStorage()
      this.ticket = ticketStorage.find(ticket => ticket.id === paramValueId)
    }
  }

}
