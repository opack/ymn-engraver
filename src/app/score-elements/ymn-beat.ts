import { YmnMeasure } from './ymn-measure';
import { YmnBeatShape } from './ymn-beat-shape';
import { YmnChord } from './ymn-chord';

export class YmnBeat {
  public previous: YmnBeat;
  public next: YmnBeat;
  public parent: YmnMeasure;

  public children: Array<YmnChord> = [];
  public shape: YmnBeatShape = new YmnBeatShape();
}
