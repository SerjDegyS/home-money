import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

import {User} from '../../models/user.model';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'degys-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  date: Date = new Date();
  user: User;

  isOpenMenu = false;
  closeMen = false;

  constructor(private authService: AuthService,
              private router: Router
  ) { }

  ngOnInit() {
    this.user = JSON.parse(window.localStorage.getItem('user'));
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['']);
  }

  openMenu() {
    this.isOpenMenu = !this.isOpenMenu;
  }
  closeMenu() {
    this.closeMen = !this.closeMen;
  }
}
