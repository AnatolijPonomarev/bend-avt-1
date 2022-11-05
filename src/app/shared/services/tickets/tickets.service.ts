import { Injectable } from '@angular/core';
import { map, Observable, Subject } from 'rxjs';
import { INearestTour, ITourLocation, ITourTypeSelect, Tour } from 'src/app/models/tours';
import { TicketRestService } from '../rest/ticket-rest.service';

@Injectable({
  providedIn: 'root'
})
export class TicketsService {

  private ticketSubject = new Subject<ITourTypeSelect>()

  // readonly ticketType$ = this.ticketSubject.asObservable()

  constructor(private ticketServiceRest: TicketRestService) { }

  // getTickets() {
  //   return this.ticketServiceRest.getTickets()
  // }

  getTickets() {
    return this.ticketServiceRest.getTickets().pipe( map(
      (value: Tour[]) => {
        const singleTour = value.filter( el => el.type === 'single')
        console.log(singleTour)
        return value.concat(singleTour)
      }
    ))
  }
  getTicketTypeObservable():Observable<ITourTypeSelect> {
    return this.ticketSubject.asObservable()
  }

  updateTour(type: ITourTypeSelect): void {
    this.ticketSubject.next(type)
  }
  getError():Observable<any> {

    return this.ticketServiceRest.getRestError()
  }

  getNearestTours(): Observable<INearestTour[]> {
    return this.ticketServiceRest.getNearestTickets()
  }

  getToursLocation(): Observable<ITourLocation[]> {
    return this.ticketServiceRest.getLocationList()
  }
}
