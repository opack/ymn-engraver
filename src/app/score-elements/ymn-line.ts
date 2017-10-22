import { YmnSystem } from './ymn-system';
import { YmnLineShape } from './ymn-line-shape';
import { YmnMeasure } from './ymn-measure';
import { YmnScoreElementsBank } from './ymn-score-elements-bank';

export class YmnLine {
  public previous: YmnLine;
  public next: YmnLine;
  public parent: YmnSystem;

  public children: Array<YmnMeasure> = [];
  public shape: YmnLineShape = new YmnLineShape();

  public measureCount = 0;
  public beatCount = 0;

  public parse(lineString: string): void {
    let previousMeasure: YmnMeasure;
    const measuresString = lineString.split('|');
    measuresString.forEach(measureString => {
      const measure = new YmnMeasure();
      YmnScoreElementsBank.getInstance().registerMeasure(measure, this.measureCount++);
      
      // Add shape
      this.shape.add(measure.shape);
      
      // Set links
      measure.parent = this;
      if (previousMeasure !== undefined) {
        previousMeasure.next = measure;
        measure.previous = previousMeasure;
      }
      previousMeasure = measure;

      // Parse content
      measure.parse(measureString);
      this.children.push(measure);
    });
  }
}
