import { Routes } from '@angular/router';
import { ResizingComponent } from '../examples/resizing/resizing.component';
import { FormattersComponent } from '../examples/formatters/formatters.component';
import { StylingComponent } from '../examples/styling/styling.component';
import { NgModelUsageComponent } from '../examples/ng-model-usage/ng-model-usage.component';
import { DisabledStateComponent } from '../examples/disabled-state/disabled-state.component';

export const appRoutes: Routes = [
  { path: 'resizing', component: ResizingComponent },
  { path: 'formatters', component: FormattersComponent },
  { path: 'styling', component: StylingComponent },
  { path: 'ngModelUsage', component: NgModelUsageComponent },
  { path: 'disabled', component: DisabledStateComponent }
];
