import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '@auth/components/login/login.component';
import { RegisterComponent } from '@auth/components/register/register/register.component';
import { UserInfoComponent } from '@auth/components/user-info/user-info.component';
import { AuthGuard } from '@auth/guards/auth.guard';
import { HomeComponent } from '@core/components/home/home/home.component';
import { PageNotFoundComponent } from '@core/components/page-not-found/page-not-found.component';
import { WeatherForecastComponent } from '@core/components/weather-forecast/weather-forecast.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', title: 'Home', component: HomeComponent },
  { path: 'login', title: 'Login', component: LoginComponent },
  { path: 'register', title: 'Register', component: RegisterComponent },
  { path: 'user/info', title: 'User Info', component: UserInfoComponent, canActivate: [AuthGuard] },
  { path: 'weatherforecast', title: 'Weather Forecast', component: WeatherForecastComponent, canActivate: [AuthGuard] },
  { path: '**', title: 'Not Found', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
