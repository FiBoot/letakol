import { Key } from './classes/key.class';
import { notes } from './classes/notes';
import { Track } from './classes/track.class';
import { TrackPlayer } from './classes/trackPlayer.class';
import { Component } from '@angular/core';

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
    this.keys = notes.map(note => new Key(note));
    this.saveBinds();
  }

  private saveBinds(): void {
    this.binds = this.keys.map(key => key.note.bind);
  }

  private endTrack(): void {
    this.tracks.push(this.currentTrack);
    this.currentTrack = null;
  }

  private addKeyToTrack(key: Key, pressed: boolean): void {
    if (this.currentTrack) {
      this.currentTrack.regiserKey(new Key(key.note), pressed);
    }
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
        this.currentKey.note.bind = event.key;
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
      const findKey = this.keys.find(key => key.note.bind === event.key);
      if (findKey) {
        if (pressed && !findKey.active) {
          findKey.play();
          // add key to track
          this.addKeyToTrack(findKey, true);
        }
        if (!pressed && findKey.active) {
          findKey.stop();
          // save key to track
          this.addKeyToTrack(findKey, false);
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
