import {DegysEvent} from './event.model';

export class ChooseEvent {
  event: DegysEvent;
  checked: boolean;

  constructor(event: DegysEvent, checked?: boolean) {
    this.event = event;
    this.checked = checked;
  }
}
