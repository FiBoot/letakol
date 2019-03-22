import { Player } from './player.class';
import { RecordedKey, Track } from './track.class';

export class TrackPlayer extends Player {
  private keys: RecordedKey[];

  setTracks(tracks: Array<Track>): void {
    this.keys = new Array<RecordedKey>();
    tracks.forEach(track => this.keys.concat(track.recordedKeys));
    this.keys.sort((k1, k2) => k1.start - k2.start);
  }

  private getNextActiveCycle(): void {
  }

  startCB() {
    this.getNextActiveCycle();
  }

  loopCB() {}
}
