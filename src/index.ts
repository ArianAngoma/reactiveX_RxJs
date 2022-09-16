import { Observable, Observer, Subject } from 'rxjs'

const observer: Observer<number> = {
  next: (value) => console.log('next', value),
  error: (error) => console.warn('error', error),
  complete: () => console.info('complete')
}

const intervalo$ = new Observable<number>(subscriber => {
  const interval = setInterval(() => subscriber.next(Math.random()), 5000)

  return () => clearInterval(interval)
})

// const subscription1 = intervalo$.subscribe(numberRandom => console.log('subs1', numberRandom))
// const subscription2 = intervalo$.subscribe(numberRandom => console.log('subs2', numberRandom))

/*
* 1- Casteo múltiple
* 2- También es un observer
* 3- Next, error y complete
*  */
const subject$ = new Subject()

intervalo$.subscribe(subject$)

const subscription1 = subject$.subscribe(numberRandom => console.log('subs1', numberRandom))
const subscription2 = subject$.subscribe(numberRandom => console.log('subs2', numberRandom))
