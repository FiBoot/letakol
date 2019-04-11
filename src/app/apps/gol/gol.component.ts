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
  public gol: Player = new Player();

  ngAfterViewInit(): void {
    this.gol = new GameOfLife(this.canvas.nativeElement.getContext('2d'), this.canvasSize, 25);
  }
}
