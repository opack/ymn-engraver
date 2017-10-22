import { YmnBeat } from './ymn-beat';
import { YmnChord } from './ymn-chord';
import { YmnChordParser } from './ymn-chord-parser';
import { OCTAVE_INDICATION_REGEXP } from './score-constants';

export class YmnBeatParser {
  public parse(beatString: string, beat: YmnBeat): void {
    const chordParser = new YmnChordParser();
    let previousChord: YmnChord;
    const chordsString = beatString.split(' ');
    chordsString.forEach(chordString => {
      const chord = new YmnChord();

      // Add shape
      beat.shape.add(chord.shape);

      // Set links
      chord.parent = beat;
      if (previousChord !== undefined) {
        previousChord.next = chord;
        chord.previous = previousChord;
      }
      previousChord = chord;

      // Parse content
      chordParser.parse(chordString, chord);
      beat.children.push(chord);
    });
  }
}
