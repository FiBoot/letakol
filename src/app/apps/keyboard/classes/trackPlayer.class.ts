import { RecordedKey, Track } from './track.class';
import { Looper } from 'src/app/classes/looper.class';

export class TrackPlayer extends Looper {
  private tracks: Array<Track>;
  private maxCycle: number;
  private noteList: Array<RecordedKey>;
  private notePlayed: Array<RecordedKey>;

  constructor() {
    super();
    this.stops.subscribe(() => {
      this._cycle = 0;
      this.notePlayed.forEach(note => note.key.stop());
    });
  }

  setTracks(tracks: Array<Track>): void {
    this.maxCycle = 0;
    this.noteList = new Array<RecordedKey>();
    this.notePlayed = new Array<RecordedKey>();
    tracks.forEach(track => {
      this.noteList = this.noteList.concat(track.recordedKeys);
      track.resetProgress();
      this.maxCycle = track.cycle > this.maxCycle ? track.cycle : this.maxCycle;
    });
    this.noteList.sort((k1, k2) => k1.start - k2.start);
    this.tracks = tracks;
  }

  loopCB() {
    if (this.cycle >= this.maxCycle) {
      return this.stop();
    }
    this.tracks.forEach(track => track.progress(this._cycle));
    const notes = this.getCurrentNotes(this._cycle);
    if (notes) {
      this.noteList.splice(0, notes.length);
      notes.forEach(note => {
        this.notePlayed.push(note);
        note.key.play();
      });
    }
    const deleteNotes = new Array<RecordedKey>();
    this.notePlayed.forEach(note => {
      if (note.end === this._cycle) {
        note.key.stop();
        deleteNotes.push(note);
      }
    });
    deleteNotes.forEach(note => this.notePlayed.splice(this.notePlayed.indexOf(note), 1));
  }

  private getCurrentNotes(cycle: number): Array<RecordedKey> {
    const notes: Array<RecordedKey> = [];
    for (let i = 0; i < this.noteList.length; i++) {
      if (this.noteList[i].start === cycle) {
        notes.push(this.noteList[i]);
      }
      if (this.noteList[i].start > cycle) {
        break;
      }
    }
    return notes;
  }
}
