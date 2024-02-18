import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';
import { Observable, firstValueFrom, lastValueFrom } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {

  private breakpointObserver = inject(BreakpointObserver);
  signedIn: Observable<boolean> = this.authService.getAuthStatus();

  constructor(
    private authService: AuthService,
    private router: Router) {
  }

  async ngOnInit() {
  }

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  logout() {
    this.authService.logout().subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

}
