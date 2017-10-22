import { YmnScore } from './ymn-score';
import { YmnSystemLayout } from './ymn-system-layout';
import { ShapeConfig } from './shape-constants';

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
            x: (ShapeConfig.score.width - score.shape.author.width()) / 2,
            y: score.shape.title.y() + score.shape.title.height() + ShapeConfig.score.title.bottomSpacing
        });
        score.shape.tempo.position({
            x: ShapeConfig.score.tempo.leftPosition,
            y: score.shape.author.y() + score.shape.author.height()
        });

        let yOffset = score.shape.tempo.y() + score.shape.tempo.height() + ShapeConfig.score.tempo.bottomSpacing;
        score.children.forEach(system => {
            const systemLayout = new YmnSystemLayout();
            yOffset = systemLayout.layout(system, yOffset);
        });
    }
}