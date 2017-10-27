import { YmnScore } from './ymn-score';
import { YmnSystemLayout } from './ymn-system-layout';
import { ShapeConfig } from './shape-constants';
import { YmnLongNote } from './ymn-long-note';

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
    score.shape.leftTempoSeparator.position({
      x: ShapeConfig.score.tempo.leftPosition,
      y: score.shape.author.y() + score.shape.author.height()
    });
    score.shape.tempo.position({
      x: score.shape.leftTempoSeparator.x() + score.shape.leftTempoSeparator.width() + 5,
      y: score.shape.leftTempoSeparator.y() + score.shape.leftTempoSeparator.height() / 2 - score.shape.tempo.height() / 2
    });
    score.shape.rightTempoSeparator.position({
      x: score.shape.tempo.x() + score.shape.tempo.width() + 5,
      y: score.shape.leftTempoSeparator.y()
    });

    let yOffset = score.shape.leftTempoSeparator.y() + score.shape.leftTempoSeparator.height() + ShapeConfig.score.tempo.bottomSpacing;
    score.children.forEach(system => {
      const systemLayout = new YmnSystemLayout();
      yOffset = systemLayout.layout(system, yOffset);
    });

    // Search long notes to draw continuation lines
    const longNotes: Array<YmnLongNote> = [];
    score.children.forEach(system => {
      system.children.forEach(staff => {
        staff.searchLongNotes().forEach(longNote => {
          longNotes.push(longNote);
        });
      });
    });
    score.shape.drawContinuationLines(longNotes);
  }
}
