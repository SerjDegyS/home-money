import {Directive, HostBinding, HostListener} from '@angular/core';


@Directive({
  selector: '[degysDropdown]'
})
export class DropdownDirective  {
  @HostBinding('class.open') isOpen = false;


  @HostListener('click', ['$event']) onClick(event) {
    this.isOpen = !this.isOpen;
  }
}
