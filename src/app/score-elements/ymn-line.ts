import { YmnScore } from './ymn-score';
import { YmnMeasure } from './ymn-measure';

export class YmnLine {
  public previous: YmnLine;
  public next: YmnLine;
  public music: YmnScore;

  private measures: Array<YmnMeasure> = [];

  public parse(lineString: string): void {
    let previousMeasure: YmnMeasure;
    const measuresString = lineString.split('|');
    measuresString.forEach(measureString => {
      const measure = new YmnMeasure();

      // Set links
      measure.line = this;
      if (previousMeasure !== undefined) {
        previousMeasure.next = measure;
        measure.previous = previousMeasure;
      }
      previousMeasure = measure;

      // Parse content
      measure.parse(measureString);
      this.measures.push(measure);
    });
  }
}
