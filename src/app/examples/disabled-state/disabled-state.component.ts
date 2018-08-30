import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-disabled-state',
  templateUrl: './disabled-state.component.html',
  styleUrls: ['./disabled-state.component.scss']
})
export class DisabledStateComponent {

  /**
   * Current enabled or disabled state.
   */
  disabled = false;

  /**
   * Toggles the disabled state.
   */
  toggleDisabled(): void {
    this.disabled = !this.disabled;
  }

}
