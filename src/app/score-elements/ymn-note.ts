import { YmnChord } from './ymn-chord';
import { YmnNoteShape } from './ymn-note-shape';

export class YmnNote {
  public previous: YmnNote;
  public next: YmnNote;
  public parent: YmnChord;

  public pitch: string;
  public isContinuationNote: boolean;
  public shape: YmnNoteShape = new YmnNoteShape();
}
