import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ScheduleService } from '../services/schedule.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-course-dialog',
  templateUrl: './course-dialog.component.html',
  styleUrls: ['./course-dialog.component.css'],
})
export class CourseDialogComponent {
  constructor(
    private scheduleService: ScheduleService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {}

  scheduleForm: FormGroup = this.fb.group({
    theme: ['', [Validators.required]],
    Periode: ['', [Validators.required]],
    Date: ['', [Validators.required]],
    Level: ['', [Validators.required]],
    Absence: ['', [Validators.required]],
    heure: ['', [Validators.required]],
  });

  createSchedule() {
    console.log('this.scheduleForm.value', this.scheduleForm.value);
    if (this.scheduleForm.invalid) {
      return;
    }

    const selectedDate = this.scheduleForm.get('Date')?.value;
    const dayOfWeek = selectedDate.getDay(); // Récupère le jour de la semaine (0: dimanche, 6: samedi)

    if (dayOfWeek === 0 || dayOfWeek === 6) {
      this.snackBar.open(
        "Impossible d'ajouter un cours le week-end",
        'Fermer',
        {
          duration: 3000, // Durée d'affichage du message (en millisecondes)
        }
      );
      return;
    }

    const data = {
      ...this.scheduleForm.value,
      id_professeur: localStorage.getItem('id'),
    };

    this.scheduleService.createSchedule(data).subscribe((res) => {
      window.location.reload();
    });
  }
}
