import { Component, OnInit } from '@angular/core';
import { ScheduleService, ScheduleType } from '../services/schedule.service';
import { AuthService } from '../services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { CourseDialogComponent } from '../course-dialog/course-dialog.component';
import { CalendarOptions, EventClickArg } from '@fullcalendar/core'; // useful for typechecking
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import { DialogComponent } from '../dialog/dialog.component';
import frLocale from '@fullcalendar/core/locales/fr'; // Import the locale

@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  styleUrls: ['./dashbord.component.css'],
  providers: [ScheduleService],
})
export class DashbordComponent implements OnInit {
  scheduleData: ScheduleType[] = [];
  isStudent: boolean = false;
  isProf: boolean =
    localStorage.getItem('role') === 'professeur' ? true : false;
  schedule: any = [];

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    headerToolbar: {
      left: 'prev,next',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay',
    },
    slotMinTime: '08:00', // Heure de début
    slotMaxTime: '17:30', // Heure de fin
    slotDuration: '00:15:00',
    dayCellDidMount: function (info) {
      const date = info.date;
      const day = date.getDay();
      const cellElement = info.el;

      // Vérifie si le jour est un samedi ou un dimanche
      if (day === 0 || day === 6) {
        cellElement.style.backgroundColor = 'lightgray';
      }
    },
    editable: true,
    plugins: [dayGridPlugin, timeGridPlugin],
    displayEventTime: false,
    locale: frLocale,
    eventClick: this.handleEventClick.bind(this),
  };

  constructor(
    public scheduleService: ScheduleService,
    public authService: AuthService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem('role') === 'professeur') {
      this.isStudent = false;
    } else {
      this.isStudent = true;
    }
    this.onGetSchedule();
  }

  onGetSchedule() {
    this.scheduleService.getSchedule().subscribe((res: ScheduleType[]) => {
      console.log(res);
      let scheduleTmp: any[] = [];
      res.map(function (res) {
        const eventDate = new Date(res.Date);
        const eventTime = res.heure
          ? res.heure.toString().padStart(2, '0') + ':00'
          : '';
        const eventDateTime = new Date(
          eventDate.getFullYear(),
          eventDate.getMonth(),
          eventDate.getDate(),
          parseInt(eventTime.slice(0, 2)),
          parseInt(eventTime.slice(3, 5))
        );

        scheduleTmp.push({
          id: res._id,
          title: `${res.theme} - Avec ${res.professeurs[0].nom}`,
          teacherName: res.professeurs[0].nom,
          date: eventDateTime,
        });
      });
      this.scheduleData = res;
      this.calendarOptions = { ...this.calendarOptions, events: scheduleTmp };
    });
  }

  logout() {
    this.authService.logout();
    window.location.reload();
  }

  createCourseDialog() {
    const dialog = this.dialog.open(CourseDialogComponent);
    dialog.afterClosed().subscribe((result) => {});
  }

  handleEventClick(arg: EventClickArg) {
    this.scheduleService.getCheduleById(arg.event.id).subscribe((res) => {
      const dialog = this.dialog.open(DialogComponent, {
        data: res,
      });
      dialog.afterClosed().subscribe((result) => {});
    });
  }
}
