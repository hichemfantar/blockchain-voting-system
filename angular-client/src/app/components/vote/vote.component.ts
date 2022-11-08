import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.scss'],
})
export class VoteComponent implements OnInit {
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

  constructor(public authService: AuthService) {}

  ngOnInit(): void {}

  castVote(userUID: any) {
    // MouseEvent {isTrusted: true, screenX: 234, ...
    console.log(userUID);
  }
}
