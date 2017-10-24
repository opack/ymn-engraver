import { YmnSystem } from './ymn-system';
import { YmnStaffShape } from './ymn-staff-shape';
import { YmnMeasure } from './ymn-measure';
import { YmnChord } from './ymn-chord';
import { YmnLongNote } from './ymn-long-note';

export class YmnStaff {
  public previous: YmnStaff;
  public next: YmnStaff;
  public parent: YmnSystem;

  public children: Array<YmnMeasure> = [];
  public shape: YmnStaffShape = new YmnStaffShape();

  public measureCount = 0;
  public beatCount = 0;

  /**
   * Search for notes that last more than a beat and the note they last to
   */
  public searchLongNotes(): Array<YmnLongNote> {
    // If not more than 1 measure, then there are no notes because the first
    // measure is the octave measure
    if (this.children.length < 2) {
      return;
    }

    const firstMeasureWithBeats = this.children[1];
    const firstBeat = firstMeasureWithBeats.children[0];
    const firstChord = firstBeat.children[0];

    const longNotesList: Array<YmnLongNote> = [];
    
    let longChord: YmnChord;
    let curChord = firstChord;
    do {
      if (!curChord.children[0].isContinuationNote) {
        longChord = curChord;
        while (curChord.next !== undefined && curChord.next.children[0].isContinuationNote) {
          curChord = curChord.next;
        }

        // If the curChord is a continuation cord, then we add it to the list
        if (curChord.children[0].isContinuationNote) {
          // Here curChord.children[0] is a note which has no next or has a next that is not
          // a continuation note. Thus, it is the last continuation chord for longChord.
          longNotesList.push({
            staffShape: this.shape,
            firstNoteShape: longChord.children[0].shape,
            lastNoteShape: curChord.children[0].shape
          });
        }
      }

      // Continue to search next long note
      curChord = curChord.next;
    }
    while (curChord !== undefined);
    return longNotesList;
    //TODO delete this.shape.drawContinuationLines(longNotesList);
  }
}
