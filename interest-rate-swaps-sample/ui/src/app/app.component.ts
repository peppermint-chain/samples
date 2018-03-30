import {Component, OnInit} from '@angular/core';
import {BackendService, AppState} from './BackendService';
declare function setCookie(name: string, value: string): void;
declare function getCookie(name: string): string;

@Component({
  selector: 'my-app',
  templateUrl: 'templates/app.html',
})
export class AppComponent implements OnInit {
  title = 'Theta-Chain Demo';
  appState: AppState = null;
  loginDone = true;

  constructor(private backendService: BackendService) {}


  ngOnInit(): void {
    this.appState = this.backendService.appState;
    this.loginDone = 'LOGIN_COMPLETE' === getCookie('LOGIN_STATE');
  }

  onLogin(loginFlag: boolean) {
    this.loginDone = loginFlag;
  }

  refresh(): void {
    this.backendService.fireEvent('refresh');
  }
}
