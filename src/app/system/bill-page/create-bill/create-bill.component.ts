import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Bill} from '../../shared/models/bill.model';
import {mergeMap} from 'rxjs/operators';
import {User} from '../../../shared/models/user.model';
import {BillService} from '../../shared/services/bill.service';
import {Subscription} from 'rxjs';
import {Message} from '../../../shared/models/message.model';
import {Router} from '@angular/router';
import {UsersService} from '../../../shared/services/users.service';
import {fadeStateTrigger} from '../../../shared/animations/fade.animation';

@Component({
  selector: 'degys-create-bill',
  templateUrl: './create-bill.component.html',
  styleUrls: ['./create-bill.component.scss'],
  animations: [fadeStateTrigger]
})
export class CreateBillComponent implements OnInit, OnDestroy {

  user: User = JSON.parse(window.localStorage.getItem('user'));
  private allCurrency: string[];
  currency: string;
  sub1 = new Subscription();
  message = new Message();

  constructor(private billService: BillService,
              private usersService: UsersService,
              private router: Router) { }

  ngOnInit() {
    this.message.showMessage('warning', 'У Вас нет счета! Создайте его...', 1000);

    this.sub1.add(this.billService.getCurrency()
      .subscribe(currency => {
        this.allCurrency = Object.keys(currency.rates);
        // console.log(this.currency)
      }));
  }

  setCurrency(c: string) {
    this.currency = c;
  }

  onSubmit(form: NgForm) {
    const {billValue} = form.value;
    const newBill = new Bill(billValue, this.currency, this.user.id);

    this.sub1.add(this.billService.createBill(newBill)
      .pipe(
        mergeMap((bill) => {
          console.log(bill)
          window.localStorage.setItem('bill', JSON.stringify(bill));
          this.user.bill = bill.id;
          return this.usersService.updateUser(this.user);
        })
      ).subscribe((user: User) => {
          window.localStorage.setItem('user', JSON.stringify(user));
          this.router.navigate(['/system/bill'], {
            queryParams: {
              createdBill: true
            }
          });
        }
      ));
  }
    ngOnDestroy(): void {
      if (this.sub1) {
        this.sub1.unsubscribe();
      }
    }
}
