import { Component, OnInit, OnDestroy } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';

import { AppointmentService } from './appointment.service';
import { Subscription } from 'rxjs';

import { NewAppointmentComponent } from './new-appointment/new-appointment.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit, OnDestroy {
  constructor(public dialog: MatDialog, private appointmentService: AppointmentService) {}

  title = 'payever-test';
  dates = new Array(30).fill(0).map((_, index) => index + 1);
  dateTasks = new Array(30).fill(null).map(
    (_, index) => index === 0 ? ['Interview', 'Emma birthday', 'Calculus test'] : index === 5 ? ['Physic test'] : []);
  subscription: Subscription = new Subscription();

  ngOnInit(): void {
    this.subscription = this.appointmentService.currentMessage.subscribe(
      (task) => {
        this.dateTasks = this.dateTasks.map((tasks, index) => {
          if (index === task.date - 1) {
            return [...tasks, task.task];
          }

          return tasks;
        });
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  addNewAppointment(date: number): void {
    this.dialog.open(NewAppointmentComponent, {
      width: '400px',
      data: date
    });
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  deleteTask(item: string, listIndex: number) {
    this.dateTasks = this.dateTasks.map((tasks, index) => {
      if (index === listIndex) {
        return tasks.filter(task => task !== item);
      }

      return tasks;
    });
  }
}
