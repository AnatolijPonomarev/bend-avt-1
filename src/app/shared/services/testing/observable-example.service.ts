import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ObservableExampleService {
  private myBehaviorSubject = new BehaviorSubject<string>('Some data from Behavior Subject')
  private mySubject = new Subject<string>()
  private myObservable = new Observable<string>((subscriber) => {
    subscriber.next('someValue from observable')
    setTimeout(() => {
      subscriber.next('More value')
    }, 1500)
  })
  constructor() { }

  getObservable():Observable<string> {
    return this.myObservable
  }
  getSubject(): Subject<string> {
    return this.mySubject
  }
  getBehaviorSubject(): BehaviorSubject<string> {
    return this.myBehaviorSubject
  }

  initObservable(): void {
    const observable = new Observable((subscriber) => {
      subscriber.next(4)
      subscriber.next(5)
      setTimeout(()=> {
        subscriber.next('asyncData')
        subscriber.error('text error')

      }, 400)
    })

    const subscribe = observable.subscribe((data) => {
      console.log('Observable data ', data)
    },
    (error) => console.log(error)
    )
    // subscribe.unsubscribe()
  }


}

