import * as Konva from 'konva';
import { ShapeConfig } from './shape-constants';

export class YmnLineShape extends Konva.Group {
    public lowerLine: Konva.Line;

    constructor() {
        super();

        const upperLine = new Konva.Line({
            points: [
                0, 0,
                ShapeConfig.score.width, 0
            ],
            stroke: ShapeConfig.line.stroke,
            strokeWidth: ShapeConfig.line.strokeWidth
        });
        this.add(upperLine);
        
        this.lowerLine = new Konva.Line({
            points: [
                0, ShapeConfig.line.defaultHeight,
                ShapeConfig.score.width, ShapeConfig.line.defaultHeight
            ],
            stroke: ShapeConfig.line.stroke,
            strokeWidth: ShapeConfig.line.strokeWidth
        });
        this.add(this.lowerLine);
    }
}