import * as Konva from 'konva';
import { ShapeConfig } from './shape-constants';

export class YmnNoteShape extends Konva.Text {
  constructor(pitch: string) {
    super({
      width: ShapeConfig.note.width,
      text: pitch,
      fontSize: ShapeConfig.note.fontSize,
      fontFamily: ShapeConfig.note.fontFamily,
      align: 'center'
    });
  }
}