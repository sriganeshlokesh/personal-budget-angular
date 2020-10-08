import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'pb-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements OnInit {
  constructor(private dataService: DataService) {}

  createChart(data) {
    var labels = [];
    var _data = [];
    for (var i = 0; i < data.myBudget.length; i++) {
      labels[i] = data.myBudget[i].title;
      _data[i] = data.myBudget[i].budget;
    }
    var ctx = document.getElementById('myChart');
    var myPieChart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [
          {
            data: _data,
            backgroundColor: [
              '#ffcd56',
              '#ff6384',
              '#36a2eb',
              '#fd6b19',
              '#58508d',
              '#bc5090',
              '#ff6361',
              '#003f5c',
              '#b4c6f0',
            ],
          },
        ],
      },
    });
  }

  ngOnInit(): void {
    this.dataService.getChartData().subscribe((data: any) => {
      this.createChart(data);
    });
  }
}
