import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RaumDTO, RaumService } from '../../services/raum.service';

@Component({
  selector: 'app-rooms-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="container">
      <h2>Räume</h2>
      <div class="layout">
        <div class="list">
          <table>
            <thead>
              <tr><th>Name</th><th>Plätze</th><th>Ausstattung</th><th>Aktionen</th></tr>
            </thead>
            <tbody>
              <tr *ngFor="let r of rooms">
                <td>{{r.name}}</td>
                <td>{{r.anzahlPlaetze}}</td>
                <td>{{r.ausstattung}}</td>
                <td>
                  <button (click)="edit(r)">Bearbeiten</button>
                  <button (click)="remove(r)">Löschen</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="form">
          <h3>{{ editId ? 'Raum bearbeiten' : 'Raum anlegen' }}</h3>
          <form [formGroup]="form" (ngSubmit)="save()">
            <label>Name</label>
            <input formControlName="name" />
            <label>Plätze</label>
            <input type="number" formControlName="anzahlPlaetze" />
            <label>Ausstattung</label>
            <input formControlName="ausstattung" />
            <button type="submit" [disabled]="form.invalid">{{ editId ? 'Speichern' : 'Anlegen' }}</button>
            <button type="button" *ngIf="editId" (click)="cancel()">Abbrechen</button>
          </form>
        </div>
      </div>
      <div class="error" *ngIf="error">{{error}}</div>
    </div>
  `,
  styles: [`
    .container{max-width:1000px;margin:2rem auto;padding:1rem}
    .layout{display:grid;grid-template-columns:2fr 1fr;gap:1rem}
    table{width:100%;border-collapse:collapse}
    th,td{border:1px solid #ddd;padding:.5rem}
    form{display:flex;flex-direction:column;gap:.5rem}
    input{padding:.4rem}
    .error{color:#b00020;margin-top:1rem}
  `]
})
export class RoomsListComponent implements OnInit {
  private raeume = inject(RaumService);
  private fb = inject(FormBuilder);

  rooms: RaumDTO[] = [];
  editId: number | null = null;
  error: string | null = null;

  form = this.fb.group({
    name: ['', Validators.required],
    anzahlPlaetze: [1, [Validators.required, Validators.min(1)]],
    ausstattung: ['']
  });

  ngOnInit() {
    this.load();
  }

  load() {
    this.raeume.list().subscribe({
      next: rs => this.rooms = rs,
      error: () => this.error = 'Fehler beim Laden der Räume'
    });
  }

  edit(r: RaumDTO) {
    this.editId = r.id;
    this.form.setValue({ name: r.name, anzahlPlaetze: r.anzahlPlaetze, ausstattung: r.ausstattung || '' });
  }

  cancel() {
    this.editId = null;
    this.form.reset({ name: '', anzahlPlaetze: 1, ausstattung: '' });
  }

  save() {
    if (this.form.invalid) return;
    const dto = this.form.value as { name: string; anzahlPlaetze: number; ausstattung: string };
    if (this.editId) {
      this.raeume.update(this.editId, dto).subscribe({
        next: () => { this.cancel(); this.load(); },
        error: () => this.error = 'Fehler beim Speichern'
      });
    } else {
      this.raeume.create(dto).subscribe({
        next: () => { this.cancel(); this.load(); },
        error: () => this.error = 'Fehler beim Anlegen'
      });
    }
  }

  remove(r: RaumDTO) {
    if (!confirm(`Raum "${r.name}" löschen?`)) return;
    this.raeume.delete(r.id).subscribe({
      next: () => this.load(),
      error: () => this.error = 'Fehler beim Löschen'
    });
  }
}
