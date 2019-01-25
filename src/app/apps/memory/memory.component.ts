
import { Component } from '@angular/core';
import { Utils } from 'src/app/services/utils/utils.service';

// TODO: change variable otr
const SIZE = 8;
const SUFFLE = 100;

@Component({
  selector: 'app-root',
  templateUrl: './memory.component.html',
  styleUrls: ['./memory.component.css']
})
export class MemoryComponent {

  moves: number;
  cards: Array<Card>;
  memoryCards = new Array<Card>();

  constructor() {
    this.genereCards();
  }

  public reset(): void {
    this.genereCards();
  }

  public checkCard(card: Card): void {
    if (card.show || card.confirmed) { return; }

    card.show = true;
    this.memoryCards.push(card);

    if (this.memoryCards.length === 2) {
      this.moves += 1;
      if (this.memoryCards[0].type === this.memoryCards[1].type) {
        this.memoryCards.forEach(c => c.confirmed = true);
      }
    }

    if (this.memoryCards.length > 2) {
      this.memoryCards.splice(0, 2).forEach(prev => prev.show = false);
    }

  }

  private genereCards(): void {
    this.moves = 0;
    this.buildCards();
    this.suffleCards();
  }

  private buildCards(): void {
    this.cards = new Array<Card>();
    for (let i = 0; i < SIZE; i++) {
      this.cards.push(new Card(i));
      this.cards.push(new Card(i));
    }
  }

  private suffleCards(): void {
    for (let i = 0; i < SUFFLE; i++) {
      const from = Utils.random(this.cards.length);
      const to = Utils.random(this.cards.length);
      this.arrayMove(this.cards, from, to);
    }
  }

  private arrayMove(arr: Array<any>, from: number, to: number): void {
    if (from < arr.length && to < arr.length) {
      arr.splice(to, 0, arr.splice(from, 1)[0]);
    }
  }

}

class Card {
  type: number;
  show = false;
  confirmed = false;

  constructor(n: number) {
    this.type = n;
  }
}

