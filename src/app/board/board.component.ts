import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  constructor(private activeRoute: ActivatedRoute) { }

  p1: string;
  p2: string;
  activePlayer: string;
  squares: string[];
  xIsNext: boolean;
  winner: string;
  value: string;
  isSquareFull: boolean = false;


  ngOnInit(): void {
    this.p1 = this.activeRoute.snapshot.params.p1;
    this.p2 = this.activeRoute.snapshot.params.p2;
    this.activePlayer = this.p1;
    this.getNewGame();
  }

  getNewGame() {
    this.squares = Array(9).fill(null);
    this.winner = null;
    this.xIsNext = true;
  }

  get player() {
    this.xIsNext ? this.activePlayer = this.p2 : this.activePlayer = this.p1;
    return this.xIsNext ? 'X' : 'O';
  }

  makeMove(idx: number) {
    if (!this.squares[idx]) {
      this.squares.splice(idx, 1, this.player);
      this.xIsNext = !this.xIsNext;
    }

    this.winner = this.calculateWinner();
    this.isSquareFull = this.allSquaresFill();
  }

  allSquaresFill() {
    for (let i = 0; i < this.squares.length; i++) {
      if (this.squares[i] === null) {
        return false;
      }
    }
  }

  calculateWinner() {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        this.squares[a] &&
        this.squares[a] === this.squares[b] &&
        this.squares[a] === this.squares[c]
      ) {
        this.activePlayer === this.p1 ? this.activePlayer = this.p2 : this.activePlayer = this.p1;
        return this.squares[a];
      }
    }
    return null;
  }

}
