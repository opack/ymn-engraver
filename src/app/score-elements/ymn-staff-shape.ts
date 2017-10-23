import * as Konva from 'konva';
import { ShapeConfig } from './shape-constants';
import { YmnNoteShape } from './ymn-note-shape';

export class YmnStaffShape extends Konva.Group {
    public leftLine: Konva.Line;
    public upperLine: Konva.Line;
    public lowerLine: Konva.Line;
    public continuationLines: Array<Konva.Line> = [];

    constructor() {
        super();

        this.leftLine = new Konva.Line({
            points: [
                0, 0,
                0, ShapeConfig.staff.defaultHeight],
            stroke: ShapeConfig.measure.stroke,
            strokeWidth: ShapeConfig.measure.strokeWidth
        });
        this.add(this.leftLine);

        this.upperLine = new Konva.Line({
            points: [
                0, 0,
                0, 0
            ],
            stroke: ShapeConfig.staff.stroke,
            strokeWidth: ShapeConfig.staff.strokeWidth
        });
        this.add(this.upperLine);
        
        this.lowerLine = new Konva.Line({
            points: [
                0, 0,
                0, 0
            ],
            stroke: ShapeConfig.staff.stroke,
            strokeWidth: ShapeConfig.staff.strokeWidth
        });
        this.add(this.lowerLine);
    }

    public setLinesLength(length: number): void {
        this.upperLine.points([
            0, 0,
            length, 0]);
        this.lowerLine.points([
            0, 0,
            length, 0]);
    }

    public updateHeight() {
        this.height(this.getClientRect().height);
    }

    public updateWidth() {
        this.width(this.getClientRect().width);
    }

    public drawContinuationLines(longNotesList: Array<{firstNoteShape: YmnNoteShape, lastNoteShape: YmnNoteShape}>): void {
        this.continuationLines.length = 0;
        const staffPosition = this.getAbsolutePosition();
        longNotesList.forEach(longNote => {
            const firstNotePosition = longNote.firstNoteShape.getAbsolutePosition();
            const lastNotePosition = longNote.lastNoteShape.getAbsolutePosition();

            this.add(new Konva.Line({
                points: [
                    firstNotePosition.x - staffPosition.x + longNote.firstNoteShape.width(), firstNotePosition.y - staffPosition.y + longNote.firstNoteShape.height() / 2,
                    lastNotePosition.x - staffPosition.x + longNote.lastNoteShape.width() / 2, lastNotePosition.y - staffPosition.y + longNote.lastNoteShape.height() / 2
                ],
                stroke: ShapeConfig.staff.continuationNotesLine.stroke,
                strokeWidth: ShapeConfig.staff.continuationNotesLine.strokeWidth
            }));
        });
    }
}