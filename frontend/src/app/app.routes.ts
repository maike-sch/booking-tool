import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DayViewComponent } from './components/day-view/day-view.component';
import { RoomsListComponent } from './components/rooms-list/rooms-list.component';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: LoginComponent },
  { path: 'day', component: DayViewComponent, canActivate: [AuthGuard] },
  { path: 'admin/rooms', component: RoomsListComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: '**', redirectTo: 'login' }
];
