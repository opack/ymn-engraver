import { YmnMeasure } from './ymn-measure';
import { YmnBeatShape } from './ymn-beat-shape';
import { YmnChord } from './ymn-chord';

export class YmnBeat {
  public previous: YmnBeat;
  public next: YmnBeat;
  public measure: YmnMeasure;

  public chords: Array<YmnChord> = [];
  public shape: YmnBeatShape;

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

    this.shape = new YmnBeatShape();
  }
}
