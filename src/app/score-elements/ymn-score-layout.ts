import { YmnScore } from './ymn-score';
import { YmnSystemLayout } from './ymn-system-layout';
import { ShapeConfig } from './shape-constants';
import { YmnScoreElementsBank } from './ymn-score-elements-bank';

/**
 * Ensures that the children in one score are correcly laid out one to another
 */
export class YmnScoreLayout {
    public layout(score: YmnScore): void {
        // Layout score information
        score.shape.title.position({
            x: (ShapeConfig.score.width - score.shape.title.getClientRect().width) / 2,
            y: ShapeConfig.score.title.topMargin
        });
        score.shape.author.position({
            x: (ShapeConfig.score.width - score.shape.author.getWidth()) / 2,
            y: score.shape.title.y() + score.shape.title.getHeight() + ShapeConfig.score.title.bottomSpacing
        });
        score.shape.tempo.position({
            x: ShapeConfig.score.tempo.leftPosition,
            y: score.shape.author.y() + score.shape.author.getHeight()
        });

        let yOffset = score.shape.tempo.y() + ShapeConfig.score.tempo.bottomSpacing;
        score.children.forEach(system => {
            const systemLayout = new YmnSystemLayout();
            yOffset = systemLayout.layout(system, yOffset);
        });
    }

    /**
     * 
     */
    private alignScoreElements(): void {
        let xOffset = 0;
        YmnScoreElementsBank.getInstance().beats.forEach(beatsAtAPosition => {
            // Compute beat max width
            let maxWidth = 0;
            beatsAtAPosition.forEach(beat => {
                const beatWidth = beat.shape.getClientRect().width;
                if (beatWidth > maxWidth) {
                    maxWidth = beatWidth;
                }
            });

            // Align each element
            beatsAtAPosition.forEach(beat => {
                beat.shape.x(xOffset);
                beat.shape.updateWidth();
            });

            // Offset next children
            xOffset += maxWidth;
        });

        xOffset = 0;
        YmnScoreElementsBank.getInstance().measures.forEach(measuresAtAPosition => {
            let measureWidth = 0;
            const firstMeasureAtPosition = measuresAtAPosition[0];
            if (firstMeasureAtPosition.isOctaveMeasure) {
                measureWidth = firstMeasureAtPosition.shape.octave.getClientRect().width;
            } else {
                // As all beats are aligned, each measure should have the same width
                const firstBeatLeft = measuresAtAPosition[0].children[0].shape.x();
                const lastBeat = measuresAtAPosition[0].children[measuresAtAPosition[0].children.length - 1];
                const lastBeatRight = lastBeat.shape.x() + lastBeat.shape.getClientRect().width;
                measureWidth = lastBeatRight - firstBeatLeft;
            }

            measuresAtAPosition.forEach(measure => {
                measure.shape.x(xOffset);
                measure.shape.updateWidth();
            });

            // Offset next children
            xOffset += measureWidth;
        });
    }

    /**
     * Align the elements at the same level across containers.
     * Assumes that each container has the same number of elements.
     * @param score 
     */
    private alignChildren(parents: any[]) {
        if (parents[0].children === undefined) {
            return;
        }

        let maxWidth = 0;
        let xOffset = 0;
        const nbChildren = parents[0].children.length;
        for (let curChild = 0; curChild < nbChildren; curChild++) {
            // Compute element max width
            parents.forEach(parent => {
                const childWidth = parent.children[curChild].shape.getClientRect().width;
                if (childWidth > maxWidth) {
                    maxWidth = childWidth;
                }
            });

            const alignedChildren: Array<any> = [];

            // Align each element
            parents.forEach(parent => {
                parent.children[curChild].shape.x(xOffset);
                parent.children[curChild].shape.updateWidth(maxWidth);

                alignedChildren.push( parent.children[curChild]);
            });

            // Align inside each aligned element
            this.alignChildren(alignedChildren);

            // Offset next children
            xOffset += maxWidth;
        }
    }

    /*private alignChildren(score: YmnScore) {
        let maxWidth = 0;
        let xOffset = 0;
        const nbChildren = score.children[0].children.length;
        for (let curChild = 0; curChild < nbChildren; curChild++) {
            // Compute measure max width
            score.children.forEach(child => {
                const childWidth = child.children[curChild].shape.getClientRect().width;
                if (childWidth > maxWidth) {
                    maxWidth = childWidth;
                }
            });
            // Align each measure
            score.children.forEach(line => {
                line.children[curChild].shape.x(xOffset);
                line.children[curChild].shape.updateWidth(maxWidth);

                // Align beats inside

            });
            // Offset next children
            xOffset += maxWidth;
        }
    }*/
}