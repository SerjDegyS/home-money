import {Component, EventEmitter, HostBinding, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Message} from '../../../../shared/models/message.model';
import {DegysEvent} from '../../../shared/models/event.model';
// <<<<<<< HEAD
// import {isBoolean} from 'util';
// =======
// // import {isBoolean} from 'util';
// >>>>>>> d309e62 (create new branch master-firebase)
import {ChooseEvent} from '../../../shared/models/choose-event.model';
import {Observable, Subscription} from 'rxjs';
import {map} from 'rxjs/operators';
import {fadeStateTrigger} from '../../../../shared/animations/fade.animation';

@Component({
  selector: 'degys-add-event-choose',
  templateUrl: './add-event-choose.component.html',
  styleUrls: ['./add-event-choose.component.scss']
})

export class AddEventChooseComponent implements OnInit, OnDestroy {
  addedEventSubscription: Subscription;

  @Input() addedEvent: Observable<DegysEvent>;
  @Output() choosedEvents = new EventEmitter<{events: DegysEvent[], totalAmount: number}>();


  selectAll = true;
  eventsOption = new Array<ChooseEvent>();
  totalAmount = 0;

  constructor() { }

  ngOnInit() {
    this.addedEventSubscription = this.addedEvent.subscribe(
      event => {
        if (event !== null) {
          this.eventsOption.push(new ChooseEvent(event, true));
          this.onToggle();
        } else {
          this.eventsOption = this.eventsOption.filter(i => !i.checked);
          this.onToggle();
        }
      }
    );
  }

  removeEvent(index: number) {
    this.eventsOption.splice(index, 1);
    this.onToggle();
  }

  checkAll() {
      this.eventsOption.map(i => i.checked = this.selectAll);
      this.onToggle();
  }


  onToggle() {
    const checkedOptions = this.eventsOption.filter(i => i.checked);
    this.calculateTotalAmount();
    this.choosedEvents.emit({events: checkedOptions.map(i => i.event), totalAmount: this.totalAmount});
  }

  private calculateTotalAmount() {
    this.totalAmount = this.eventsOption.reduce((acumulateVal, currentVal) => {
        if (currentVal.checked) {
          return (currentVal.event.type === 'outcome') ?
            acumulateVal - currentVal.event.amount
            : acumulateVal + currentVal.event.amount;
        } else { return acumulateVal; }
      }, 0 );
  }

  ngOnDestroy(): void {
    this.addedEventSubscription.unsubscribe();
  }
}
