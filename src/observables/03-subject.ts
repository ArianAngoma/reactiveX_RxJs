import { Observable, Observer, Subject } from 'rxjs'

const observer: Observer<number> = {
  next: (value) => console.log('next', value),
  error: (error) => console.warn('error', error),
  complete: () => console.info('complete')
}

const interval$ = new Observable<number>(subscriber => {
  const interval = setInterval(() => subscriber.next(Math.random()), 1000)

  return () => {
    clearInterval(interval)
    console.log('Interval destroyed')
  }
})

// const subscription1 = interval$.subscribe(numberRandom => console.log('subs1', numberRandom))
// const subscription2 = interval$.subscribe(numberRandom => console.log('subs2', numberRandom))

/*
* 1- Casteo múltiple
* 2- También es un observer
* 3- Next, error y complete
*  */
const subject$ = new Subject()

const subscription = interval$.subscribe(subject$)

const subscription1 = subject$.subscribe(observer)
const subscription2 = subject$.subscribe(observer)

setTimeout(() => {
  subject$.next(10)

  subject$.complete()

  subscription.unsubscribe()
}, 3500)
