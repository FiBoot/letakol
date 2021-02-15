import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { Board } from './classes/board.class';
import { Token } from './classes/token.class';

@Component({
  selector: 'app-void-stones',
  templateUrl: './void-stones.component.html',
  styleUrls: ['./void-stones.component.css'],
})
export class VoidStonesComponent implements AfterViewInit, OnDestroy {
  @ViewChild('mapCanvas') private canvasRef: ElementRef;
  public board: Board;

  public selectedToken: Token | null;

  ngAfterViewInit(): void {
    this.board = new Board(this.canvasRef.nativeElement);
    this.board.tokenSelected.subscribe((token) => {
      this.selectedToken = token;
    });
    this.board.newToken();
  }

  ngOnDestroy(): void {
    this.board.destroy();
  }

  tokenChanged(): void {
    console.log(this.selectedToken);
  }
}
