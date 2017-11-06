import { YmnBeat } from './ymn-beat';
import { YmnChordLayout } from './ymn-chord-layout';
import { YmnChord } from './ymn-chord';

/**
 * Ensures that the notes in one chord are correcly laid out one to another
 */
export class YmnBeatLayout {
/**
   * Layout all beats at a given position in the measure across staves
   * @param beats
   * @param initialOffset
   * @return the new offset in order to layout next measures right after
   */
  public layout(beats: Array<YmnBeat>, initialOffset: number): number {
      // Count the maximum number of chords
      let maxNbChords = 0;
      beats.forEach(beat => {
        if (beat.children.length > maxNbChords) {
          maxNbChords = beat.children.length;
        }
      });

      let xOffset = 0;
      const chords: Array<YmnChord> = [];
      for (let curChord = 0; curChord < maxNbChords; curChord++) {
        // Get all chords at that position in the system across measures/staves
        chords.length = 0;
        beats.forEach(beat => {
          if (curChord < beat.children.length) {
            chords.push(beat.children[curChord]);
          }
        });

        // Layout the chords
        const chordLayout = new YmnChordLayout();
        xOffset = chordLayout.layout(chords, xOffset);
      }

      // Update the beats position and size
      beats.forEach(beat => {
        // Only show the beat separator if there is another beat after
        beat.shape.separator.visible(beat.next !== undefined);
        beat.shape.separator.x(xOffset);

        beat.shape.x(initialOffset);
        beat.shape.updateWidth();
      });

      // Next beat position will be at the right of any of the beats at this position
      return beats[0].shape.x() + xOffset;
  }
}
