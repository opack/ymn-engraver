import { YmnNote } from './ymn-note';
import { NOTES_TO_PITCHES } from './score-constants';

export class YmnNoteParser {
  public parse(noteString: string, note: YmnNote): void {
    note.pitch = NOTES_TO_PITCHES[noteString.toUpperCase()];
    note.isContinuationNote = note.pitch === '*';

    note.shape.update(note.pitch);
  }
}
