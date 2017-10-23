import { YmnMeasure } from './ymn-measure';
import { YmnBeat } from './ymn-beat';
import { YmnBeatParser } from './ymn-beat-parser';
import { OCTAVE_INDICATION_REGEXP } from './score-constants';

export class YmnMeasureParser {
  public parse(measureString: string, measure: YmnMeasure): void {
    const beatParser = new YmnBeatParser();

    measure.isOctaveMeasure = OCTAVE_INDICATION_REGEXP.test(measureString);
    if (measure.isOctaveMeasure) {
      measure.octave = measureString;
      measure.shape.update(measure.octave);
    } else {
      let previousBeat: YmnBeat;
      if (measure.previous !== undefined) {
        previousBeat = measure.previous.children[measure.previous.children.length - 1];
      }

      const beatsString = measureString.split(':');

      beatsString.forEach(beatString => {
        const beat = new YmnBeat();

        // Add shape
        measure.shape.add(beat.shape);

        // Set links
        beat.parent = measure;
        if (previousBeat !== undefined) {
          previousBeat.next = beat;
          beat.previous = previousBeat;
        }
        previousBeat = beat;

        // Parse content
        beatParser.parse(beatString, beat);
        measure.children.push(beat);
      });
    }
  }
}
