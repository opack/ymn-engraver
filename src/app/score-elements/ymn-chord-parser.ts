import { YmnChord } from './ymn-chord';
import { YmnNote } from './ymn-note';
import { YmnNoteParser } from './ymn-note-parser';

export class YmnChordParser {
  public parse(chordString: string, chord: YmnChord): void {
    const noteParser = new YmnNoteParser();
    let previousNote: YmnNote;
    const notesString = chordString.split('+');
    
    notesString.forEach(noteString => {
      const note = new YmnNote();

      // Add shape
      chord.shape.add(note.shape);

      // Set links
      note.parent = chord;
      if (previousNote !== undefined) {
        previousNote.next = note;
        note.previous = previousNote;
      }
      previousNote = note;

      // Parse content
      noteParser.parse(noteString, note);
      chord.children.push(note);
    });
  }
}
