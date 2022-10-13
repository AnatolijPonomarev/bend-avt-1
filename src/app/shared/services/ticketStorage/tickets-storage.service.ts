import { Injectable } from '@angular/core';
import { Tour } from '../../../models/tours'
@Injectable({
  providedIn: 'root'
})
export class TicketsStorageService {
  private ticketStorage: Tour[]
  constructor() { }

  setStorage(data: Tour[]) {
    this.ticketStorage = data;
  }
  getStorage(): Tour[] {
    return this.ticketStorage;
  }
}
