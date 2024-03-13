import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { WelcomePopupComponent } from '../welcome-popup/welcome-popup.component';

/*import { LoginService } from '../login.service';*/

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthService],
})
export class LoginComponent implements OnInit {
  hide: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit() {}

  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  async onLogin() {
    if (this.loginForm.invalid) {
      return;
    }
    this.authService
      .login(this.loginForm.value.email, this.loginForm.value.password)
      .subscribe(
        (res) => {
          if (res.token) {
            this.router.navigate(['/dashboard']);
          }
        },
        (error) => {
          this.snackBar.open('identifiant erroné', 'Close', {
            duration: 2000,
            verticalPosition: 'top',
          });
        }
      );
  }
  openWelcomePopup(): void {
    this.authService.user$.subscribe((user) => {
      const dialogRef = this.dialog.open(WelcomePopupComponent, {
        width: '400px',
        data: { user: user?.email }, // Assurez-vous d'injecter les informations de l'utilisateur ici
      });
    });
  }
  goToRegister() {
    this.router.navigate(['register']);
  }
}
