import { ComponentFixture, TestBed } from "@angular/core/testing";

import { StatsHomeComponent } from "./statshome.component";

describe("DashboardComponent", () => {
	let component: StatsHomeComponent;
	let fixture: ComponentFixture<StatsHomeComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [StatsHomeComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(StatsHomeComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
