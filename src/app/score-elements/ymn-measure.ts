import { YmnLine } from './ymn-line';
import { YmnBeat } from './ymn-beat';
import { OCTAVE_INDICATION_REGEXP } from './score-constants';

export class YmnMeasure {
  public previous: YmnMeasure;
  public next: YmnMeasure;
  public line: YmnLine;

  private beats: Array<YmnBeat> = [];
  public octave: string;

  public parse(measureString: string): void {
    if (OCTAVE_INDICATION_REGEXP.test(measureString)) {
      this.octave = measureString;
      return;
    }

    let previousBeat: YmnBeat;
    const beatsString = measureString.split(':');

    beatsString.forEach(beatString => {
      const beat = new YmnBeat();

      // Set links
      beat.measure = this;
      if (previousBeat !== undefined) {
        previousBeat.next = beat;
        beat.previous = previousBeat;
      }
      previousBeat = beat;

      // Parse content
      beat.parse(beatString);
      this.beats.push(beat);
    });
  }
}
