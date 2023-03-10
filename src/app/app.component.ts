import { Component } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';

import { NewAppointmentComponent } from './new-appointment/new-appointment.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  constructor(public dialog: MatDialog) {}

  title = 'payever-test';
  dates = new Array(30).fill(0).map((_, index) => index + 1);
  dateTasks = new Array(30).fill(null).map(_ => ['Get to work', 'Pick up groceries', 'Go home', 'Fall asleep']);

  addNewAppointment(): void {
    const dialogRef = this.dialog.open(NewAppointmentComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {});
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
}
