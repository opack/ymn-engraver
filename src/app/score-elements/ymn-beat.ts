import { YmnChord } from './ymn-chord';
import { YmnMeasure } from './ymn-measure';

export class YmnBeat {
  public previous: YmnBeat;
  public next: YmnBeat;
  public measure: YmnMeasure;

  private chords: Array<YmnChord> = [];

  public parse(beatString: string): void {
    let previousChord: YmnChord;
    const chordsString = beatString.split(' ');
    chordsString.forEach(chordString => {
      const chord = new YmnChord();

      // Set links
      chord.beat = this;
      if (previousChord !== undefined) {
        previousChord.next = chord;
        chord.previous = previousChord;
      }
      previousChord = chord;

      // Parse content
      chord.parse(chordString);
      this.chords.push(chord);
    });
  }
}
