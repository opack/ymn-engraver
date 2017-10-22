import { YmnBeat } from './ymn-beat';
import { YmnChordShape } from './ymn-chord-shape';
import { YmnNote } from './ymn-note';

export class YmnChord {
  public previous: YmnChord;
  public next: YmnChord;
  public parent: YmnBeat;

  public children: Array<YmnNote> = [];
  public shape: YmnChordShape = new YmnChordShape();

  public parse(chordString: string): void {
    let previousNote: YmnNote;
    const notesString = chordString.split('+');
    
    notesString.forEach(noteString => {
      const note = new YmnNote();

      // Add shape
      this.shape.add(note.shape);

      // Set links
      note.parent = this;
      if (previousNote !== undefined) {
        previousNote.next = note;
        note.previous = previousNote;
      }
      previousNote = note;

      // Parse content
      note.parse(noteString);
      this.children.push(note);
    });
  }
}
