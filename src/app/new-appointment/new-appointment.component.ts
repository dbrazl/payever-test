import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppointmentService, Task } from '../appointment.service';

@Component({
  selector: 'app-new-appointment',
  templateUrl: './new-appointment.component.html',
  styleUrls: ['./new-appointment.component.scss']
})
export class NewAppointmentComponent {
  date = 0;
  search = '';

  constructor(
    public dialogRef: MatDialogRef<NewAppointmentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: number,
    private appointmentService: AppointmentService
  ) {
    this.date = data;
  }

  cancel(): void {
    this.dialogRef.close();
  }

  onSearch(search: string) {
    this.search = search;
  }

  addTask(): void {
    this.appointmentService.setTask(this.search, this.date);
    this.cancel();
  }
}
