import { Component, OnInit } from "@angular/core";
import {
	faChartPie,
	faCheckToSlot,
	faList,
	faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { AuthService } from "../shared/services/auth.service";

@Component({
	selector: "app-side-navbar",
	templateUrl: "./side-navbar.component.html",
	styleUrls: ["./side-navbar.component.scss"],
})
export class SideNavbarComponent implements OnInit {
	constructor(public authService: AuthService) {}
	faChartPie = faChartPie;
	faCheckToSlot = faCheckToSlot;
	faList = faList;
	faRightFromBracket = faRightFromBracket;

	ngOnInit(): void {}
}
