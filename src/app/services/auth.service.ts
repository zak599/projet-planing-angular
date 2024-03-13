import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, throwError } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedIn = false;
  private userSubject = new BehaviorSubject<User | null>(null);
  user$ = this.userSubject.asObservable(); // Observable pour l'utilisateur

  constructor(private http: HttpClient) {
    this.checkLoginStatus();
  }

  checkLoginStatus(): void {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role') as Role;
    const id = localStorage.getItem('id');
    if (token && role && id) {
      this.loggedIn = true;
      // Si l'utilisateur est connecté, mettez à jour le BehaviorSubject avec les informations de l'utilisateur
      this.userSubject.next({
        nom: '',
        email: '',
        address: {
          rue: '',
          numero: '',
          codePostale: 0,
          ville: '',
          pays: '',
        },
        telephone: '',
        password: '',
        userType: role,
      });
    } else {
      this.loggedIn = false;
      this.userSubject.next(null);
    }
  }

  login(email: string, password: string) {
    return this.http
      .post<any>('http://localhost:3000/auth/login', {
        email,
        password,
      })
      .pipe(
        tap((response: any) => {
          console.log('response:', response.id);
          this.loggedIn = true;
          localStorage.setItem('token', response?.token);
          localStorage.setItem('role', response?.role);
          localStorage.setItem('id', response?.id);

          // Mettez à jour le BehaviorSubject avec les nouvelles informations de l'utilisateur
          this.userSubject.next({
            nom: response.nom,
            email: response.email,
            address: response.address,
            telephone: response.telephone,
            password: '',
            userType: response.userType,
          });
        }),
        catchError((error: any) => {
          this.loggedIn = false;
          return throwError(error);
        }),
        // Renvoyez l'objet de réponse directement
        map((response: any) => response)
      );
  }

  logout(): void {
    this.loggedIn = false;
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('id');

    // Réinitialisez le BehaviorSubject à null lorsque l'utilisateur se déconnecte
    this.userSubject.next(null);
  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }

  register(user: User) {
    return this.http
      .post<any>(`http://localhost:3000/auth/register`, user)
      .pipe(
        tap((response: any) => {}),
        catchError((error: any) => {
          return throwError(error);
        })
      );
  }

  getTeacherById(id: string) {
    return this.http.get<any>(`http://localhost:3000/professeur/${id}`);
  }

  getStudentById(id: string) {
    return this.http.get<any>(`http://localhost:3000/etudiant/${id}`);
  }
}

export type Role = 'etudiant' | 'professeur';

export type User = {
  nom: string;
  email: string;
  address: Address;
  telephone: string;
  password: string;
  userType: Role;
};

export type Address = {
  rue: string;
  numero: string;
  codePostale: number;
  ville: string;
  pays: string;
};
