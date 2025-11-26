import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RaumDTO, RaumService } from '../../services/raum.service';
import { BuchungsService } from '../../services/buchungs.service';

interface Slot { label: string; iso: string }

@Component({
  selector: 'app-day-view',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  template: `
    <div class="container">
      <h2>Tagesansicht</h2>
      <p><a routerLink="/my-bookings">Meine Buchungen ansehen</a></p>
      <div class="filters">
        <label>Datum</label>
        <input type="date" [value]="date" (change)="onDateChange($event)" />
        <button (click)="loadVerfuegbareRaeume()">Verfügbare Räume laden</button>
      </div>

      <div class="rooms">
        <h3>Räume</h3>
        <ul>
          <li *ngFor="let r of rooms">{{r.name}} ({{r.anzahlPlaetze}}) - {{r.ausstattung}}</li>
        </ul>
      </div>

      <div class="booking">
        <h3>Buchung anlegen</h3>
        <form [formGroup]="form" (ngSubmit)="submit()">
          <label>Raum</label>
          <select formControlName="raumId">
            <option *ngFor="let r of rooms" [value]="r.id">{{ r.name }}</option>
          </select>
          <label>Start</label>
          <select formControlName="startZeit">
            <option *ngFor="let s of slots" [value]="s.iso">{{ s.label }}</option>
          </select>
          <label>Ende</label>
          <select formControlName="endZeit">
            <option *ngFor="let s of slots" [value]="s.iso">{{ s.label }}</option>
          </select>
          <button type="submit" [disabled]="form.invalid || loading">Buchen</button>
          <div class="error" *ngIf="error">{{ error }}</div>
          <div class="ok" *ngIf="success">Buchung erstellt</div>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .container{max-width:900px;margin:2rem auto;padding:1rem}
    .filters,.booking{margin:1rem 0;display:flex;gap:.5rem;align-items:center}
    .rooms ul{padding-left:1rem}
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
