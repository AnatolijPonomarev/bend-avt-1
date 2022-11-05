import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ObservableExampleService } from './shared/services/testing/observable-example.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ticketSales2022';
  prop: string;
  constructor(private testing: ObservableExampleService ) {
    // testing.initObservable()
  }

  ngOnInit() {
    const observable = this.testing.getObservable()
    // this.testing.getObservable().subscribe(val => console.log(val))
    observable.subscribe(data => console.log('First subscribe data', data))
    observable.subscribe(val => {
      console.log('Second subscriber data', val)
    })
    const subject = this.testing.getSubject()
    subject.subscribe((data) => {
      console.log('Subject data', data)
    })
    subject.subscribe((data) => console.log(data))
    //send subjectData
    subject.next('send subject value')
    // subject.next('send subject second value')

    const behaviorSubject = this.testing.getBehaviorSubject()
    behaviorSubject.subscribe((data) => console.log(data))
    behaviorSubject.next('More data to BehaviorSubject')
    //последнее актуальное значение
    behaviorSubject.subscribe((data) => console.log('Second Behavior data : ', data))
  }
}


