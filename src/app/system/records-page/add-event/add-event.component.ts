import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Category} from '../../shared/models/category.model';
import {NgForm} from '@angular/forms';
import {DegysEvent} from '../../shared/models/event.model';
import * as moment from 'moment';
import {EventsService} from '../../shared/services/events.service';
import {merge, Observable, of, Subject, Subscription} from 'rxjs';
import {mergeMap, scan} from 'rxjs/operators';
import {Message} from '../../../shared/models/message.model';
import {BillService} from '../../shared/services/bill.service';
import {Bill} from '../../shared/models/bill.model';
import {async} from 'rxjs/internal/scheduler/async';
import {User} from '../../../shared/models/user.model';
import {fadeStateTrigger} from '../../../shared/animations/fade.animation';

@Component({
  selector: 'degys-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss'],
  animations: [fadeStateTrigger]
})
export class AddEventComponent implements OnInit, OnDestroy {
  subscriptions: Subscription = new Subscription();

  @Input() categories: Category[];
  types = [
    {type: 'income', label: 'Доход'},
    {type: 'outcome', label: 'Расход'}
  ]
  events: DegysEvent[] = [];
  // from parent to child
  addEvent: Subject<DegysEvent> = new Subject<DegysEvent>();
  bill: Bill;
  calculatedBill: number;
  message = new Message();
  user: User = JSON.parse(window.localStorage.getItem('user'));

  bill$: Observable<Bill>;

  constructor(private eventsService: EventsService,
              private billService: BillService ) { }

  ngOnInit() {
    this.subscriptions.add(this.billService.getBill(this.user.bill)
      .subscribe((bill: Bill) => {
        this.bill = bill;
        this.calculatedBill = bill.value;
      }));
    console.log(this.categories + 'pppp')
  }

  onSubmit(form: NgForm) {
    // tslint:disable-next-line:prefer-const
    let {amount, description, category, type} = form.value;
    if (amount < 0) { amount *= -1; }

    const event = new DegysEvent(type, amount, +category, moment().format('DD.MM.YYYY HH:mm:ss'), description);

    this.addEvent.next(event);
  }

  saveEvents() {
    console.log(this.events);
    this.subscriptions.add(this.eventsService.addEvents(this.events)
      .subscribe( (res) => {
          const successSavedEvents = res.filter(e => e.id !== undefined);
          if (successSavedEvents.length === this.events.length) {
            this.updateBill(successSavedEvents);
            console.log('SUCCESS: ', res);
          } else {
            console.log('NOT-SUCCESS: ', res);
            this.updateBill(successSavedEvents);
            this.addEvent.next(null);
            res.filter(e => e.id === undefined).forEach(ev => this.addEvent.next(ev));
            this.message.showMessage('danger', 'Ошибка! Данные события не сохранились. Попробуйте еще раз.');
          }
        }));
  }

  choosedEvents(eventsData) {
    this.events = eventsData.events;
    this.calculatedBill = this.bill.value +  eventsData.totalAmount;
    if (this.calculatedBill < 0) {
      this.message.showMessage('danger', `Недостаточно средств!!!  ${this.calculatedBill} ${this.bill.currency}`);
    }
    console.log(this.events);
  }

  private updateBill(successSavedEvents: DegysEvent[]) {
    const newBillValue = this.bill.value + successSavedEvents.reduce((acumulateVal, currentVal) => {
        return (currentVal.type === 'outcome') ?
          acumulateVal - currentVal.amount
          : acumulateVal + currentVal.amount;
      }, 0);

    const newBill: Bill = {
      value: newBillValue,
      currency: this.bill.currency,
      userId: this.user.id,
      id: this.bill.id
    };

    this.subscriptions.add(this.billService.updateBill(newBill)
      .subscribe((bill) => {
        this.addEvent.next(null);
        this.bill = bill;
        this.calculatedBill = bill.value;
        this.message.showMessage('success', 'События и счет сохранены!');
      }));
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
