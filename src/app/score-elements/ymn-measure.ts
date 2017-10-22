import { YmnLine } from './ymn-line';
import { YmnMeasureShape } from './ymn-measure-shape';
import { YmnBeat } from './ymn-beat';
import { OCTAVE_INDICATION_REGEXP } from './score-constants';
import { YmnScoreElementsBank } from './ymn-score-elements-bank';

export class YmnMeasure {
  public previous: YmnMeasure;
  public next: YmnMeasure;
  public parent: YmnLine;

  public children: Array<YmnBeat> = [];
  public isOctaveMeasure: boolean;
  public octave: string;
  public shape: YmnMeasureShape = new YmnMeasureShape();

  public parse(measureString: string): void {
    this.isOctaveMeasure = OCTAVE_INDICATION_REGEXP.test(measureString);
    if (this.isOctaveMeasure) {
      this.octave = measureString;
      this.shape.update(this.octave);
    } else {
      let previousBeat: YmnBeat;
      const beatsString = measureString.split(':');

      beatsString.forEach(beatString => {
        const beat = new YmnBeat();
        YmnScoreElementsBank.getInstance().registerBeat(beat, this.parent.beatCount++);

        // Add shape
        this.shape.add(beat.shape);

        // Set links
        beat.parent = this;
        if (previousBeat !== undefined) {
          previousBeat.next = beat;
          beat.previous = previousBeat;
        }
        previousBeat = beat;

        // Parse content
        beat.parse(beatString);
        this.children.push(beat);
      });
    }
    this.shape;
  }
}
