import { Component, OnInit } from '@angular/core';
import { MonthGrid } from './models/month-grid';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app';

  ngOnInit(): void {
    const monthGrid = new MonthGrid(new Date());
    monthGrid.createGrid();
  }
}
