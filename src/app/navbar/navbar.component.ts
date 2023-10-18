import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ThemeService } from '../services/theme.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  constructor(
    public authService: AuthService,
    private themeService: ThemeService,
    private router: Router
  ) {}
  redirectToLogin() {
    this.router.navigate(['/login']);
  }

  redirectToDashbord() {
    this.router.navigate(['/dashboard']);
  }
  logout() {
    this.authService.logout();
    window.location.reload();
  }

  toggleDarkMode() {
    console.log("Bouton 'Mon Menu' cliqué");
    this.themeService.toggleDarkMode();
  }
}
