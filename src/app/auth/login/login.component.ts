import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';

import {UsersService} from '../../shared/services/users.service';
import {User} from '../../shared/models/user.model';
import {Message} from '../../shared/models/message.model';
import {AuthService} from '../../shared/services/auth.service';
import {fadeStateTrigger} from '../../shared/animations/fade.animation';
import {Meta, Title} from '@angular/platform-browser';

@Component({
  selector: 'degys-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [fadeStateTrigger]
})
export class LoginComponent implements OnInit {

  message = new Message();
  form: FormGroup;

  constructor(
    private usersService: UsersService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private title: Title,
    private meta: Meta
  ) {
    title.setTitle('Вход в систему');
  }

  ngOnInit() {

    this.form = new FormGroup({
      ['email']: new FormControl(null, [Validators.required, Validators.email]),
      ['password']: new FormControl(null, [Validators.required, Validators.minLength(6)])
    });

    this.route.queryParams
      .subscribe((params) => {
        if (params['nowCanlogin']) {
          this.message.showMessage('success', 'Теперь Вы можете войти.');
        } else if (params['accessDenied']) {
          this.message.showMessage('warning', 'Для работи с системой вам нужно войти');
        } else if (params['asVisitor']) {
          const dataVisitor = {
            email: 'visitor@mail.ru',
            password: '12345678'
          }
          this.form.setValue(dataVisitor);
        }
      });
  }

  onSubmit() {
    const formData = this.form.value;
    console.log(formData.email)

    this.usersService.getUserByEmail(formData.email)
      .subscribe((user: User) => {
        if (user) {
          if (user.password === formData.password) {
            window.localStorage.setItem('user', JSON.stringify(user));
            this.authService.login();
            this.router.navigate(['/system', 'bill']);
          } else {
            this.message.showMessage('danger', 'Пароль не верный');
          }
        } else {
          this.message.showMessage('danger', 'Пользователь не существует');
        }
      });
  }

  OnCancel() {
    this.router.navigate(['']);
  }
}
