import { YmnMeasure } from './ymn-measure';
import { YmnBeatLayout } from './ymn-beat-layout';

/**
 * Ensures that the measures in one measure are correcly laid out one to another
 */
export class YmnMeasureLayout {
    private static instance: YmnMeasureLayout;
    public static getInstance(): YmnMeasureLayout {
        if (this.instance === undefined) {
            this.instance = new YmnMeasureLayout();
        }
        return this.instance;
    }

    private constructor() {
        // Singleton
    }

    public layout(measure: YmnMeasure): void {
        // Only show left bar if first measure
        measure.shape.leftSeparator.visible(measure.previous === undefined);

        // Only show the octave indication if needed
        measure.shape.octave.visible(measure.isOctaveMeasure);
        if (measure.isOctaveMeasure) {
            const octaveRect = measure.shape.octave.getClientRect();
            measure.shape.rightSeparator.x(octaveRect.x + octaveRect.width);
        } else {
            // Layout all beats in this measure
            let xOffset = 0;
            const beatLayout = YmnBeatLayout.getInstance();
            measure.beats.forEach(beat => {
                beatLayout.layout(beat);
    
                measure.shape.add(beat.shape);
    
                beat.shape.x(xOffset);
                xOffset += beat.shape.getClientRect().width;
            });
            measure.shape.rightSeparator.x(xOffset);
        }
    }
}