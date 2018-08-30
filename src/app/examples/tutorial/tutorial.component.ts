import { Component, OnInit } from '@angular/core';
import { DayOfWeek } from 'projects/simple-calendar/src/public_api';

@Component({
  selector: 'app-tutorial',
  templateUrl: './tutorial.component.html',
  styleUrls: ['./tutorial.component.scss']
})
export class TutorialComponent {
  date = new Date();

  firstDayOfWeek = DayOfWeek.Monday;

  private daysOfWeekInJapanese = ['月', '火', '水', '木', '金', '土', '日'];
  dayOfWeekCaptionFormatter = (dayOfWeek: DayOfWeek) => {
    return this.daysOfWeekInJapanese[dayOfWeek.valueOf()];
  }

  monthCaptionFormatter = (date: Date) => {
    return `${date.getFullYear()}年 ${date.getMonth() + 1}月`;
  }
}
