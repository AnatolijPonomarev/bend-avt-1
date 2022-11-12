import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscribable, Subscription, fromEvent, debounceTime } from 'rxjs';
import { ColdObservable } from 'rxjs/internal/testing/ColdObservable';
import { BlockStyleDirective } from 'src/app/directive/block-style.directive';
import { ITourTypeSelect, Tour } from 'src/app/models/tours';
import { TicketsStorageService } from 'src/app/shared/services/ticketStorage/tickets-storage.service';
import {TicketsService} from '../../../shared/services/tickets/tickets.service'

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.scss']
})
export class TicketListComponent implements OnInit, OnDestroy {
  tickets: Tour[]
  loadCountBlock: boolean = false
  tourUnsubscriber: Subscription
  ticketCopy: Tour[]

  @ViewChild('tourWrap', {read: BlockStyleDirective}) blockDirective: BlockStyleDirective
  @ViewChild('tourWrap') tourWrap: ElementRef

  @ViewChild('ticketSearch') ticketSearch: ElementRef

  searchTicketSub: Subscription
  ticketSearchValue: string

  constructor(private ticketService: TicketsService,
              private ticketStorage: TicketsStorageService,
              private router: Router,
              private route: ActivatedRoute,
            ) { }

  ngOnInit(): void {

    this.ticketService.getTickets().subscribe(
      (data) => {
        this.tickets = data
        this.ticketStorage.setStorage(data)
      }
      )
      this.ticketService.getTickets().subscribe((data) => {
        this.tickets = data
        this.ticketCopy = [...this.tickets]
        this.ticketStorage.setStorage(data)
      })

      this.tourUnsubscriber = this.ticketService.getTicketTypeObservable().subscribe((data: ITourTypeSelect) => {
        let ticketType: string
        switch(data.value) {
          case 'single':
            this.tickets = this.ticketCopy.filter( el => el.type === 'single')
            break
          case 'multi':
            this.tickets = this.ticketCopy.filter( el => el.type === 'multi')
            break
          case 'all':
          this.tickets = this.ticketCopy
          break
        }

        //calendar filter
        if (data.date) {
          const dateWithoutTime = new Date(data.date).toISOString().split('T');
          const dateValue = dateWithoutTime[0]
          console.log('dateValue',dateValue)
          this.tickets = this.ticketCopy.filter((el) => el.date === dateValue);
        }
        this.blockDirective.initStyle(1)
        setTimeout(() => {
          this.blockDirective.initStyle(1)
          this.blockDirective.updateItems()
          this.loadCountBlock = true
        })
      }
      )

  }

  ngAfterViewInit() {
    //search
    const fromEventObserver = fromEvent(this.ticketSearch.nativeElement, 'keyup', {passive: true})
    this.searchTicketSub = fromEventObserver.pipe(
      debounceTime(200)).subscribe(()=> {
        if (this.ticketSearchValue) {
          let lowerSearch = this.ticketSearchValue.toLowerCase()
          this.tickets = this.ticketCopy.filter( el => {
            let lowerName = el.name.toLowerCase()
           return lowerName.includes(lowerSearch)
          })
        } else {
          this.tickets = [...this.ticketCopy]
        }
      })
  }

  ngOnDestroy(): void {
      this.tourUnsubscriber.unsubscribe()
      this.searchTicketSub.unsubscribe()
  }

  goToTicketInfoPage(item: Tour) {
    //1 вариант роутинга
    // this.router.navigate([`/tickets/ticket/${item.id}`])
    this.router.navigate([`/tickets/ticket`], {queryParams:{id: item.id}})

  }

  directiveRenderComplete(ev: boolean) {
    const el: HTMLElement = this.tourWrap.nativeElement
    setTimeout(()=>{
      this.loadCountBlock = true;
    });
    setTimeout(() => {
      this.blockDirective.initStyle(1)
      // el.firstElementChild?.classList.add('ticket-border', 'slowMoveUp')
    }, 400)
  }
  setInit() {
    this.blockDirective.initStyle(1)
  }
}
