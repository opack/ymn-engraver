import { YmnMeasure } from './ymn-measure';
import { YmnBeat } from './ymn-beat';
import { YmnBeatLayout } from './ymn-beat-layout';
import { ShapeConfig } from './shape-constants';

/**
 * Ensures that the measures in one measure are correcly laid out one to another
 */
export class YmnMeasureLayout {
    /**
     * Layout all measures at a given position across staves
     * @param measures 
     * @param initialOffset 
     * @return the new offset in order to layout next measures right after
     */
    public layout(measures: Array<YmnMeasure>, initialOffset: number): number {
        let xOffset = 0;
        if (measures[0].isOctaveMeasure) {
            let maxWidth = 0;
            measures.forEach(measure => {
                measure.shape.octave.x(initialOffset);
                if (measure.shape.octave.width() > maxWidth) {
                    maxWidth = measure.shape.octave.width();
                }
            });
            xOffset = maxWidth;
        } else {
            // Assumes that each measure has the same number of beats
            const nbBeats = measures[0].children.length;

            const beats: Array<YmnBeat> = [];
            for (let curBeat = 0; curBeat < nbBeats; curBeat++) {
            // Get all beats at that position in the system across measures/staves
            beats.length = 0;
            measures.forEach(measure => {
                beats.push(measure.children[curBeat]);
            });

            // Layout the beats
            const beatLayout = new YmnBeatLayout();
            xOffset = beatLayout.layout(beats, xOffset);
            }
        }

        // Update the measures position and size
        measures.forEach(measure => {
            measure.shape.x(initialOffset);
            measure.shape.octave.visible(measure.isOctaveMeasure);
            measure.shape.separator.x(xOffset);
            measure.shape.separator2.x(xOffset + ShapeConfig.measure.separatorSpace);
            measure.shape.updateWidth();
        });

        // Next measure position will be at the right of any of the measures at this position
        return measures[0].shape.x() + measures[0].shape.width();
    }
}