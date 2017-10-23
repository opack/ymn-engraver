import * as Konva from 'konva';
import { ShapeConfig } from './shape-constants';

export class YmnStaffShape extends Konva.Group {
    public leftLine: Konva.Line;
    public upperLine: Konva.Line;
    public lowerLine: Konva.Line;

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

        this.add(new Konva.Line({
            points: [
                0, 30,
                50, 20,
                100, 30
            ],
            tension: 1,
            stroke: ShapeConfig.staff.stroke,
            strokeWidth: ShapeConfig.staff.strokeWidth
        }));
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
}