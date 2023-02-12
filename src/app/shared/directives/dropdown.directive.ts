import {Directive, HostBinding, HostListener} from '@angular/core';


@Directive({
  selector: '[degysDropdown]'
})
export class DropdownDirective  {
  @HostBinding('class.open') isOpened = false;


  @HostListener('click', ['$event']) onClick(event) {
    this.isOpened = !this.isOpened;
  }
}
