import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../shared/services/auth.service";
import { ChartConfiguration } from "chart.js";
import { ChartOptions } from "chart.js";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs";
import { User } from "src/app/shared/services/user";

@Component({
	selector: "app-stats",
	templateUrl: "./stats.component.html",
	styleUrls: ["./stats.component.scss"],
})
export class StatsComponent implements OnInit {
	users?: User[];
	maleVoters: number = 0;
	femaleVoters: number = 0;
	handicappedVoters: number = 0;

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

	title = "ng2-charts-demo";
	public pieChartOptions: ChartOptions<"pie"> = {
		responsive: false,
	};

	public pieChartLabels = [""];
	public pieChartDatasets = [
		{
			data: [300, 500, 100],
		},
	];

	public pieChartGenderLabels = [""];
	public pieChartGenderDatasets = [
		{
			data: [300, 500, 100],
		},
	];
	public pieChartLegend = true;
	public pieChartPlugins = [];

	ngOnInit(): void {
		this.getCandidates();
		this.retrieveUsers();
	}

	retrieveUsers(): void {
		this.authService
			.getAllUsers()
			.snapshotChanges()
			.pipe(
				map((changes) =>
					changes.map((c) => ({
						id: c.payload.doc.id,
						...c.payload.doc.data(),
					}))
				)
			)
			.subscribe((data) => {
				this.users = data;
				let numMales = 0;
				let numFemales = 0;
				data.forEach((u) => {
					if (u?.gender === "male") {
						numMales++;
					}
					if (u?.gender === "female") {
						numFemales++;
					}
				});
				this.maleVoters = numMales;
				this.femaleVoters = numFemales;
			});
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
