import { YmnSystem } from './ymn-system';
import { YmnStaffShape } from './ymn-staff-shape';
import { YmnMeasure } from './ymn-measure';

export class YmnStaff {
  public previous: YmnStaff;
  public next: YmnStaff;
  public parent: YmnSystem;

  public children: Array<YmnMeasure> = [];
  public shape: YmnStaffShape = new YmnStaffShape();

  public measureCount = 0;
  public beatCount = 0;
}
