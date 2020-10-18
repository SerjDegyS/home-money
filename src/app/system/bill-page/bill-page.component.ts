import {Component, HostBinding, OnDestroy, OnInit} from '@angular/core';
import {BillCardComponent} from './bill-card/bill-card.component';
import {BillService} from '../shared/services/bill.service';
import {concat, merge, Observable, of, pipe, Subscription} from 'rxjs';
import {catchError, concatMap, delay, mergeAll, mergeMap, scan, toArray} from 'rxjs/operators';
import {Bill} from '../shared/models/bill.model';
import {LoginComponent} from '../../auth/login/login.component';
import {Message} from '../../shared/models/message.model';
import {User} from '../../shared/models/user.model';
import {FormGroup, NgForm} from '@angular/forms';
import {UsersService} from '../../shared/services/users.service';
import {ActivatedRoute} from '@angular/router';
import {fadeStateTrigger} from '../../shared/animations/fade.animation';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'degys-bill-page',
  templateUrl: './bill-page.component.html',
  styleUrls: ['./bill-page.component.scss'],
  animations: [fadeStateTrigger]
})
export class BillPageComponent implements OnInit, OnDestroy {
  sub1: Subscription = new Subscription();

  user: User = JSON.parse(window.localStorage.getItem('user'));
  bill: Bill;
  currency: string;
  // hasBill = true;
  isLoaded = false;
  message: Message = new Message();
  form: FormGroup;

  searchPlaceholder = '';
  allCurrency: string [];

  constructor(private billService: BillService,
              private usersService: UsersService,
              private route: ActivatedRoute,
              private title: Title) {
    title.setTitle('Счет и курс валют');
  }

  ngOnInit() {
    this.sub1.add(this.route.queryParams
      .subscribe(params => {
       if (params['createdBill']) {
         this.message.showMessage('success', 'Теперь у Вас есть счет!', 5000);
         // this.showBill();
       }
      }));

    console.log(this.user)
    this.sub1.add(this.billService.getBill(this.user.bill).pipe(
      concatMap((bill: Bill) => {
        this.bill = bill;
        return this.billService.getCurrency(this.bill.currency);
    }))
      .subscribe(data => {
        this.currency = data;
        this.isLoaded = true;
      }));
  }

  onRefresh() {
    this.isLoaded = false;
    this.sub1.add(this.billService.getCurrency(this.bill.currency)
      .pipe(delay(2000))
      .subscribe((currency: any) => {
        this.currency = currency;
        this.isLoaded = true;
      }));
  }

  // createBill() {
  //   this.hasBill = false;
  //
  // }

  showBill() {
    this.sub1.add(this.billService.getCurrency(this.bill.currency)
      .subscribe((data) => {
        console.log(data);
        this.currency = data;
        this.isLoaded = true;
      })
    );
  }

  // onSubmit(form: NgForm) {
  //   const {billValue} = form.value;
  //   this.bill = new Bill(billValue, this.currency, this.user.id);
  //
  //   this.sub1.add(this.billService.createBill(this.bill)
  //     .pipe(
  //       mergeMap((bill) => {
  //         console.log(bill)
  //         this.user.bill = bill.id;
  //         return this.usersService.updateUser(this.user);
  //       } )
  //     ).subscribe( (user: User) => {
  //       window.localStorage.setItem('user', JSON.stringify(user));
  //       this.hasBill = true;
  //       this.showBill();
  //       }
  //     ));
  // }
  //
  // setCurrency(c: string) {
  //   this.currency = c;
  // }

  ngOnDestroy(): void {
    if (this.sub1) {
      this.sub1.unsubscribe();
    }
  }
}
