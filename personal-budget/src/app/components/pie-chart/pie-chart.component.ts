import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'pb-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss'],
})
export class PieChartComponent implements OnInit {
  public d3Source = [];
  public svg;
  public margin = 40;
  public width = 850;
  public height = 750;
  // The radius of the pie chart is half the smallest side
  public radius = Math.min(this.width, this.height) / 2 - this.margin;

  createSvg(): void {
    this.svg = d3
      .select('figure#pie')
      .append('svg')
      .attr('width', this.width)
      .attr('height', this.height)
      .append('g')
      .attr(
        'transform',
        'translate(' + this.width / 2 + ',' + this.height / 2 + ')'
      );
  }

  drawChart(data): void {
    for (var i = 0; i < data.myBudget.length; i++) {
      this.labels[i] = data.myBudget[i].title;
    }

    var color = d3.scaleOrdinal().domain(this.labels).range(d3.schemeDark2);

    // Compute the position of each group on the pie:
    const pie = d3.pie<any>().value((d: any) => Number(d.budget));

    // Build the pie chart
    var arc = d3
      .arc()
      .innerRadius(this.radius * 0.5) // This is the size of the donut hole
      .outerRadius(this.radius * 0.8);

    // Another arc that won't be drawn. Just for labels positioning
    var outerArc = d3
      .arc()
      .innerRadius(this.radius * 1)
      .outerRadius(this.radius * 0.9);

    var radius = this.radius;

    // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
    this.svg
      .selectAll('allSlices')
      .data(pie(data.myBudget))
      .enter()
      .append('path')
      .attr('d', arc)
      .attr('fill', function (d) {
        return color(d.data.title);
      })
      .attr('stroke', 'white')
      .style('stroke-width', '2px')
      .style('opacity', 0.7);

    // Add the polylines between chart and labels:
    this.svg
      .selectAll('allPolylines')
      .data(pie(data.myBudget))
      .enter()
      .append('polyline')
      .attr('stroke', 'black')
      .style('fill', 'none')
      .attr('stroke-width', 1)
      .attr('points', function (d) {
        var posA = arc.centroid(d); // line insertion in the slice
        var posB = outerArc.centroid(d); // line break: we use the other arc generator that has been built only for that
        var posC = outerArc.centroid(d); // Label position = almost the same as posB
        var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2; // we need the angle to see if the X position will be at the extreme right or extreme left
        posC[0] = radius * 0.95 * (midangle < Math.PI ? 1 : -1); // multiply by 1 or -1 to put it on the right or on the left
        return [posA, posB, posC];
      });

    // Add the polylines between chart and labels:

    this.svg
      .selectAll('allLabels')
      .data(pie(data.myBudget))
      .enter()
      .append('text')
      .text(function (d) {
        return d.data.title;
      })
      .attr('transform', function (d) {
        var pos = outerArc.centroid(d);
        var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
        pos[0] = radius * 0.99 * (midangle < Math.PI ? 1 : -1);
        return 'translate(' + pos + ')';
      })
      .style('text-anchor', function (d) {
        var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
        return midangle < Math.PI ? 'start' : 'end';
      });
  }

  constructor(private dataService: DataService) {}

  public labels = [];

  ngOnInit(): void {
    this.createSvg();
    this.dataService.getChartData().subscribe((data) => {
      this.drawChart(data);
    });
  }
}
