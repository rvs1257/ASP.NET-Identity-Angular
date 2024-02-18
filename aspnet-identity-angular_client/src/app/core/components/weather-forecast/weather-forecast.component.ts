import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';

interface WeatherForecast {
  date: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}

@Component({
  selector: 'app-weather-forecast',
  templateUrl: './weather-forecast.component.html',
  styleUrl: './weather-forecast.component.css',
  standalone: true,
  imports: [CommonModule, HttpClientModule, MatTableModule]
})
export class WeatherForecastComponent {
  title = 'Weather Forecast';

  public forecasts: WeatherForecast[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getForecasts();
  }

  getForecasts() {
    const httpOptions = {
      withCredentials: true
    };
    this.http.get<WeatherForecast[]>('/api/weatherforecast', httpOptions).subscribe(
      {
        next: (result) => {
          this.forecasts = result;
        },
        error: (error) => {
          console.error(error);
        }
      }
    );
  }
}
