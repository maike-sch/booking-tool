import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RaumDTO, RaumService } from '../../services/raum.service';
import { BuchungsService } from '../../services/buchungs.service';
// Angular Material
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';

interface Slot { label: string; iso: string }

@Component({
  selector: 'app-day-view',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    // Material
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatListModule,
    MatDividerModule
  ],
  template: `
    <div class="container">
      <h2 class="page-title">Tagesansicht</h2>
      <div class="actions">
        <a mat-raised-button color="primary" routerLink="/my-bookings">Meine Buchungen</a>
      </div>

      <mat-card class="card">
        <mat-card-title>Filter</mat-card-title>
        <mat-card-content>
          <div class="row">
            <mat-form-field appearance="outline">
              <mat-label>Datum</mat-label>
              <input matInput type="date" [value]="date" (change)="onDateChange($event)" />
            </mat-form-field>
            <button mat-raised-button color="accent" (click)="loadVerfuegbareRaeume()">Verfügbare Räume laden</button>
          </div>
        </mat-card-content>
      </mat-card>

      <div class="grid">
        <mat-card class="card">
          <mat-card-title>Räume</mat-card-title>
          <mat-card-content>
            <mat-list *ngIf="rooms.length > 0; else emptyRooms">
              <mat-list-item *ngFor="let r of rooms">
                <div matListItemTitle>{{ r.name }}</div>
                <div matListItemLine>Plätze: {{ r.anzahlPlaetze }}</div>
                <div matListItemLine>Ausstattung: {{ r.ausstattung }}</div>
              </mat-list-item>
            </mat-list>
            <ng-template #emptyRooms>
              <div class="muted">Keine Räume geladen.</div>
            </ng-template>
          </mat-card-content>
        </mat-card>

        <mat-card class="card">
          <mat-card-title>Buchung anlegen</mat-card-title>
          <mat-card-content>
            <form [formGroup]="form" (ngSubmit)="submit()" class="form-grid">
              <mat-form-field appearance="outline">
                <mat-label>Raum</mat-label>
                <mat-select formControlName="raumId" required>
                  <mat-option *ngFor="let r of rooms" [value]="r.id">{{ r.name }}</mat-option>
                </mat-select>
              </mat-form-field>

              <mat-form-field appearance="outline">
                <mat-label>Start</mat-label>
                <mat-select formControlName="startZeit" required>
                  <mat-option *ngFor="let s of slots" [value]="s.iso">{{ s.label }}</mat-option>
                </mat-select>
              </mat-form-field>

              <mat-form-field appearance="outline">
                <mat-label>Ende</mat-label>
                <mat-select formControlName="endZeit" required>
                  <mat-option *ngFor="let s of slots" [value]="s.iso">{{ s.label }}</mat-option>
                </mat-select>
              </mat-form-field>

              <div class="full">
                <button mat-raised-button color="primary" type="submit" [disabled]="form.invalid || loading">Buchen</button>
              </div>

              <div class="error" *ngIf="error">{{ error }}</div>
              <div class="ok" *ngIf="success">Buchung erstellt</div>
            </form>
          </mat-card-content>
        </mat-card>
      </div>
    </div>
  `,
  styles: [`
    .container{max-width:1000px;margin:2rem auto;padding:1rem}
    .page-title{margin:0 0 1rem}
    .actions{display:flex;justify-content:flex-end;margin-bottom:1rem}
    .card{margin-bottom:1rem}
    .row{display:flex;gap:1rem;align-items:center}
    .grid{display:grid;grid-template-columns:1fr 1fr;gap:1rem;margin-top:1rem}
    @media (max-width: 900px){.grid{grid-template-columns:1fr}}
    .form-grid{display:grid;grid-template-columns:1fr 1fr;gap:1rem}
    .form-grid .full{grid-column:1 / -1}
    .muted{color:#666}
    .error{color:#b00020;margin-top:.5rem}
    .ok{color:#0a7a0a;margin-top:.5rem}
  `]
})
export class DayViewComponent implements OnInit {
  private fb = inject(FormBuilder);
  private raeume = inject(RaumService);
  private buchungen = inject(BuchungsService);

  rooms: RaumDTO[] = [];
  slots: Slot[] = [];
  loading = false;
  error: string | null = null;
  success = false;

  date = new Date().toISOString().slice(0,10);

  form = this.fb.group({
    raumId: [null as unknown as number, Validators.required],
    startZeit: ['', Validators.required],
    endZeit: ['', Validators.required]
  });

  ngOnInit() {
    this.generateSlots();
    this.loadVerfuegbareRaeume();
  }

  onDateChange(ev: Event) {
    const value = (ev.target as HTMLInputElement).value;
    this.date = value;
    this.loadVerfuegbareRaeume();
  }

  private generateSlots() {
    const date = this.date;
    const start = 8 * 60; // 08:00
    const end = 18 * 60;  // 18:00
    this.slots = [];
    for (let m = start; m <= end; m += 15) {
      const hh = Math.floor(m / 60).toString().padStart(2, '0');
      const mm = (m % 60).toString().padStart(2, '0');
      const label = `${hh}:${mm}`;
      const iso = new Date(`${date}T${hh}:${mm}:00`).toISOString();
      this.slots.push({ label, iso });
    }
  }

  loadVerfuegbareRaeume() {
    this.generateSlots();
    this.raeume.verfuegbar(this.date).subscribe(rs => this.rooms = rs);
  }

  submit() {
    if (this.form.invalid) return;
    this.loading = true;
    this.error = null;
    this.success = false;
    const { raumId, startZeit, endZeit } = this.form.value as any;
    this.buchungen.create({ raumId, startZeit, endZeit }).subscribe({
      next: () => {
        this.success = true;
      },
      error: (err) => {
        if (err.status === 409) {
          this.error = 'Zeitraum-Konflikt: Slot bereits belegt.';
        } else {
          this.error = 'Fehler beim Buchen';
        }
      },
      complete: () => this.loading = false
    });
  }
}
