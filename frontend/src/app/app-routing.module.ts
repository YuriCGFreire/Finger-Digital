import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardianService } from './resources/services/auth-guardian.service';
import { LoginComponent } from './views/login/login.component';
import { SignupComponent } from './views/signup/signup.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'home',
    canActivate: [AuthGuardianService],
    loadChildren: () => import('./views/home/home.module').then(m => m.HomeModule)
  },
  {path: 'signup', component: SignupComponent},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
