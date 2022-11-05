import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { INearestTour, ITourLocation, Tour } from 'src/app/models/tours';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class TicketRestService {

  constructor(private http: HttpClient) { }

  getTickets():Observable<Tour[]> {
    return this.http.get<Tour[]>('https://62b9e756ff109cd1dc9dae16.mockapi.io/apiv/v1/tours/',
    // {headers: {'asd': 'asdasd'}
  // }
  )
  }

  getRestError():Observable<any> {
    return this.http.get<any>('https://62b9e756ff109cd1dc9dae16.mockapi.io/apiv/v1/tours/notFound');
  }

  getNearestTickets(): Observable<INearestTour[]> {
    return this.http.get<INearestTour[]>('https://62b9e756ff109cd1dc9dae16.mockapi.io/apiv/v1/nearestTours/')
  }

  getLocationList(): Observable<ITourLocation[]> {
    return this.http.get<ITourLocation[]>('https://62b9e756ff109cd1dc9dae16.mockapi.io/apiv/v1/location/')
  }
}
