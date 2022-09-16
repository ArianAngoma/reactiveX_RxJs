import { Observable, Observer } from 'rxjs'

const observer: Observer<string> = {
  next: (value) => console.log('next', value),
  error: (error) => console.warn('error', error),
  complete: () => console.info('complete')
}
