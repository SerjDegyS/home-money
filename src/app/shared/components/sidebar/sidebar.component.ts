import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'degys-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
   user = window.localStorage.getItem('user');

  constructor(private router: Router) { }

  ngOnInit() {
  }

  toHome() {
    this.router.navigate(['']);
  }
}
