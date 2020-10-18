import {Component, Input, OnInit} from '@angular/core';
import {Message} from '../../../shared/models/message.model';
import {Bill} from '../../shared/models/bill.model';
import {fadeStateTrigger} from '../../../shared/animations/fade.animation';

@Component({
  selector: 'degys-currency-card',
  templateUrl: './currency-card.component.html',
  styleUrls: ['./currency-card.component.scss'],
  animations: [fadeStateTrigger]
})
export class CurrencyCardComponent implements OnInit {

  @Input() currency: any;
  @Input() bill: Bill;
  currencies: string[] = ['UAH', 'USD', 'EUR'];
  message: Message = new Message();

  ngOnInit() {
    if (this.currency === null) {
      console.log(this.currency);
      this.message.showMessage('danger', 'Ошибка связи с сервером валют!', 5);
    } else {
      // not to be duplicated currency
      this.currencies.splice(this.currencies.indexOf(this.bill.currency), 1);
    }
  }

  constructor() { }

}
