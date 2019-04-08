import { Effect, effects } from './classes/effects';
import { Key } from './classes/key.class';
import { notes } from './classes/notes';
import { Track } from './classes/track.class';
import { TrackPlayer } from './classes/trackPlayer.class';
import { Component } from '@angular/core';
import { Utils } from 'src/app/services/utils/utils.service';

const ESCPAE_KEY = 'Escape';

@Component({
  selector: 'app-keyboard',
  templateUrl: './keyboard.component.html',
  styleUrls: ['./keyboard.component.css']
})
export class KeyboardComponent {
  // keys
  keys: Array<Key>;
  currentKey: Key;
  binds: Array<string>;

  // effects
  effects: Array<Effect>;
  selectedEffect: Effect;
  appliedEffects: Array<Effect> = [];

  // tracks
  tracks: Array<Track> = [];
  currentTrack: Track;
  private player: TrackPlayer = new TrackPlayer();

  constructor() {
    window.addEventListener('keydown', event => this.onKey(event, true));
    window.addEventListener('keyup', event => this.onKey(event, false));
    this.initKeyboard();
    this.initEffects();
  }

  private initKeyboard(): void {
    this.keys = notes.map(note => new Key(note));
    this.saveBinds();
  }

  private initEffects(): void {
    this.effects = effects.map(e => Object.create(e));
    this.selectedEffect = Utils.first(this.effects);
  }

  private saveBinds(): void {
    this.binds = this.keys.map(key => key.note.bind);
  }

  private endTrack(): void {
    this.tracks.push(this.currentTrack);
    setTimeout(() => {
      document.getElementById(this.currentTrack.uuid).appendChild(this.currentTrack.viewDiv);
      this.currentTrack = null;
    });
  }

  private addKeyToTrack(key: Key, pressed: boolean): void {
    if (this.currentTrack) {
      this.currentTrack.regiserKey(
        new Key(key.note, this.effects.filter(effect => effect.active)),
        pressed
      );
    }
  }

  private compareEffects(oldEffects: Array<Effect>, newEffects: Array<Effect>): boolean {
    // check basics
    if (!oldEffects.length || !newEffects.length || oldEffects.length !== newEffects.length) {
      return false;
    }
    // check effects
    for (let i = 0; i < newEffects.length; i++) {
      if (newEffects[i].name !== oldEffects[i].name) {
        return false;
      }
      // check effect's params
      for (let j = 0; j < newEffects[i].params.length; j++) {
        if (newEffects[i].params[j].value !== oldEffects[i].params[j].value) {
          return false;
        }
      }
    }
    return true;
  }

  public isTrackRecording(): boolean {
    return this.currentTrack && this.currentTrack.playing;
  }

  public isPlayerRunning(): boolean {
    return this.player.playing;
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
        console.warn('Key already bind');
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

  public toggleEffect(effect: Effect): void {
    effect.active = !effect.active;
    this.applyEffects();
  }

  public applyEffects(): void {
    const newEffects = this.effects.filter(effect => effect.active);
    if (!this.compareEffects(this.appliedEffects, newEffects)) {
      this.keys.forEach(key => key.applyEffects(newEffects));
      this.appliedEffects = newEffects.map(effect => effect.clone);
    } else {
      console.warn('No new effects applied');
    }
  }

  public resetEffects(): void {
    this.initEffects();
    this.applyEffects();
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
