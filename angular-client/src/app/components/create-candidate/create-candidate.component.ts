import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-candidate',
  templateUrl: './create-candidate.component.html',
  styleUrls: ['./create-candidate.component.scss'],
})
export class CreateCandidateComponent implements OnInit {
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

  constructor(
    public authService: AuthService,
    private http: HttpClient,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getCandidates();
  }

  async getCandidates() {
    const res = await this.http
      .get<any>(`http://localhost:3001/api/candidates`)
      .toPromise();
    return (this.candidates = res);
  }

  async createCandidate(name: any) {
    const res = await this.http
      .post<any>('http://localhost:3001/api/candidates', {
        name,
      })
      .toPromise();
    this.toastr.success('', 'تمت إضافة المرشح بنجاح');

    this.getCandidates();
  }
}
