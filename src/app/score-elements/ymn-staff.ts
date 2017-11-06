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

  public hasSystemSeparator = false;

  /**
   * Search for notes that last more than a beat and the note they last to
   */
  public searchLongNotes(): Array<YmnLongNote> {
    // If not more than 1 measure, then there are no notes because the first
    // measure is the octave measure
    if (this.children.length < 2) {
      return;
    }

    const longNotesList: Array<YmnLongNote> = [];

    let firstChord: YmnChord;
    let lastChord: YmnChord;
    let curChord = this.getFirstChord();
    do {
      for (let curNote = 0; curNote < curChord.children.length; curNote++) {
        if (!curChord.children[curNote].isContinuationNote) {
          firstChord = curChord;
          lastChord = curChord;
          while (lastChord.next !== undefined
          && lastChord.next.children[curNote] !== undefined
          && lastChord.next.children[curNote].isContinuationNote) {
            lastChord = lastChord.next;
          }

          // If the curChord is a continuation cord, then we add it to the list
          if (lastChord.children[curNote].isContinuationNote) {
            // Here curChord.children[curNote] is a note which has no next or has a next that is not
            // a continuation note. Thus, it is the last continuation chord for firstChord.
            longNotesList.push({
              staffShape: this.shape,
              firstNoteShape: firstChord.children[curNote].shape,
              lastNoteShape: lastChord.children[curNote].shape
            });
          }
        }
      }
      // if (!curChord.children[0].isContinuationNote) {
      //   firstChord = curChord;
      //   while (curChord.next !== undefined && curChord.next.children[0].isContinuationNote) {
      //     curChord = curChord.next;
      //   }
      //
      //   // If the curChord is a continuation cord, then we add it to the list
      //   if (curChord.children[0].isContinuationNote) {
      //     // Here curChord.children[0] is a note which has no next or has a next that is not
      //     // a continuation note. Thus, it is the last continuation chord for firstChord.
      //     longNotesList.push({
      //       staffShape: this.shape,
      //       firstNoteShape: firstChord.children[0].shape,
      //       lastNoteShape: curChord.children[0].shape
      //     });
      //   }
      // }

      // Continue to search next long note
      curChord = curChord.next;
    }
    while (curChord !== undefined);
    return longNotesList;
  }

  /**
   * Returns the first chord of the staff
   * @returns {YmnChord}
   */
  public getFirstChord(): YmnChord {
    const firstMeasureWithBeats = this.children[1];
    const firstBeat = firstMeasureWithBeats.children[0];
    return firstBeat.children[0];
  }
}
