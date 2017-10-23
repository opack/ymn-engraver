import * as Konva from 'konva';
import { ShapeConfig } from './shape-constants';

export class YmnMeasureShape extends Konva.Group {
    public octave: Konva.Text;
    public separator: Konva.Line;

    constructor() {
        super();

        this.octave = new Konva.Text({
            width: ShapeConfig.measure.octaveWidth,
            text: '0',
            fontSize: ShapeConfig.measure.octaveFontSize,
            fontFamily: 'Calibri',
            align: 'center'
        });
        this.add(this.octave);

        this.separator = new Konva.Line({
            points: [
                0, 0,
                0, ShapeConfig.staff.defaultHeight],
            stroke: ShapeConfig.measure.stroke,
            strokeWidth: ShapeConfig.measure.strokeWidth
        });
        this.add(this.separator);
    }

    public update(octave: string): void {
        this.octave.text(octave);
    }

    public updateWidth(): void {
        this.width(this.getClientRect().width);
    }
}