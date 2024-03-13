import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private isDarkModeSubject = new BehaviorSubject<boolean>(false);
  isDarkMode$: Observable<boolean> = this.isDarkModeSubject.asObservable();

  getIsDarkMode(): boolean {
    return this.isDarkModeSubject.value;
  }

  toggleDarkMode() {
    const isDarkMode = !this.isDarkModeSubject.value;
    this.isDarkModeSubject.next(isDarkMode);
    document.body.classList.toggle('dark-mode', isDarkMode);
  }
}
