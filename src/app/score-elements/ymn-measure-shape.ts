import * as Konva from 'konva';
import { ShapeConfig } from './shape-constants';

export class YmnMeasureShape extends Konva.Group {
    public octave: Konva.Text;
    public leftSeparator: Konva.Line;
    public rightSeparator: Konva.Line;

    constructor(octave: string) {
        super();

        this.leftSeparator = new Konva.Line({
            points: [
                0, 0,
                0, ShapeConfig.line.defaultHeight],
            stroke: ShapeConfig.measure.stroke,
            strokeWidth: ShapeConfig.measure.strokeWidth
        });
        this.add(this.leftSeparator);

        this.octave = new Konva.Text({
            width: ShapeConfig.measure.octaveWidth,
            text: octave,
            fontSize: ShapeConfig.measure.octaveFontSize,
            fontFamily: 'Calibri',
            align: 'center'
        });
        this.add(this.octave);

        this.rightSeparator = new Konva.Line({
            points: [
                0, 0,
                0, ShapeConfig.line.defaultHeight],
            stroke: ShapeConfig.measure.stroke,
            strokeWidth: ShapeConfig.measure.strokeWidth
        });
        this.add(this.rightSeparator);
    }
}