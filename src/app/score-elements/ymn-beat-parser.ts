import { YmnBeat } from './ymn-beat';
import { YmnChord } from './ymn-chord';
import { YmnChordParser } from './ymn-chord-parser';
import { OCTAVE_INDICATION_REGEXP, YmnScoreNotation } from './score-constants';

export class YmnBeatParser {
  public parse(beatString: string, beat: YmnBeat): void {
    const chordParser = new YmnChordParser();
    let previousChord: YmnChord;
    if (beat.previous !== undefined) {
      previousChord = beat.previous.children[beat.previous.children.length - 1];
    }

    const chordsString = beatString.split(YmnScoreNotation.separators.note);
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
