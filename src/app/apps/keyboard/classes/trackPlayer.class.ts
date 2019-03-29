import { Player } from './player.class';
import { RecordedKey, Track } from './track.class';
import { Utils } from 'src/app/services/utils/utils.service';

export class TrackPlayer extends Player {
  private noteList: Array<RecordedKey>;
  private notePlayed: Array<RecordedKey>;

  setTracks(tracks: Array<Track>): void {
    this.noteList = new Array<RecordedKey>();
    this.notePlayed = new Array<RecordedKey>();
    tracks.forEach(track => (this.noteList = this.noteList.concat(track.recordedKeys)));
    this.noteList.sort((k1, k2) => k1.start - k2.start);
  }

  startCB() {
    this.stops.subscribe(() => this.notePlayed.forEach(note => note.key.stop()));
  }

  loopCB() {
    if (!this.noteList.length && !this.notePlayed.length) {
      return this.stop();
    }
    if (this.noteList.length && this.cycle === Utils.first(this.noteList).start) {
      const note = this.noteList.shift();
      this.notePlayed.push(note);
      note.key.play();
    }
    const deleteNotes = new Array<RecordedKey>();
    this.notePlayed.forEach(note => {
      if (this.cycle === note.end) {
        note.key.stop();
        deleteNotes.push(note);
      }
    });
    deleteNotes.forEach(note => this.notePlayed.splice(this.notePlayed.indexOf(note), 1));
  }
}
