import { YmnBeat } from './ymn-beat';
import { YmnChordLayout } from './ymn-chord-layout';

/**
 * Ensures that the notes in one chord are correcly laid out one to another
 */
export class YmnBeatLayout {
    private static instance: YmnBeatLayout;
    public static getInstance(): YmnBeatLayout {
        if (this.instance === undefined) {
            this.instance = new YmnBeatLayout();
        }
        return this.instance;
    }

    private constructor() {
        // Singleton
    }

    public layout(beat: YmnBeat): void {
        // Layout all chords in this beat
        let xOffset = 0;
        const chordLayout = YmnChordLayout.getInstance();
        beat.chords.forEach(chord => {
            chordLayout.layout(chord);

            beat.shape.add(chord.shape);

            chord.shape.x(xOffset);
            xOffset += chord.shape.getClientRect().width;
        });

        // Only show the beat separator if there is another beat after
        beat.shape.separator.x(xOffset);
        beat.shape.separator.visible(beat.next !== undefined);
    }
}