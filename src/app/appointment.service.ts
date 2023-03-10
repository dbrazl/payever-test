import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type Task = {
  task: string;
  date: number;
}

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  constructor() { }

  private messageSource = new BehaviorSubject(<Task>{});
  currentMessage = this.messageSource.asObservable();

  setTask(task: string, date: number) {
    this.messageSource.next({ task, date });
  }
}
