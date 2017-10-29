import * as Konva from 'konva';
import { ShapeConfig } from './shape-constants';
import { YmnLongNote } from './ymn-long-note';

export class YmnScoreShape extends Konva.Layer {
  public title: Konva.Text;
  public author: Konva.Text;
  public tempo: Konva.Text;
  public leftTempoSeparator: Konva.Line;
  public rightTempoSeparator: Konva.Line;

  public continuationLines: Konva.Group;

  constructor() {
    super();

    this.title = new Konva.Text ({
      text: 'Title',
      fontSize: ShapeConfig.score.title.fontSize,
      fontFamily: ShapeConfig.score.title.fontFamily,
      align: 'center'
    });
    this.add(this.title);

    this.author = new Konva.Text ({
      text: 'Author',
      fontSize: ShapeConfig.score.author.fontSize,
      fontFamily: ShapeConfig.score.author.fontFamily,
      align: 'center'
    });
    this.add(this.author);

    this.tempo = new Konva.Text ({
      text: 'Tempo',
      fontSize: ShapeConfig.score.tempo.fontSize,
      fontFamily: ShapeConfig.score.tempo.fontFamily,
      align: 'center'
    });
    this.add(this.tempo);

    this.leftTempoSeparator = new Konva.Line({
      points: [
        0, 0,
        0, ShapeConfig.staff.defaultHeight],
      stroke: ShapeConfig.beat.stroke,
      strokeWidth: ShapeConfig.beat.strokeWidth,
      dash: ShapeConfig.beat.dash
    });
    this.add(this.leftTempoSeparator);

    this.rightTempoSeparator = <Konva.Line>this.leftTempoSeparator.clone();
    this.add(this.rightTempoSeparator);

    this.continuationLines = new Konva.Group();
    this.add(this.continuationLines);
  }

  public update(title: string, author: string, tempo: number) {
    this.title.text(title);
    this.author.text(author);
    this.tempo.text('' + tempo);
  }

  public drawContinuationLines(longNotesList: Array<YmnLongNote>): void {
    longNotesList.forEach(longNote => {
      const fromPosition = longNote.firstNoteShape.getAbsolutePosition();
      const toPosition =  longNote.lastNoteShape.circle.getAbsolutePosition();

      const from = {
        // Start the line at the right of the note
        x: fromPosition.x + longNote.firstNoteShape.width() - ShapeConfig.staff.continuationNotesLine.firstNoteInnerMargin - ShapeConfig.stage.offset.x,
        y: toPosition.y - ShapeConfig.stage.offset.y
      };
      const to = {
        // "to" is a circle, and thus its position is its center
        x: toPosition.x - ShapeConfig.stage.offset.x,
        y: toPosition.y - ShapeConfig.stage.offset.y
      };

      if (ShapeConfig.staff.continuationNotesLine.isCurvy) {
        this.drawQuadraticLine(from, to);
      } else {
        this.drawStraightLine(from, to);
      }
    });
    // Ensure that continuation lines will be drawn on top of everything else
    this.continuationLines.setZIndex(100);
  }

  private drawStraightLine(from: Konva.Vector2d, to: Konva.Vector2d) {
    this.add(new Konva.Line({
      points: [
        from.x, from.y,
        to.x, to.y
      ],
      stroke: ShapeConfig.staff.continuationNotesLine.stroke,
      strokeWidth: ShapeConfig.staff.continuationNotesLine.strokeWidth,
      dash: ShapeConfig.staff.continuationNotesLine.dash
    }));
  }

  private drawQuadraticLine(from: Konva.Vector2d, to: Konva.Vector2d) {
    const control = {
      x: (to.x + from.x) / 2,
      y: from.y - ShapeConfig.staff.continuationNotesLine.curveHeight
    };

    const continuationLine = new Konva.Shape({
      stroke: ShapeConfig.staff.continuationNotesLine.stroke,
      strokeWidth: ShapeConfig.staff.continuationNotesLine.strokeWidth,
      lineCap: 'round',
      sceneFunc: function(context) {
        context.beginPath();
        context.moveTo(from.x, from.y);
        context.quadraticCurveTo(control.x, control.y, to.x, to.y);
        context.strokeShape(this);
      }
    });
    this.continuationLines.add(continuationLine);
  }
}
