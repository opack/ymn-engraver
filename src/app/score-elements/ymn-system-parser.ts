import { YmnSystem } from './ymn-system';
import { YmnStaff } from './ymn-staff';
import { YmnStaffParser } from './ymn-staff-parser';

export class YmnSystemParser {
  public parse(systemString: string, system: YmnSystem): void {
    const staffParser = new YmnStaffParser();
    let previousStaff: YmnStaff;
    const stavesStrings = systemString.split('\n');

    stavesStrings.forEach(staffString => {
      // Do not treat empty staves
      if (staffString === '') {
        return;
      }
      
      const staff = new YmnStaff();

      // Add shape
      system.shape.add(staff.shape);
      
      // Set links
      staff.parent = system;
      /**
       * TODO : This is wrong : the previous Staff is not the previously parsed
       * but the staf in the previous system that has the same octave
       */
      /*if (previousStaff !== undefined) {
        previousStaff.next = staff;
        staff.previous = previousStaff;
      }
      previousStaff = staff;*/

      // Parse content
      staffParser.parse(staffString, staff);
      system.children.push(staff);
    });
  }
}
