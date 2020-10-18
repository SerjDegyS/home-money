import {Component, HostBinding, OnDestroy, OnInit} from '@angular/core';
import {BillService} from './shared/services/bill.service';
import {Bill} from './shared/models/bill.model';
import {Subscription} from 'rxjs';
import {User} from '../shared/models/user.model';
import {Router} from '@angular/router';
import {fadeStateTrigger} from '../shared/animations/fade.animation';
import {Meta} from '@angular/platform-browser';


@Component({
  selector: 'degys-system',
  templateUrl: './system.component.html',
  animations: [fadeStateTrigger]
})
export class SystemComponent implements OnInit, OnDestroy {
  @HostBinding('@fade') a = true;

  constructor(private billService: BillService,
              private router: Router,
              private meta: Meta
) {
    meta.updateTag(
      {name: 'keywords', content: 'домашняя,бухгалтерия,счет,планирование,запись,история'},
      'name= "keywords"');
    meta.updateTag(
      {name: 'description', content: 'система для ведения, контроля, планирования личных средств та архивации домашних счетов'},
      'name= "description"');
  }

  user: User = JSON.parse(window.localStorage.getItem('user'));
  sub1: Subscription;

  ngOnInit(): void {
    if (this.user && !this.user.bill) {
      this.router.navigate(['/system/create']);
    }

  }

  ngOnDestroy(): void {
    if (this.sub1) {
      this.sub1.unsubscribe();
    }
    // window.localStorage.clear();
  }

}
