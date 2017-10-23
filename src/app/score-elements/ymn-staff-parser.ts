import { YmnStaff } from './ymn-staff';
import { YmnMeasure } from './ymn-measure';
import { YmnMeasureParser } from './ymn-measure-parser';

export class YmnStaffParser {
  public parse(staffString: string, staff: YmnStaff): void {
    const measureParser = new YmnMeasureParser();
    let previousMeasure: YmnMeasure;

    const measuresString = staffString.split('|');
    measuresString.forEach(measureString => {
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
