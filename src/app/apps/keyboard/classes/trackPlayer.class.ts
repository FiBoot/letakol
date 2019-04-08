import { Player } from './player.class';
import { RecordedKey, Track } from './track.class';

export class TrackPlayer extends Player {
  private tracks: Array<Track>;
  private noteList: Array<RecordedKey>;
  private notePlayed: Array<RecordedKey>;

  setTracks(tracks: Array<Track>): void {
    this.noteList = new Array<RecordedKey>();
    this.notePlayed = new Array<RecordedKey>();
    tracks.forEach(track => {
      this.noteList = this.noteList.concat(track.recordedKeys);
      track.resetProgress();
    });
    this.noteList.sort((k1, k2) => k1.start - k2.start);
    this.tracks = tracks;
  }

  startCB() {
    this.stops.subscribe(() => this.notePlayed.forEach(note => note.key.stop()));
  }

  loopCB() {
    if (!this.noteList.length && !this.notePlayed.length) {
      return this.stop();
    }
    this.tracks.forEach(track => track.progress(this.cycle));
    const notes = this.getCurrentNotes(this.cycle);
    if (notes) {
      this.noteList.splice(0, notes.length);
      notes.forEach(note => {
        this.notePlayed.push(note);
        note.key.play();
      });
    }
    const deleteNotes = new Array<RecordedKey>();
    this.notePlayed.forEach(note => {
      if (note.end === this.cycle) {
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
