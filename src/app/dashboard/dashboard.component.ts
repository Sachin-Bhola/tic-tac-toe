import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  playersDetailsForm: FormGroup;

  constructor(private fb: FormBuilder,
    private router: Router) { }

  ngOnInit(): void {
    this.getPlayerDetails();
  }

  getPlayerDetails() {
    this.playersDetailsForm = this.fb.group({
      player1: ['Player 1', Validators.required],
      player2: ['Player 2', Validators.required]
    })
  }

  startGame() {
    const p1 = this.playersDetailsForm.get('player1').value;
    const p2 = this.playersDetailsForm.get('player2').value;
    this.router.navigate(['start', p1, p2]);
  }

}
