import { YmnBeat } from './ymn-beat';
import { YmnChordShape } from './ymn-chord-shape';
import { YmnNote } from './ymn-note';

export class YmnChord {
  public previous: YmnChord;
  public next: YmnChord;
  public parent: YmnBeat;

  public children: Array<YmnNote> = [];
  public shape: YmnChordShape = new YmnChordShape();
}
