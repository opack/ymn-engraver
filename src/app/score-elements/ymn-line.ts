import { YmnSystem } from './ymn-system';
import { YmnLineShape } from './ymn-line-shape';
import { YmnMeasure } from './ymn-measure';

export class YmnLine {
  public previous: YmnLine;
  public next: YmnLine;
  public parent: YmnSystem;

  public children: Array<YmnMeasure> = [];
  public shape: YmnLineShape = new YmnLineShape();

  public measureCount = 0;
  public beatCount = 0;
}
