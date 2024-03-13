import { Component, OnInit } from '@angular/core';
declare const AOS: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  ngOnInit() {
    AOS.init();
  }
  isLogged: boolean = localStorage.getItem('token') ? true : false;
  title = 'projet-planing-angular';

  constructor() {}
}
