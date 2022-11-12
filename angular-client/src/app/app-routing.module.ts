import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { SignInComponent } from "./components/sign-in/sign-in.component";
import { SignUpComponent } from "./components/sign-up/sign-up.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { ForgotPasswordComponent } from "./components/forgot-password/forgot-password.component";
import { VerifyEmailComponent } from "./components/verify-email/verify-email.component";

// route guard
import { AuthGuard } from "./shared/guard/auth.guard";
import { GuestGuard } from "./shared/guard/guest.guard";
import { VoteComponent } from "./components/vote/vote.component";
import { CreateCandidateComponent } from "./components/create-candidate/create-candidate.component";
import { StatsComponent } from "./components/stats/stats.component";
import { StatsHomeComponent } from "./components/statshome/statshome.component";

const routes: Routes = [
	{ path: "", redirectTo: "/sign-in", pathMatch: "full" },
	{ path: "sign-in", component: SignInComponent, canActivate: [GuestGuard] },
	{
		path: "register-user",
		component: SignUpComponent,
		canActivate: [GuestGuard],
	},
	{
		path: "dashboard",
		component: DashboardComponent,
		canActivate: [AuthGuard],
	},
	{
		path: "forgot-password",
		component: ForgotPasswordComponent,
		canActivate: [GuestGuard],
	},
	{
		path: "verify-email-address",
		component: VerifyEmailComponent,
		canActivate: [GuestGuard],
	},
	{
		path: "vote",
		component: VoteComponent,
		canActivate: [AuthGuard],
	},
	{
		path: "create-candidate",
		component: CreateCandidateComponent,
		canActivate: [AuthGuard],
	},
	{
		path: "stats",
		component: StatsComponent,
		canActivate: [AuthGuard],
	},
	{
		path: "home",
		component: StatsHomeComponent,
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
