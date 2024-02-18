import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthService } from '@auth/services/auth.service';
import { ManageInfoResponse } from '@auth/types';

@Component({
  selector: 'app-user-info',
  standalone: true,
  imports: [],
  templateUrl: './user-info.component.html',
  styleUrl: './user-info.component.scss'
})
export class UserInfoComponent {

  title: string;
  userInfo: ManageInfoResponse = {
    email: '',
    isEmailConfirmed: false
  };

  constructor(
    private titleService: Title,
    private authService: AuthService) {
    this.title = titleService.getTitle();
  }

  ngOnInit(): void {
    this.authService.info().subscribe({
      next: (response) => {
        this.userInfo = response;
      },
      error: (error) => {
        console.error(error);
      }
    });
  }
}
