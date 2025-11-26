import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <div class="container">
      <h2>Login</h2>
      <form [formGroup]="form" (ngSubmit)="onSubmit()">
        <label>Username</label>
        <input formControlName="username" placeholder="Username" />
        <label>Passwort</label>
        <input type="password" formControlName="password" placeholder="Passwort" />
        <button type="submit" [disabled]="form.invalid || loading">Anmelden</button>
        <div class="error" *ngIf="error">{{ error }}</div>
      </form>
    </div>
  `,
  styles: [`
    .container{max-width:360px;margin:3rem auto;padding:1rem;border:1px solid #ddd;border-radius:8px}
    form{display:flex;flex-direction:column;gap:.5rem}
    input{padding:.5rem}
    .error{color:#b00020;margin-top:.5rem}
  `]
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private router = inject(Router);

  loading = false;
  error: string | null = null;

  form = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  onSubmit() {
    if (this.form.invalid) return;
    const { username, password } = this.form.value as { username: string; password: string };
    this.loading = true;
    this.error = null;
    this.auth.login(username, password).subscribe({
      next: () => {
        // Navigiere je nach Rolle
        const role = this.auth.getRole();
        if (role === 'ROLE_ADMIN') {
          this.router.navigate(['/admin/rooms']);
        } else {
          this.router.navigate(['/day']);
        }
      },
      error: () => {
        this.error = 'Login fehlgeschlagen';
        this.loading = false;
      },
      complete: () => (this.loading = false)
    });
  }
}
