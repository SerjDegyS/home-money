import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'degys-history-chart',
  templateUrl: './history-chart.component.html',
  styleUrls: ['./history-chart.component.scss']
})
export class HistoryChartComponent implements OnInit {

  @Input() data;


  ngOnInit() {
  }

}
