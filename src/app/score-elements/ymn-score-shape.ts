import * as Konva from 'konva';
import { ShapeConfig } from './shape-constants';

export class YmnScoreShape extends Konva.Layer {
    public title: Konva.Text;
    public author: Konva.Text;
    public tempo: Konva.Text;

    constructor(title, author, tempo) {
        super();
        
        this.title = new Konva.Text ({
            text: title,
            fontSize: ShapeConfig.score.title.fontSize,
            fontFamily: ShapeConfig.score.title.fontFamily,
            align: 'center'
        });
        this.add(this.title);

        this.author = new Konva.Text ({
            text: author,
            fontSize: ShapeConfig.score.author.fontSize,
            fontFamily: ShapeConfig.score.author.fontFamily,
            align: 'center'
        });
        this.add(this.author);

        this.tempo = new Konva.Text ({
            text: tempo,
            fontSize: ShapeConfig.score.tempo.fontSize,
            fontFamily: ShapeConfig.score.tempo.fontFamily,
            align: 'center'
        });
        this.add(this.tempo);
    }
}