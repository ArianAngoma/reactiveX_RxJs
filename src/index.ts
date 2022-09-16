import { Observable, Observer } from 'rxjs'

const observer: Observer<string> = {
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

  return () => {
    clearInterval(interval)
    console.log('Interval destroyed')
  }
})

const subscription1 = interval$.subscribe()
const subscription2 = interval$.subscribe()
const subscription3 = interval$.subscribe()

setTimeout(() => {
  subscription1.unsubscribe()
  subscription2.unsubscribe()
  subscription3.unsubscribe()

  console.log('Completed timeout')
}, 3000)
