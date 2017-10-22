import * as Konva from 'konva';

export class YmnSystemShape extends Konva.Group {
    public updateSize() {
        this.width(this.getClientRect().width);
        this.height(this.getClientRect().height);
    }
}