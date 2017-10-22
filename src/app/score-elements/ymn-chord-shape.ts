import * as Konva from 'konva';

export class YmnChordShape extends Konva.Group {
    public updateSize() {
        this.width(this.getClientRect().width);
        this.height(this.getClientRect().height);
    }
}