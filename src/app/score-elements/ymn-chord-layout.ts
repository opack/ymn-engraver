
import { YmnChord } from './ymn-chord';
import { YmnNoteLayout } from './ymn-note-layout';

/**
 * Ensures that the notes in one chord are correcly laid out one to another
 */
export class YmnChordLayout {
    public layout(chords: Array<YmnChord>, initialOffset: number): number {
        // Layout each chord individually and record maxWidth
        let maxWidth = 0;
        chords.forEach(chord => {
            let yOffset = 0;
            chord.children.forEach(note => {
                const noteLayout = new YmnNoteLayout();
                yOffset = noteLayout.layout(note, yOffset); 
            });

            chord.shape.updateSize();
            if (chord.shape.width() > maxWidth) {
                maxWidth = chord.shape.width();
            }
        });

        // Center each chord
        /*const center = initialOffset + maxWidth / 2;
        chords.forEach(chord => {
            chord.shape.x(center - chord.shape.width() / 2);
        });*/
        chords.forEach(chord => {
            chord.shape.x(initialOffset);
        });

        return initialOffset + maxWidth;
    }
}