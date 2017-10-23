import * as Konva from 'konva';
import { ShapeConfig } from './shape-constants';

export class YmnNoteShape extends Konva.Group {
  public text: Konva.Text;
  public circle: Konva.Circle;

  constructor() {
    super();
    this.text = new Konva.Text({
      width: ShapeConfig.note.width,
      text: ' ',
      fontSize: ShapeConfig.note.text.fontSize,
      fontFamily: ShapeConfig.note.text.fontFamily,
      align: 'center'
    });
    this.add(this.text);

    // Center the circle on the text
    this.circle = new Konva.Circle({
      radius: ShapeConfig.note.circle.radius,
      fill: ShapeConfig.note.circle.color,
      strokeEnabled: false
    });
    this.add(this.circle);
  }

  public update(pitch: string) {
    const isContinuationPitch = pitch === '*';

    this.text.text(pitch);
    this.text.visible(!isContinuationPitch);

    this.circle.visible(isContinuationPitch);
    // Center the circle on the text
    this.circle.position({
      x: this.text.width() / 2,
      y: this.text.height() / 2
    });
  }

  public updateSize() {
    this.width(this.getClientRect().width);
    this.height(this.getClientRect().height);
  }
}