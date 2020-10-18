import {Component, Input, OnInit} from '@angular/core';
import {Bill} from '../../shared/models/bill.model';
import {Message} from '../../../shared/models/message.model';
import {fadeStateTrigger} from '../../../shared/animations/fade.animation';

@Component({
  selector: 'degys-bill-card',
  templateUrl: './bill-card.component.html',
  styleUrls: ['./bill-card.component.scss'],
  animations: [fadeStateTrigger]
})
export class BillCardComponent implements OnInit {

  @Input() bill: Bill;
  @Input() currency: any;

  currenciesMap  = ['USD', 'EUR', 'UAH'];
  currencies: {
    curIcon: string,
    val: number
  }[];

  message: Message = new Message();

  constructor() { }

  ngOnInit() {
    // not to be duplicated currency
    this.currenciesMap.splice(this.currenciesMap.indexOf(this.bill.currency), 1);

    if (this.bill === null) {
      this.message.showMessage('danger', 'Ошибка связи с сервером!', 5);
    }
    if (this.currency) {
      const { rates } = this.currency;

      this.currencies = this.currenciesMap.map( (cur) => {
        const value = rates[cur] * this.bill.value;
        return {
          curIcon: cur.toLowerCase(),
          val: value
        };
      });
      console.log(this.currencies)
      // this.dollar = rates['USD'] * this.bill.value;
      // this.euro = rates['EUR'] * this.bill.value;
    }
  }

}
