import { Component, OnInit } from '@angular/core';
import { Utils } from 'src/app/services/utils/utils.service';

const ROLLS = 10;
enum ERarity {
  NORMAL = 0,
  RARE,
  EPIC,
  LEGENDARY
}
const Rarities: Array<ERarity> = [ERarity.NORMAL, ERarity.RARE, ERarity.EPIC, ERarity.LEGENDARY];

class Rarity {
  constructor(readonly name: string, readonly rate: number, readonly color: string) {}
}

@Component({
  selector: 'app-card-proba',
  templateUrl: './card-proba.component.html',
  styleUrls: ['./card-proba.component.css']
})
export class CardProbaComponent {
  tirage: Array<ERarity>;
  tirageCount: number = 0;
  cards: Array<number>;

  readonly rarities: Array<Rarity> = [
    new Rarity('normal', 51.69, 'green'),
    new Rarity('rare', 43.7, 'blue'),
    new Rarity('epic', 4.61, 'magenta'),
    new Rarity('legendary', 0.01, 'gold')
  ];

  constructor() {
    this.reset();
  }

  private pick(): ERarity {
    const rand = Utils.random(1000) / 10;
    for (let i = 0, rate = 0; i < this.rarities.length; i++) {
      if (rand < (rate += this.rarities[i].rate)) {
        return Rarities[i];
      }
    }
    return Rarities[0];
  }

  public roll() {
    this.tirage = new Array<ERarity>();
    for (let i = 0; i < ROLLS; i++) {
      const card = this.pick();
      this.cards[card] += 1;
      this.tirage.push(card);
    }
    this.tirageCount += 1;
  }

  public roll10() {
    Utils.repeat(this.roll.bind(this), 10);
  }

  public roll50() {
    Utils.repeat(this.roll.bind(this), 50);
  }


  public reset() {
    this.tirage = [];
    this.tirageCount = 0;
    this.cards = Rarities.map(_ => 0);
  }

  public cardPercentage(index: number): number {
    return Utils.fixed((this.cards[index] / this.tirageCount) * ROLLS, 2);
  }
}
