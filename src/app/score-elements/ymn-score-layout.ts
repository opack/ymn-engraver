import { YmnScore } from './ymn-score';
import { YmnLineLayout } from './ymn-line-layout';
import { ShapeConfig } from './shape-constants';


/**
 * Ensures that the lines in one score are correcly laid out one to another
 */
export class YmnScoreLayout {
    private static instance: YmnScoreLayout;
    public static getInstance(): YmnScoreLayout {
        if (this.instance === undefined) {
            this.instance = new YmnScoreLayout();
        }
        return this.instance;
    }

    private constructor() {
        // Singleton
    }

    public layout(score: YmnScore): void {
        // Layout score information
        score.shape.title.position({
            x: (ShapeConfig.score.width - score.shape.title.getClientRect().width) / 2, // TODO : essayer getWidth() au lieu de getClientRect().width()
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

        // Layout all lines in this score
        let yOffset = score.shape.tempo.y() + score.shape.tempo.getHeight() + ShapeConfig.score.tempo.bottomSpacing;
        const lineLayout = YmnLineLayout.getInstance();
        score.lines.forEach(line => {
            lineLayout.layout(line);

            score.shape.add(line.shape);

            line.shape.y(yOffset);
            yOffset += line.shape.getClientRect().height;
        });
    }
}