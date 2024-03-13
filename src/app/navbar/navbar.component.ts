import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService, User } from '../services/auth.service';
import { ThemeService } from '../services/theme.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  user: User | null = null;
  userSubscription: Subscription | null = null;
  isDarkMode: boolean;

  constructor(
    private changeDetector: ChangeDetectorRef,
    public authService: AuthService,
    public themeService: ThemeService,
    private router: Router
  ) {
    this.isDarkMode = this.themeService.getIsDarkMode();
  }

  ngOnInit() {
    this.isDarkMode = this.themeService.getIsDarkMode();
    this.userSubscription = this.authService.user$.subscribe((user) => {
      this.user = user;
      this.changeDetector.detectChanges(); // Déclenchez manuellement la détection de changements
    });
  }

  ngOnDestroy() {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

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

  toggleDarkMode(event: Event) {
    const target = event.target as HTMLInputElement;
    console.log('toggleDarkMode called, checked:', target.checked);
    if (target.checked) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }
}
