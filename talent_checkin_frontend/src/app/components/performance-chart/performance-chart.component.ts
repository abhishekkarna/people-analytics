import { Component } from "@angular/core";
import {
  ChartComponent,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexStroke,
  ApexMarkers,
  ApexYAxis,
  ApexLegend,
  ApexTooltip,
  ApexGrid,
  ApexTitleSubtitle,
  NgApexchartsModule,
} from "ng-apexcharts";

export type ChartOptions = {
  series: any;
  chart: any;
  xaxis: any;
  yaxis: any;
  dataLabels: any;
  stroke: any;
  markers: any;
  legend: any;
  tooltip: any;
  grid: any;
  title: any;
};

@Component({
  imports: [NgApexchartsModule],
  standalone: true,
  selector: "app-performance-chart",
  templateUrl: "./performance-chart.component.html",
  styleUrls: ["./performance-chart.component.scss"],
})
export class PerformanceChartComponent {
  public chartOptions: Partial<ChartOptions>;

  constructor() {
    this.chartOptions = {
      series: [
        {
          name: "Performance Rating",
          data: [3, 4, 5, 5, 5], // Convert ratings to numerical values if needed
        },
      ],
      chart: {
        type: "line",
        height: 350,
      },
      xaxis: {
        categories: ["2021H2", "2022H2", "2023H1", "2023H2", "2024H1"],
        title: { text: "Cycle" },
      },
      yaxis: {
        title: { text: "Rating" },
      },
      stroke: {
        curve: "smooth",
      },
      markers: {
        size: 5,
      },
      legend: {
        position: "top",
      },
      tooltip: {
        enabled: true,
      },
      grid: {
        borderColor: "#f1f1f1",
      },
      title: {
        text: "Performance Rating Over Cycles",
        align: "center",
      },
    };
  }
}
