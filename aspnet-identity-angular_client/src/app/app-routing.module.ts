import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '@auth/components/login/login.component';
import { RegisterComponent } from '@auth/components/register/register/register.component';
import { UserInfoComponent } from '@auth/components/user-info/user-info.component';
import { WeatherForecastComponent } from '@core/components/weather-forecast/weather-forecast.component';

const routes: Routes = [
  { path: 'login', title: 'Login', component: LoginComponent },
  { path: 'register', title: 'Register', component: RegisterComponent },
  { path: 'user/info', title: 'User Info', component: UserInfoComponent },
  { path: 'weatherforecast', title: 'Weather Forecast', component: WeatherForecastComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
