import { Observable } from 'rxjs'

const obs$ = new Observable<string>(subscriber => {
  // Emit values
  subscriber.next('Hello')
  subscriber.next('World')

  subscriber.next('Hello')
  subscriber.next('World')

  subscriber.complete() // complete the observable

  // This will not be emitted because the observable is completed
  subscriber.next('Hello')
  subscriber.next('World')
})

obs$.subscribe(console.log)
