import { GameOfLife } from './classes/gol.class';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Player } from 'src/app/classes/player.class';

@Component({
  selector: 'app-gol',
  templateUrl: './gol.component.html',
  styleUrls: ['./gol.component.css']
})
export class GolComponent implements AfterViewInit {
  @ViewChild('golCanvas') canvas: ElementRef<HTMLCanvasElement>;

  public canvasSize: number = 500;
  public player: Player = new Player();

  ngAfterViewInit(): void {
    this.player = new GameOfLife(this.canvas.nativeElement.getContext('2d'), 500, 25, 100);
  }

}
