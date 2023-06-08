import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ScheduleService, ScheduleType } from '../services/schedule.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
})
export class DialogComponent implements OnInit {
  course: ScheduleType = {} as ScheduleType;
  teacherName: string = '';
  public dialogRef: MatDialogRef<DialogComponent> =
    {} as MatDialogRef<DialogComponent>;
  professeurOrNot: boolean =
    localStorage.getItem('role') == 'professeur' ? true : false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ScheduleType,
    private scheduleService: ScheduleService,
    private cdr: ChangeDetectorRef,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.authService.getTeacherById(this.data?.id_professeur || '').subscribe((res) => {
      this.teacherName = res.nom;
    })
    this.course = this.data;
  }

  async updateCourse() {
    this.scheduleService.updateSchedule(this.course).subscribe((res) => {
      this.cdr.detectChanges();
      window.location.reload();
    });
  }

  async deleteCourse() {
    this.scheduleService.deleteSchedule(this.course).subscribe((res) => {
      window.location.reload();
    });
  }
 
}
