import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

import {UsersService} from '../../shared/services/users.service';
import {User} from '../../shared/models/user.model';
import {Bill} from '../../system/shared/models/bill.model';
import {Meta, Title} from '@angular/platform-browser';

@Component({
  selector: 'degys-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  form: FormGroup;

  constructor(
    private userService: UsersService,
    private router: Router,
    private title: Title,
    private meta: Meta
  ) {
    title.setTitle('Регистрация');
  }

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmails.bind(this)),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
      name: new FormControl(null, [Validators.required]),
      agree: new FormControl(false, [Validators.requiredTrue])
    });
  }

  onSubmit() {
    const {email, password, name, currency} = this.form.value;
    const user = new User(email, password, name);

    this.userService.createNewUser(user)
      .subscribe((user: User) => {
        if (user) {
          this.router.navigate(['/login'], {
            queryParams: {
              nowCanlogin: true
            }
          });
        }
      });
  }

  // Async validator
  forbiddenEmails(control: FormControl): Promise<any> {
    return new Promise((resolve, reject) => {
      this.userService.getUserByEmail(control.value)
        .subscribe((user: User) => {
          (user) ? resolve({forbiddenEmail: true}) : resolve(null);
        });
    });
  }

  OnCancel() {
    this.router.navigate(['']);
  }
}
