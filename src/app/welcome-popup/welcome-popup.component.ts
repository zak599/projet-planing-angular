import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from '../services/auth.service'; // Importez le service AuthService

@Component({
  selector: 'app-welcome-popup',
  templateUrl: './welcome-popup.component.html',
  styleUrls: ['./welcome-popup.component.css'],
})
export class WelcomePopupComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public authService: AuthService // Déclarez le service AuthService comme public
  ) {}
}
