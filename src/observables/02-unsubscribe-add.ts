import { Observable, Observer } from 'rxjs'

const observer: Observer<number> = {
  next: (value) => console.log('next', value),
  error: (error) => console.warn('error', error),
  complete: () => console.info('complete')
}

const interval$ = new Observable<number>(subscriber => {
  let count = 0

  const interval = setInterval(() => {
    count++
    subscriber.next(count)

    console.log(count)
  }, 1000)

  setTimeout(() => {
    subscriber.complete()
  }, 2500)

  return () => {
    clearInterval(interval)
    console.log('Interval destroyed')
  }
})

const subscription1 = interval$.subscribe(observer)
const subscription2 = interval$.subscribe(observer)
const subscription3 = interval$.subscribe(observer)

subscription1.add(subscription2)
subscription2.add(subscription3)

setTimeout(() => {
  subscription1.unsubscribe()
  // subscription2.unsubscribe()
  // subscription3.unsubscribe()

  console.log('Completed timeout')
}, 6000)
