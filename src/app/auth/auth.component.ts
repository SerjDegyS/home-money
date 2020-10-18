import {Component, HostBinding, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {fadeStateTrigger} from '../shared/animations/fade.animation';
import {Meta} from '@angular/platform-browser';

@Component({
  selector: 'degys-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  animations: [fadeStateTrigger]
})
export class AuthComponent implements OnInit {
  @HostBinding('@fade') a = true;

  constructor(
    private router: Router,
    private meta: Meta
  ){
    meta.addTags([
      {name: 'keywords', content: 'логин,вход,регистрация,система'},
      {name: 'description', content: 'страница для входа или регистрации в системе'}
    ]);
  }

  ngOnInit(): void {
    // this.router.navigate(['/auth/login']);
  }
}
