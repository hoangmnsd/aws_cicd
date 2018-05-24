import { Routes } from '@angular/router';
import {HomeComponent,
  StudentComponent
} from './component';

export const ROUTES: Routes = [
  { path: '', component: HomeComponent },
  { path: 'student', component: StudentComponent },
  { path: '**', redirectTo: '' }
];
