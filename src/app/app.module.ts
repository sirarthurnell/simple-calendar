import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { appRoutes } from './routes/appRoutes';
import { MonthCalendarModule } from 'simple-calendar';
import { AppComponent } from './app.component';
import { ResizingComponent } from './examples/resizing/resizing.component';
import { StylingComponent } from './examples/styling/styling.component';
import { FormattersComponent } from './examples/formatters/formatters.component';
import { NgModelUsageComponent } from './examples/ng-model-usage/ng-model-usage.component';
import { DisabledStateComponent } from './examples/disabled-state/disabled-state.component';
import { CustomTemplatesComponent } from './examples/custom-templates/custom-templates.component';
import { TutorialComponent } from './examples/tutorial/tutorial.component';

@NgModule({
  declarations: [
    AppComponent,
    ResizingComponent,
    StylingComponent,
    FormattersComponent,
    NgModelUsageComponent,
    DisabledStateComponent,
    CustomTemplatesComponent,
    TutorialComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    MonthCalendarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
