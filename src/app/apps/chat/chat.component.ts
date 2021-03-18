import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';

class Message {
  public date: string;
  constructor(
    public from: string,
    public value: string,
  ) {
    this.date = new Date().toISOString();
  }
}

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {

  messages: Observable<any[]>;

  constructor(private afd: AngularFireDatabase) {
    this.messages = this.afd.list(`/chat/messages/${this.getUTCFullDate()}`).valueChanges();
  }

  newMessage(message: string): void {
    this.afd.list(`/chat/messages/${this.getUTCFullDate()}`).push(new Message('owner', message));
  }

  public displayDate(isoString: string): string {
    const date = new Date(isoString);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  }

  public getUTCFullDate(days: number = 0) {
    const date = new Date;
    if (days) { date.setDate(date.getDate() - days); }
    return `${date.getUTCMonth() + 1}-${date.getUTCDate()}-${date.getUTCFullYear()}`;
  }
}
