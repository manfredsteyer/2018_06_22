import { Directive, Input, EventEmitter, Output, HostBinding, HostListener } from '@angular/core';


@Directive({
  selector: 'button[clickWithWarning]'
})
export class ExitWithWarningDirective {

  @Input() warning: string = 'Really?';
  @Output() clickWithWarning = new EventEmitter();

  @HostBinding('class') classAttr = 'btn btn-danger';

  constructor() { 
    //setTimeout(() => {this.classAttr = 'btn btn-primary'}, 5000);
  }

  @HostListener('click', ['$event'])
  handleEvent(event): void {
    	if (confirm(this.warning)) {
        this.clickWithWarning.emit(event);
      }
      else {
        console.info('aktion durch benutzer abgebrochen!')
      }
   }


}
