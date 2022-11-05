import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin, Observable } from 'rxjs';
import { INearestTour, ITourLocation, Tour } from 'src/app/models/tours';
import { IUser } from 'src/app/models/users';
import { TicketsService } from 'src/app/shared/services/tickets/tickets.service';
import { TicketsStorageService } from 'src/app/shared/services/ticketStorage/tickets-storage.service';
import { UserService } from 'src/app/shared/services/user/user.service';

@Component({
  selector: 'app-ticket-item',
  templateUrl: './ticket-item.component.html',
  styleUrls: ['./ticket-item.component.scss'],
  host: {'(document:keyup)':'keyBack($event)'}
})
export class TicketItemComponent implements OnInit, AfterViewInit {
  ticket: Tour | undefined
  image: any = 'loading.jpg'
  user: IUser
  userForm: FormGroup
  //Courusel Tickets
  nearestTours: INearestTour[]
  toursLocation: ITourLocation[]
  constructor(private route: ActivatedRoute,
     private ticketStorage: TicketsStorageService,
     private getTickets: TicketsService,
     private routes: Router,
     private userService: UserService,
     private ticketService: TicketsService) { }

  ngOnInit(): void {
    //first get userInfo
    this.user = this.userService.getUser()
    //init formgroup
    this.userForm = new FormGroup({
      firstName: new FormControl('', {validators: Validators.required}),
      lastName: new FormControl('', [Validators.required, Validators.minLength(3)]),
      cardNumber: new FormControl(''),
      birthDay: new FormControl(''),
      age: new FormControl(''),
      citizen: new FormControl('')
    })


    forkJoin([this.ticketService.getNearestTours(), this.ticketService.getToursLocation()])
    .subscribe(data => {
      this.nearestTours = data[0]
      this.toursLocation = data[1]
      console.log(this.nearestTours)
    })
    //id на страницу ticket-info
    const routeIdParam = this.route.snapshot.paramMap.get('id') // for route
    const queryIdParam = this.route.snapshot.queryParamMap.get('id') // for Query Params
    const paramValueId: any = routeIdParam || queryIdParam
    // console.log(paramValueId)
    if (paramValueId) {
      const ticketStorage = this.ticketStorage.getStorage()
      this.ticket = ticketStorage.find(ticket => ticket.id === paramValueId)
      // this.image = this.getTickets.getTickets().subscribe(data => data)
      this.getTickets.getTickets().subscribe(data => {
        let img = data.find(image => image.id === paramValueId)
        this.image = img?.img
        console.log(this.image)
      })

    }

  }

  ngAfterViewInit(): void {
    //set cardNumber
    this.userForm.controls['cardNumber'].setValue(this.user?.cardNumber)
}

  keyBack(event: KeyboardEvent) {
    if (event.key === 'Backspace') {
      this.historyBack()
    }
  }
  historyBack() {
    console.log({relativeTo: this.route})
    this.routes.navigate(['tickets/ticket-list'])
  }

  onSubmit() {

  }
  selectDate($event: Event) {

  }
}
