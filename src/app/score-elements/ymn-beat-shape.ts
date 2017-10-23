import * as Konva from 'konva';
import { ShapeConfig } from './shape-constants';

export class YmnBeatShape extends Konva.Group {
    public separator: Konva.Line;

    constructor() {
        super();
        this.separator = new Konva.Line({
            points: [
                0, 0,
                0, ShapeConfig.staff.defaultHeight],
            stroke: ShapeConfig.beat.stroke,
            strokeWidth: ShapeConfig.beat.strokeWidth,
            dash: ShapeConfig.beat.dash
        });
        this.add(this.separator);
    }

    public updateWidth(): void {
        this.width(this.getClientRect().width);
    }
}