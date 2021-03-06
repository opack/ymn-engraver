import { YmnStaff } from './ymn-staff';
import { YmnMeasure } from './ymn-measure';
import { YmnMeasureParser } from './ymn-measure-parser';
import { YmnScoreNotation } from './score-constants';

export class YmnStaffParser {
  public parse(staffString: string, staff: YmnStaff): void {
    const measureParser = new YmnMeasureParser();
    let previousMeasure: YmnMeasure;
    if (staff.previous !== undefined) {
      previousMeasure = staff.previous.children[staff.previous.children.length - 1];
    }

    const measuresString = staffString.split(YmnScoreNotation.separators.measure);
    measuresString.forEach(measureString => {
      // Do not treat empty measures
      if (measureString === '') {
        return true;
      }
      const measure = new YmnMeasure();

      // Add shape
      staff.shape.add(measure.shape);

      // Set links
      measure.parent = staff;
      if (previousMeasure !== undefined) {
        previousMeasure.next = measure;
        measure.previous = previousMeasure;
      }
      previousMeasure = measure;

      // Parse content
      measureParser.parse(measureString, measure);
      staff.children.push(measure);
    });
  }
}
