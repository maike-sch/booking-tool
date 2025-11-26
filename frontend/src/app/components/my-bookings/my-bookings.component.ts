import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuchungDTO, BuchungsService } from '../../services/buchungs.service';

@Component({
  selector: 'app-my-bookings',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container">
      <h2>My Bookings</h2>

      <div *ngIf="loading">Loading...</div>
      <div class="error" *ngIf="error">{{ error }}</div>

      <ng-container *ngIf="!loading && !error">
        <div *ngIf="bookings.length === 0" class="empty">You have no bookings yet.</div>

        <table *ngIf="bookings.length > 0" class="table">
          <thead>
            <tr>
              <th>Room</th>
              <th>Start</th>
              <th>End</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let b of bookings">
              <td>{{ b.raumName }}</td>
              <td>{{ b.startZeit | date: 'short' }}</td>
              <td>{{ b.endZeit | date: 'short' }}</td>
            </tr>
          </tbody>
        </table>
      </ng-container>
    </div>
  `,
  styles: [`
    .container{max-width:900px;margin:2rem auto;padding:1rem}
    .table{width:100%;border-collapse:collapse}
    .table th,.table td{border:1px solid #ddd;padding:.5rem;text-align:left}
    .table thead{background:#f5f5f5}
    .error{color:#b00020;margin:.5rem 0}
    .empty{color:#666}
  `]
})
export class MyBookingsComponent implements OnInit {
  private service = inject(BuchungsService);

  bookings: BuchungDTO[] = [];
  loading = false;
  error: string | null = null;

  ngOnInit(): void {
    this.load();
  }

  private load() {
    this.loading = true;
    this.error = null;
    this.service.myBookings().subscribe({
      next: (list) => this.bookings = list,
      error: () => this.error = 'Failed to load bookings',
      complete: () => this.loading = false
    });
  }
}
