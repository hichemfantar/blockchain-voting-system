import { Injectable, NgZone } from "@angular/core";
import { User } from "../services/user";
import * as auth from "firebase/auth";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import {
	AngularFirestore,
	AngularFirestoreCollection,
	AngularFirestoreDocument,
} from "@angular/fire/compat/firestore";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { ToastrService } from "ngx-toastr";
import { map } from "rxjs";

@Injectable({
	providedIn: "root",
})
export class AuthService {
	userData: any; // Save logged in user data
	userDataa: any; // Save logged in user data
	votersData: any; // Save logged in user data
	private dbPath = "/users";
	isElectionEnded = false;

	usersRef: AngularFirestoreCollection<User>;

	constructor(
		public afs: AngularFirestore, // Inject Firestore service
		public afAuth: AngularFireAuth, // Inject Firebase auth service
		public router: Router,
		public ngZone: NgZone, // NgZone service to remove outside scope warning
		private http: HttpClient,
		private toastr: ToastrService
	) {
		this.usersRef = afs.collection(this.dbPath);

		/* Saving user data in localstorage when 
    logged in and setting up null when logged out */
		this.afAuth.authState.subscribe((user) => {
			if (user) {
				this.userData = user;

				this.getOneUser(user.uid).then((value: any) => {
					console.log("from component-", value);

					if (value.uid) {
						this.userDataa = value;
						localStorage.setItem("userr", JSON.stringify(this.userDataa));
						JSON.parse(localStorage.getItem("userr")!);
					} else {
						localStorage.setItem("userr", "null");

						JSON.parse(localStorage.getItem("userr")!);
					}
				});

				localStorage.setItem("user", JSON.stringify(this.userData));
				// localStorage.setItem("userr", JSON.stringify(this.userDataa));
				JSON.parse(localStorage.getItem("user")!);
				// JSON.parse(localStorage.getItem("userr")!);
			} else {
				localStorage.setItem("user", "null");
				// localStorage.setItem("userr", "null");
				JSON.parse(localStorage.getItem("user")!);
				// JSON.parse(localStorage.getItem("userr")!);
			}
		});

		this.getElectionStatus();
	}

	getAllUsers(): AngularFirestoreCollection<User> {
		return this.usersRef;
	}

	// Sign in with email/password
	SignIn(email: string, password: string) {
		return this.afAuth
			.signInWithEmailAndPassword(email, password)
			.then((result) => {
				this.SetUserData(result.user);

				if (result.user) {
					this.getOneUser(result.user.uid).then((value: any) => {
						console.log("from component-", value);
						this.userDataa = value;
					});
				}

				this.afAuth.authState.subscribe((user) => {
					if (user) {
						this.router.navigate(["stats"]);
					}
				});
			})
			.catch((error) => {
				window.alert(error.message);
			});
	}

	// Sign up with email/password
	SignUp(email: string, password: string) {
		return this.afAuth
			.createUserWithEmailAndPassword(email, password)
			.then((result) => {
				/* Call the SendVerificaitonMail() function when new user sign 
        up and returns promise */
				this.SendVerificationMail();
				this.SetUserData(result.user);
			})
			.catch((error) => {
				window.alert(error.message);
			});
	}

	// Send email verfificaiton when new user sign up
	SendVerificationMail() {
		return this.afAuth.currentUser
			.then((u: any) => {
				return u.sendEmailVerification();
			})
			.then(() => {
				this.router.navigate(["verify-email-address"]);
			});
	}

	// Reset Forggot password
	ForgotPassword(passwordResetEmail: string) {
		return this.afAuth
			.sendPasswordResetEmail(passwordResetEmail)
			.then(() => {
				window.alert("Password reset email sent, check your inbox.");
			})
			.catch((error) => {
				window.alert(error);
			});
	}

	// Returns true when user is looged in and email is verified
	get isLoggedIn(): boolean {
		const user = JSON.parse(localStorage.getItem("user")!);
		return user !== null && user.emailVerified !== false ? true : false;
	}

	// Sign in with Google
	GoogleAuth() {
		return this.AuthLogin(new auth.GoogleAuthProvider()).then((res: any) => {
			this.router.navigate(["stats"]);
		});
	}

	// Auth logic to run auth providers
	AuthLogin(provider: any) {
		return this.afAuth
			.signInWithPopup(provider)
			.then((result) => {
				this.router.navigate(["stats"]);

				this.SetUserData(result.user);
			})
			.catch((error) => {
				window.alert(error);
			});
	}

	/* Setting up user data when sign in with username/password, 
  sign up with username/password and sign in with social auth  
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
	SetUserData(user: any) {
		const userRef: AngularFirestoreDocument<any> = this.afs.doc(
			`users/${user.uid}`
		);
		const userData: User = {
			uid: user.uid,
			email: user.email,
			displayName: user.displayName,
			photoURL: user.photoURL,
			emailVerified: user.emailVerified,
			// accountNumber: user.accountNumber,
		};

		return userRef.set(userData, {
			merge: true,
		});
	}

	getVotersData() {
		const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users`);
		const userData: User[] = [];
		return userRef.set(userData, {
			merge: true,
		});
	}

	// Sign out
	SignOut() {
		return this.afAuth.signOut().then(() => {
			localStorage.removeItem("user");
			localStorage.removeItem("userr");
			this.router.navigate(["sign-in"]);
		});
	}

	async getElectionStatus() {
		const res = await this.http
			.get<any>(`http://localhost:3001/api/election/status`)
			.toPromise();
		if (!res) {
			this.isElectionEnded = true;
		} else this.isElectionEnded = false;
	}
	async endElection() {
		const res = await this.http
			.post<any>(`http://localhost:3001/api/election/end`, {})
			.toPromise();
		if (res) {
			this.isElectionEnded = true;
			this.toastr.success("", "أغلقت الانتخابات بنجاح");
		}
	}
	async startElection() {
		const res = await this.http
			.post<any>(`http://localhost:3001/api/election/activate`, {})
			.toPromise();
		if (res) {
			this.isElectionEnded = false;
			this.toastr.success("", "افتتحت الانتخابات بنجاح");
		}
	}

	getOneUser(id: string): any {
		return this.afs
			.collection<User>("users")
			.doc(id)
			.ref.get()
			.then((doc) => {
				if (doc.exists) {
					console.log(doc.data());
					return doc.data();
				} else {
					return "Doc does not exits";
				}
			})
			.catch((err) => {
				console.error(err);
			});
	}
}
