import {Component, OnInit, EventEmitter, Output} from '@angular/core';
import {BackendService, AppState, Transaction} from './BackendService';
declare function setCookie(name: string, value: string): void;
declare function getCookie(name: string): string;

@Component({
  selector: 'login',
  templateUrl: 'templates/login.html',
})
export class LoginComponent {
  name = 'Login';
  appState: AppState;
  userId: string = null;
  password: string = null;
  @Output() onLogin = new EventEmitter<boolean>();

  constructor(private backendService: BackendService) {}

  doLogin(): void {
    if (this.userId === 'thetachain' && this.password === 'thetachain') {
      setCookie('LOGIN_STATE', 'LOGIN_COMPLETE');
      this.onLogin.emit(true);
    }
  }
}

