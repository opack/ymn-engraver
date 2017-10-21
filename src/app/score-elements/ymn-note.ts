import { YmnChord } from './ymn-chord';
import { NOTES_TO_PITCHES } from './score-constants';
import { YmnNoteShape } from './ymn-note-shape';

export class YmnNote {
  public previous: YmnNote;
  public next: YmnNote;
  public chord: YmnChord;

  public pitch: string;
  public shape: YmnNoteShape;

  public parse(noteString: string): void {
    this.pitch = NOTES_TO_PITCHES[noteString.toUpperCase()];

    this.shape = new YmnNoteShape(this.pitch);
  }
}
