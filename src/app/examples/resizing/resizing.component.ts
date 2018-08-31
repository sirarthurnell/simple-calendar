import { Component } from '@angular/core';
import { GrowMode } from 'simple-calendar/public_api';

/**
 * Shows the resizing capabilites of
 * the MonthCalendarComponent.
 */
@Component({
  selector: 'app-resizing',
  templateUrl: './resizing.component.html',
  styleUrls: ['./resizing.component.scss']
})
export class ResizingComponent {

  /**
   * Grow mode.
   */
  growMode: GrowMode = { mode: 'stretch' };

  /**
   * Sets the proportional grow mode.
   */
  setProportional(): void {
    this.growMode = { mode: 'proportional' };
  }

  /**
   * Sets the stretch grow mode.
   */
  setStretch(): void {
    this.growMode = { mode: 'stretch' };
  }

  /**
   * Sets the mixed grow mode.
   */
  setMixed(): void {
    this.growMode = { mode: 'mixed' };
  }

}
