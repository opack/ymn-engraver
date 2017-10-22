import { YmnScore } from './ymn-score';
import { YmnSystemShape } from './ymn-system-shape';
import { YmnLine } from './ymn-line';

export class YmnSystem {
  public previous: YmnSystem;
  public next: YmnSystem;
  public parent: YmnScore;
  public children: Array<YmnLine> = [];

  public shape: YmnSystemShape = new YmnSystemShape();
}
