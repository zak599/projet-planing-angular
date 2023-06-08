import { Component, Input } from '@angular/core';
import { ScheduleType } from '../services/schedule.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-table-column',
  templateUrl: './table-column.component.html',
  styleUrls: ['./table-column.component.css'],
})
export class TableColumnComponent {
  @Input() days: Array<string> = [];
  @Input() courses: Array<ScheduleType> = [];
  @Input() hour: number = 0;

  constructor(public dialog: MatDialog) {}

   openDialog(course: ScheduleType) {
    const dialog = this.dialog.open(DialogComponent, {
      data: course,
    });

    dialog.afterClosed().subscribe((result) => {
    });
  }
}
