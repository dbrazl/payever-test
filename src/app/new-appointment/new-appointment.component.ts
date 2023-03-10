import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-new-appointment',
  templateUrl: './new-appointment.component.html',
  styleUrls: ['./new-appointment.component.scss']
})
export class NewAppointmentComponent {
  constructor(
    public dialogRef: MatDialogRef<NewAppointmentComponent>,
  ) {}

  cancel(): void {
    this.dialogRef.close();
  }
}
