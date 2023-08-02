import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/common/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'NI2-Client';

  constructor(public authService: AuthService) {
    authService.identityCheck();
  }
  ngOnInit(): void {}
}
