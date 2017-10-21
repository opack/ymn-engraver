
import { YmnChord } from './ymn-chord';

/**
 * Ensures that the notes in one chord are correcly laid out one to another
 */
export class YmnChordLayout {
    private static instance: YmnChordLayout;
    public static getInstance(): YmnChordLayout {
        if (this.instance === undefined) {
            this.instance = new YmnChordLayout();
        }
        return this.instance;
    }

    private constructor() {
        // Singleton
    }

    public layout(chord: YmnChord): void {
        let yOffset = 0;
        chord.notes.forEach(note => {
            chord.shape.add(note.shape);

            note.shape.y(yOffset);
            yOffset += note.shape.getClientRect().height;
        });
    }
}