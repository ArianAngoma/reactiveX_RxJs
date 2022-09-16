import { Observable, Observer } from 'rxjs'

const observer: Observer<string> = {
  next: (value) => console.log('next', value),
  error: (error) => console.warn('error', error),
  complete: () => console.info('complete')
}

const obs$ = new Observable<string>(subscriber => {
  // Emit values
  subscriber.next('Hello')
  subscriber.next('World')

  subscriber.next('Hello')
  subscriber.next('World')

  // Force an error
  /* const error = undefined
  error.name = 'Test' */

  subscriber.complete() // complete the observable

  // This will not be emitted because the observable is completed
  subscriber.next('Hello')
  subscriber.next('World')
})

/* obs$.subscribe(
  value => console.log('next:', value),
  error => console.warn('error:', error),
  () => console.info('completed')
) */

obs$.subscribe(observer)
