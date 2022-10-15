import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlockStyleDirective } from 'src/app/directive/block-style.directive';
import { Tour } from 'src/app/models/tours';
import { TicketsStorageService } from 'src/app/shared/services/ticketStorage/tickets-storage.service';
import {TicketsService} from '../../../shared/services/tickets/tickets.service'

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.scss']
})
export class TicketListComponent implements OnInit {
  tickets: Tour[]
  loadCountBlock: boolean = false
  @ViewChild('tourWrap', {read: BlockStyleDirective}) blockDirective: BlockStyleDirective
  @ViewChild('tourWrap') tourWrap: ElementRef

  constructor(private ticketService: TicketsService, private ticketStorage: TicketsStorageService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.ticketService.getTickets().subscribe(
      (data) => {
        this.tickets = data
        this.ticketStorage.setStorage(data)
      }
      )
  }
  goToTicketInfoPage(item: Tour) {

    //1 вариант роутинга
    // this.router.navigate([`/tickets/ticket/${item.id}`])
    this.router.navigate([`/tickets/ticket`], {queryParams:{id: item.id}})

  }
  ngAfterViewInit() {
    // this.tourWrap
  }
  directiveRenderComplete(ev: boolean) {
    const el: HTMLElement = this.tourWrap.nativeElement
    el.setAttribute('style', 'background-color: #F8F0EF')
    this.blockDirective.initStyle(1)
    setTimeout(()=>{
      this.loadCountBlock = true;
    });

  }
}
