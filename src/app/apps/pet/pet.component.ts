import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Base } from 'src/app/classes/base.class';
import { Pet } from './pet.class';

@Component({
  selector: 'app-pet',
  templateUrl: './pet.component.html',
  styleUrls: ['./pet.component.css']
})
export class PetComponent implements OnInit {

  @ViewChild('petCanvas') private canvasRef: ElementRef;
  private base: Base;
  private pet: Pet;

  private behavior = 0;

  constructor() {
    this.base = new Base({
      timeout: 60,
      loopCallback: this.loop.bind(this),
      keyCallback: this.key.bind(this),
      preventDefaultAllKey: false,
      preventDefaultKeys: []
    });
  }

  ngOnInit() {
    this.pet = new Pet(this.canvasRef.nativeElement.getContext('2d'));
    this.base.start();
  }

  private loop(timestamp: number): void {
    this.pet.next();
    this.pet.draw();
  }

  private key(key: string, pressed: boolean): void { }

  public onMousemove(event: MouseEvent): void {
  }

  public onClick(event: Event): void {
    this.pet.setBehavior(this.behavior++ % 4);
  }

}
