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
      if (previousStaff !== undefined) {
        previousStaff.next = staff;
        staff.previous = previousStaff;
      }
      previousStaff = staff;

      // Parse content
      staffParser.parse(staffString, staff);
      system.children.push(staff);
    });
  }
}
