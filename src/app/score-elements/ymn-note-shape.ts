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
    
    this.text.text(isContinuationPitch ? ' ' : pitch);
    // Cannot hide the text withou changing the getClientRect().width of the note :(
    // which will cause the beat to have a wrong width
    //this.text.visible(!isContinuationPitch);

    this.circle.visible(isContinuationPitch);
    // Center the circle on the text
    this.circle.position({
      x: this.text.width() / 2,
      y: this.text.height() / 2
    });
  }

  public updateSize() {
    // Ensure that a note is at least ShapeConfig.note.width large
    this.width(Math.max(this.getClientRect().width, ShapeConfig.note.width));
    // The height of the note must not be less than the height of the text that
    // can be used to represent a pitch. This is important to ensure that 
    // continuation circles will not cause the chord notes to be too high,
    // and thus not aligned with the notes of the rest of the staff
    this.height(Math.max(this.getClientRect().height, this.text.height()));
  }
}