import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { MatTableModule } from "@angular/material/table";
import { PerformanceChartComponent } from "src/app/components/performance-chart/performance-chart.component";
@Component({
  selector: "app-performance-data",
  imports: [MatTableModule, PerformanceChartComponent],
  standalone: true,
  templateUrl: "./performance-data.component.html",
  styleUrl: "./performance-data.component.scss",
})
export class PerformanceDataComponent {
  @Input() data: any;
  displayedColumns = ["cycle", "rating"];
}
