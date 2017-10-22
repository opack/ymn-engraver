import { YmnLine } from './ymn-line';
import { YmnMeasure } from './ymn-measure';
import { YmnMeasureParser } from './ymn-measure-parser';

export class YmnLineParser {
  public parse(lineString: string, line: YmnLine): void {
    const measureParser = new YmnMeasureParser();
    let previousMeasure: YmnMeasure;

    const measuresString = lineString.split('|');
    measuresString.forEach(measureString => {
      const measure = new YmnMeasure();
      
      // Add shape
      line.shape.add(measure.shape);
      
      // Set links
      measure.parent = line;
      if (previousMeasure !== undefined) {
        previousMeasure.next = measure;
        measure.previous = previousMeasure;
      }
      previousMeasure = measure;

      // Parse content
      measureParser.parse(measureString, measure);
      line.children.push(measure);
    });
  }
}
