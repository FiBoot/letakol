import { Component, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from 'angularfire2/database';
import { Base } from 'src/app/classes/base.class';
import { Utils } from 'src/app/services/utils/utils.service';

class Person {
  private _id: string;
  public x: number;
  public y: number;
  public lastMessage: string;

  constructor(public name: string, public color: string = '#fff') {
    this.x = 0;
    this.y = 0;
  }
  get id(): string { return this._id; }
  set id(id: string) { this._id = this._id ? this._id : id; }
}

const enum DIR { UP = 0, RIGHT, DOWN, LEFT }
const KEYS = ['ArrowUp', 'ArrowRight', 'ArrowDown', 'ArrowLeft'];
const SPEED = 10;

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.css']
})
export class ChatRoomComponent implements OnDestroy {

  private self: Person;
  private nextDir: DIR;
  private base: Base;

  public people: Observable<any[]>;

  constructor(private afd: AngularFireDatabase) {
    this.base = new Base({
      keyCallback: this.keyHandler.bind(this),
      loopCallback: this.loopHandler.bind(this),
      preventDefaultAllKey: false,
      preventDefaultKeys: KEYS,
      timeout: 30
    });
    this.people = this.afd.list(`/chat-room/people`).valueChanges();
  }

  ngOnDestroy(): void {
    this.logout();
  }

  public isLogged(): boolean { return this.self ? true : false; }

  private keyHandler(key: string, pressed: boolean): void {
    if (this.isLogged() && KEYS.includes(key)) {
      this.nextDir = pressed ? KEYS.indexOf(key) : null;
    }
  }

  private loopHandler(timestamp: number): void {
    if (this.isLogged()) {
      switch (this.nextDir) {
        case DIR.UP: this.self.y -= SPEED;
          break;
        case DIR.RIGHT: this.self.x += SPEED;
          break;
        case DIR.DOWN: this.self.y += SPEED;
          break;
        case DIR.LEFT: this.self.x -= SPEED;
          break;
      }
      this.afd.object(`/chat-room/people/${this.self.id}`).update(this.self);

    }
  }

  public sendMessage(message: string): void {
    this.self.lastMessage = message;
    this.afd.object(`/chat-room/people/${this.self.id}`).update(this.self);
  }

  public sendLogin(login: string): void {
    this.self = new Person(login, Utils.generateColor());
    const ret = this.afd.list(`/chat-room/people`).push(this.self);
    this.self.id = ret.key;
    this.base.start();
  }

  public logout(): void {
    if (this.isLogged()) {
      console.log(`removing person ${this.self.id}`);
      this.afd.object(`/chat-room/people/${this.self.id}`).remove();
      delete this.self;
      this.base.stop();
    }
  }

}
