import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { UserDetail } from './pages/user/user';
import { NewUser } from './pages/new-user/new-user';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: Home },
  { path: 'user/:id', component: UserDetail },
  { path: 'newuser', component: NewUser },
  { path: 'updateuser/:id', component: NewUser },
  { path: '**', redirectTo: 'home' },
];
