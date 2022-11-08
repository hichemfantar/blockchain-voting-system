import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { ChartConfiguration } from 'chart.js';
import { ChartOptions } from 'chart.js';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss'],
})
export class StatsComponent implements OnInit {
  candidates: any[] = [
    // {
    //   name: 'Douglas  Pace',
    //   voteCount: 0,
    // },
    // {
    //   name: 'Mcleod  Mueller',
    //   voteCount: 5,
    // },
    // {
    //   name: 'Day  Meyers',
    //   voteCount: 0,
    // },
    // {
    //   name: 'Aguirre  Ellis',
    //   voteCount: 0,
    // },
    // {
    //   name: 'Cook  Tyson',
    //   voteCount: 0,
    // },
  ];
  constructor(public authService: AuthService, private http: HttpClient) {}

  title = 'ng2-charts-demo';
  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: false,
  };

  public pieChartLabels = [''];
  public pieChartDatasets = [
    {
      data: [300, 500, 100],
    },
  ];
  public pieChartLegend = true;
  public pieChartPlugins = [];

  ngOnInit(): void {
    this.getCandidates();
  }

  async getCandidates() {
    const res = await this.http
      .get<any>(`http://localhost:3001/api/candidates`)
      .toPromise();
    this.candidates = res;
    this.pieChartLabels = this.candidates.map((c) => c?.name);
    this.pieChartDatasets[0].data = this.candidates.map((c) => c?.voteCount);
  }
}
