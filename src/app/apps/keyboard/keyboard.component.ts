import { ENote, Key } from './classes/key.class';
import { Track } from './classes/track.class';
import { TrackPlayer } from './classes/trackPlayer.class';
import { Component } from '@angular/core';

const keys = [
  { note: ENote.A, bind: 'q', sharped: false },
  { note: ENote.A, bind: '2', sharped: true },
  { note: ENote.B, bind: 'w', sharped: false },
  { note: ENote.B, bind: '3', sharped: true },
  { note: ENote.C, bind: 'e', sharped: false },
  { note: ENote.D, bind: 'r', sharped: false },
  { note: ENote.D, bind: '5', sharped: true },
  { note: ENote.E, bind: 't', sharped: false },
  { note: ENote.E, bind: '6', sharped: true },
  { note: ENote.F, bind: 'y', sharped: false },
  { note: ENote.F, bind: '7', sharped: true },
  { note: ENote.G, bind: 'u', sharped: false },

  { note: ENote.As, bind: 'i', sharped: false },
  { note: ENote.As, bind: '9', sharped: true },
  { note: ENote.Bs, bind: 'o', sharped: false },
  { note: ENote.Bs, bind: '0', sharped: true },
  { note: ENote.Cs, bind: 'p', sharped: false },
  { note: ENote.Ds, bind: '[', sharped: false },
  { note: ENote.Ds, bind: '=', sharped: true },
  { note: ENote.Es, bind: ']', sharped: false },
  { note: ENote.Es, bind: '?', sharped: true },
  { note: ENote.Fs, bind: '?', sharped: false },
  { note: ENote.Fs, bind: '?', sharped: true },
  { note: ENote.Gs, bind: '?', sharped: false }
];
const ESCPAE_KEY = 'Escape';

@Component({
  selector: 'app-keyboard',
  templateUrl: './keyboard.component.html',
  styleUrls: ['./keyboard.component.css']
})
export class KeyboardComponent {
  keys: Array<Key>;
  binds: Array<string>;
  currentKey: Key;
  tracks: Array<Track> = [];
  currentTrack: Track;
  private player: TrackPlayer = new TrackPlayer();

  constructor() {
    window.addEventListener('keydown', event => this.onKey(event, true));
    window.addEventListener('keyup', event => this.onKey(event, false));
    this.initKeyboard();
  }

  private initKeyboard(): void {
    this.keys = keys.map(key => new Key(key.note, key.bind, key.sharped));
    this.saveBinds();
  }

  private saveBinds(): void {
    this.binds = this.keys.map(key => key.keyBind);
  }

  private endTrack(): void {
    this.tracks.push(this.currentTrack);
    this.currentTrack = null;
  }

  public isTrackRecording(): boolean {
    return this.currentTrack && this.currentTrack.isPlaying();
  }

  public isPlayerRunning(): boolean {
    return this.player.isPlaying();
  }

  public onKey(event: KeyboardEvent, pressed: boolean): void {
    // Escape rules them all
    if (event.key === ESCPAE_KEY) {
      this.keys.map(key => (key.binding = false));
      return;
    }
    // binding a key
    if (pressed && this.currentKey) {
      if (!this.binds.includes(event.key)) {
        this.currentKey.keyBind = event.key;
        this.saveBinds();
      } else {
        console.warn('already bind');
      }
      this.currentKey.binding = false;
      this.currentKey = null;
      return;
    }
    // pressing a key
    if (this.binds.includes(event.key)) {
      const findKey = this.keys.find(key => key.keyBind === event.key);
      if (findKey) {
        if (pressed && !findKey.active) {
          findKey.play();
        }
        if (!pressed && findKey.active) {
          findKey.stop();
        }
        // save key to track
        if (this.isTrackRecording()) {
          this.currentTrack.regiserKey(findKey, pressed);
        }
        findKey.active = pressed;
      }
      event.preventDefault();
    }
  }

  public bind(currentKey: Key): void {
    this.currentKey = null;
    if (currentKey.binding) {
      currentKey.binding = false;
    } else {
      this.keys.map(key => (key.binding = false));
      currentKey.binding = true;
      this.currentKey = currentKey;
    }
  }

  public startTrack(): void {
    if (this.isTrackRecording()) {
      this.currentTrack.stop();
    } else {
      this.currentTrack = new Track();
      this.currentTrack.stops.subscribe(() => this.endTrack());
      this.currentTrack.start();
    }
  }

  public editTrack(track: Track): void {
    this.deleteTrack(track);
    this.startTrack();
  }

  public deleteTrack(track: Track): void {
    this.tracks.splice(this.tracks.indexOf(track), 1);
  }

  public startPlayer(): void {
    if (!this.isPlayerRunning()) {
      this.player.setTracks(this.tracks);
      this.player.start();
    } else {
      this.player.stop();
    }
  }
}
