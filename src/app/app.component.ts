import { Component, OnInit } from '@angular/core';
import { Month } from './models/month';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app';

  ngOnInit(): void {
  }
}
