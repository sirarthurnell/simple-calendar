import { Component, OnInit } from '@angular/core';
import { Month } from './models/month';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app';

  date = new Date();

  ngOnInit(): void {
  }

  createNewMonth(): void {
    this.date = new Date(2014, 1, 1);
  }
}
