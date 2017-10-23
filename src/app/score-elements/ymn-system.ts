import { YmnScore } from './ymn-score';
import { YmnSystemShape } from './ymn-system-shape';
import { YmnStaff } from './ymn-staff';

export class YmnSystem {
  public previous: YmnSystem;
  public next: YmnSystem;
  public parent: YmnScore;
  public children: Array<YmnStaff> = [];

  public shape: YmnSystemShape = new YmnSystemShape();
}
