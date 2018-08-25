import { Directive } from '@angular/core';

/**
 * Directive to select the template to use
 * for the day cell.
 */
@Directive({
  selector: '[scDayTemplate]'
})
export class DayTemplateDirective {

  constructor() { }

}
