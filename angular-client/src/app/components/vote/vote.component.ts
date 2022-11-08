import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/shared/services/user';

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.scss'],
})
export class VoteComponent implements OnInit {
  hasAlreadyVoted: boolean | null = null;

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
  userD: any = {};
  tutorials?: User[];
  maleVoters: number = 0;
  femaleVoters: number = 0;
  handicappedVoters: number = 0;

  constructor(
    public authService: AuthService,
    private http: HttpClient,
    private toastr: ToastrService
  ) {
    // setTimeout(() => {
    //   console.log(authService.userData);
    //   this.userD = authService.userData;
    // }, 1000);
  }

  ngOnInit(): void {
    this.getCandidates();
    this.retrieveTutorials();

    this.checkIfAlreadyVoted(this.userD.accountNumber);

    this.authService.getVotersData().then((res) => console.log(res));
    // console.log(this.userD);

    // setTimeout(() => {
    //   // console.log(authService.userData);
    //   // this.userD = authService.userData;
    // }, 2000);
  }

  retrieveTutorials(): void {
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
        this.tutorials = data;
        let numMales = 0;
        let numFemales = 0;
        data.forEach((u) => {
          if (u?.gender === 'male') {
            numMales++;
          }
          if (u?.gender === 'female') {
            numFemales++;
          }
        });
        this.maleVoters = numMales;
        this.femaleVoters = numFemales;
      });
  }

  async checkIfAlreadyVoted(userUID: any) {
    const res = await this.http
      .get<any>(`http://localhost:3001/api/my-vote/${userUID}`)
      .toPromise();
    return (this.hasAlreadyVoted = res[0]);
  }

  async getCandidates() {
    const res = await this.http
      .get<any>(`http://localhost:3001/api/candidates`)
      .toPromise();
    return (this.candidates = res);
  }

  // castVote(userUID: any, voteCaster: any) {
  castVote(userUID: any) {
    return this.http
      .post<any>('http://localhost:3001/api/votes', {
        candidateId: userUID,
        // accountNumber: parseInt(voteCaster) || 10,
        accountNumber: 15,
      })
      .toPromise()
      .then((res) => {
        this.toastr.success('', 'عملية التصويت ناجحة');
        this.hasAlreadyVoted = true;
        this.getCandidates();
      });

    return this.http.get<any>('https://swapi.dev/api/planets/3/').toPromise();
    // return this.http
    //   .post<any>('http://127.0.0.1:3001/api/votes', {
    //     candidateId: userUID,
    //     accountNumber: userUID,
    //   })
    //   .pipe();
    // catchError(this.handleError('addHero', hero))
  }

  getUserPic(min: any, max: any, gender: any) {
    return `https://randomuser.me/api/portraits/${gender}/${this.randomIntFromInterval(
      0,
      90
    )}.jpg`;

    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  randomIntFromInterval(min: any, max: any) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}
