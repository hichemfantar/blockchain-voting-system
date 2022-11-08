import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.scss'],
})
export class VoteComponent implements OnInit {
  hasAlreadyVoted: boolean | null = null;

  candidates: any[] = [
    {
      name: 'Douglas  Pace',
      voteCount: 0,
    },
    {
      name: 'Mcleod  Mueller',
      voteCount: 5,
    },
    {
      name: 'Day  Meyers',
      voteCount: 0,
    },
    {
      name: 'Aguirre  Ellis',
      voteCount: 0,
    },
    {
      name: 'Cook  Tyson',
      voteCount: 0,
    },
  ];

  constructor(public authService: AuthService, private http: HttpClient) {}

  ngOnInit(): void {
    this.checkIfAlreadyVoted(0);
  }

  checkIfAlreadyVoted(userUID: any) {
    return this.http
      .get<any>(`http://localhost:3001/api/my-vote/${userUID}`)
      .toPromise()
      .then((res) => (this.hasAlreadyVoted = res[0]));
  }

  castVote(userUID: any) {
    console.log(userUID);
    return this.http
      .post<any>('http://localhost:3001/api/votes', {
        candidateId: userUID,
        accountNumber: 0,
      })
      .toPromise();

    return this.http.get<any>('https://swapi.dev/api/planets/3/').toPromise();
    // return this.http
    //   .post<any>('http://127.0.0.1:3001/api/votes', {
    //     candidateId: userUID,
    //     accountNumber: userUID,
    //   })
    //   .pipe();
    // catchError(this.handleError('addHero', hero))
  }
}
