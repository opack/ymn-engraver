import { YmnBeat } from './ymn-beat';
import { YmnChordShape } from './ymn-chord-shape';
import { YmnNote } from './ymn-note';

export class YmnChord {
  public previous: YmnChord;
  public next: YmnChord;
  public beat: YmnBeat;

  public notes: Array<YmnNote> = [];
  public shape: YmnChordShape;

  public parse(chordString: string): void {
    let previousNote: YmnNote;
    const notesString = chordString.split('+');
    
    notesString.forEach(noteString => {
      const note = new YmnNote();

      // Set links
      note.chord = this;
      if (previousNote !== undefined) {
        previousNote.next = note;
        note.previous = previousNote;
      }
      previousNote = note;

      // Parse content
      note.parse(noteString);
      this.notes.push(note);
    });

    this.shape = new YmnChordShape();
  }
}
