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
    if (ShapeConfig.staff.continuationNotesLine.isCurvy) {
      longNotesList.forEach(longNote => {
        this.drawQuadraticLine(longNote.firstNoteShape, longNote.lastNoteShape);
      });
    } else {
      longNotesList.forEach(longNote => {
        this.drawStraightLine(longNote.staffShape, longNote.firstNoteShape, longNote.lastNoteShape);
      });
    }
    // Ensure that continuation lines will be drawn on top of everything else
    this.continuationLines.setZIndex(100);
  }

  private drawStraightLine(staff: Konva.Node, from: Konva.Node, to: Konva.Node) {
    //const staffPosition = staff.getAbsolutePosition(); // Only needed if the lines go back to the staff as their position would then not be absolute
    const fromPosition = from.getAbsolutePosition();
    const toPosition =  to.getAbsolutePosition();

    this.add(new Konva.Line({
      points: [
        fromPosition.x /*- staffPosition.x*/ + from.width() - ShapeConfig.staff.continuationNotesLine.firstNoteInnerMargin, fromPosition.y /*- staffPosition.y*/ + to.height() / 2 - ShapeConfig.stage.yOffset,
        toPosition.x /*- staffPosition.x*/ + to.width() / 2, toPosition.y /*- staffPosition.y*/ + to.height() / 2 - ShapeConfig.stage.yOffset
      ],
      stroke: ShapeConfig.staff.continuationNotesLine.stroke,
      strokeWidth: ShapeConfig.staff.continuationNotesLine.strokeWidth,
      dash: ShapeConfig.staff.continuationNotesLine.dash
    }));
  }

  private drawQuadraticLine(from: Konva.Node, to: Konva.Node) {
    const fromPosition = from.getAbsolutePosition();
    const toPosition =  to.getAbsolutePosition();
    const quad = {
      start: {
        x: fromPosition.x + from.width() - ShapeConfig.staff.continuationNotesLine.firstNoteInnerMargin,
        y: fromPosition.y + from.height() / 2
      },
      control: {
        // Control will be defined just after start and end have been defined for more clarity
        x: 0,
        y: 0
      },
      end: {
        x: toPosition.x +  to.width() / 2,
        y: toPosition.y +  to.height() / 2}
    };
    quad.control = {
      x: (quad.end.x + quad.start.x) / 2,
      y: quad.start.y - ShapeConfig.staff.continuationNotesLine.curveHeight
    };

    const continuationLine = new Konva.Shape({
      stroke: ShapeConfig.staff.continuationNotesLine.stroke,
      strokeWidth: ShapeConfig.staff.continuationNotesLine.strokeWidth,
      lineCap: 'round',
      sceneFunc: function(context) {
        context.beginPath();
        context.moveTo(quad.start.x, quad.start.y);
        context.quadraticCurveTo(quad.control.x, quad.control.y, quad.end.x, quad.end.y);
        context.strokeShape(this);
      }
    });
    this.continuationLines.add(continuationLine);
  }
}
