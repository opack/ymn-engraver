import * as Konva from 'konva';
import { ShapeConfig } from './shape-constants';

export class YmnNoteShape extends Konva.Text {
  constructor() {
    super({
      width: ShapeConfig.note.width,
      text: ' ',
      fontSize: ShapeConfig.note.fontSize,
      fontFamily: ShapeConfig.note.fontFamily,
      align: 'center'
    });
  }

  public update(pitch: string) {
    this.text(pitch);
  }

  public updateWidth(width: number) {
    this.width(width);
  }
}