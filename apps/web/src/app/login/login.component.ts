import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
  import * as Keycloak from 'keycloak-js';

@Component({
  selector: 'seraphine-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  keycloak: Keycloak.KeycloakInstance;
  state: any;

  constructor(@Inject(DOCUMENT) private document: Document) {
  }

  ngOnInit(): void {
    this.keycloak = Keycloak({
      url: 'http://localhost:8080/auth/',
      realm: 'seraphine',
      clientId: 'seraphine-web',
    });
    //
    // this.keycloak.init({ enableLogging: true });

    this.keycloak.init({onLoad: 'check-sso'});
  }

  getUserInfo() {
    console.log(this.keycloak.profile);
    // this.keycloak.accountManagement().then(accountManagement => console.log({accountManagement}));
    // this.keycloak.loadUserInfo().then(userInfo => console.log({userInfo}));
    this.keycloak.loadUserProfile().then(userProfile => console.log({userProfile}));
    console.log(this.keycloak.hasRealmRole('UserCreate'));
  }

  login(): void {
    this.keycloak.login();
  }

  logout(): void {
    this.keycloak.logout();
  }
}
