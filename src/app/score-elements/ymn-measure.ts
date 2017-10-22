import { YmnLine } from './ymn-line';
import { YmnMeasureShape } from './ymn-measure-shape';
import { YmnBeat } from './ymn-beat';

export class YmnMeasure {
  public previous: YmnMeasure;
  public next: YmnMeasure;
  public parent: YmnLine;

  public children: Array<YmnBeat> = [];
  public isOctaveMeasure: boolean;
  public octave: string;
  public shape: YmnMeasureShape = new YmnMeasureShape();
}
