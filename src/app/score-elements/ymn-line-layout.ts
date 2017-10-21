import { YmnLine } from './ymn-line';
import { YmnMeasureLayout } from './ymn-measure-layout';

/**
 * Ensures that the measures in one line are correcly laid out one to another
 */
export class YmnLineLayout {
    private static instance: YmnLineLayout;
    public static getInstance(): YmnLineLayout {
        if (this.instance === undefined) {
            this.instance = new YmnLineLayout();
        }
        return this.instance;
    }

    private constructor() {
        // Singleton
    }

    public layout(line: YmnLine): void {
        // Layout all measures in this line
        let xOffset = 0;
        const measureLayout = YmnMeasureLayout.getInstance();
        line.measures.forEach(measure => {
            measureLayout.layout(measure);

            line.shape.add(measure.shape);

            measure.shape.x(xOffset);
            xOffset += measure.shape.getClientRect().width;
        });

        // Only show the lower line if there is no other line after
        line.shape.lowerLine.visible(line.next === undefined);
    }
}