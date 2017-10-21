import { YmnLine } from './ymn-line';
import { YmnMeasureShape } from './ymn-measure-shape';
import { YmnBeat } from './ymn-beat';
import { OCTAVE_INDICATION_REGEXP } from './score-constants';

export class YmnMeasure {
  public previous: YmnMeasure;
  public next: YmnMeasure;
  public line: YmnLine;

  public beats: Array<YmnBeat> = [];
  public isOctaveMeasure: boolean;
  public octave: string;
  public shape: YmnMeasureShape;

  public parse(measureString: string): void {
    this.isOctaveMeasure = OCTAVE_INDICATION_REGEXP.test(measureString);
    if (this.isOctaveMeasure) {
      this.octave = measureString;      
    } else {
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
    this.shape = new YmnMeasureShape(this.octave);
  }
}
