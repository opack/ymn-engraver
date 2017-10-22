import * as Konva from 'konva';
import { ShapeConfig } from './shape-constants';

export class YmnScoreShape extends Konva.Layer {
    public title: Konva.Text;
    public author: Konva.Text;
    public tempo: Konva.Text;

    constructor() {
        super();
        
        this.title = new Konva.Text ({
            text: 'Title',
            fontSize: ShapeConfig.score.title.fontSize,
            fontFamily: ShapeConfig.score.title.fontFamily,
            align: 'center'
        });
        this.add(this.title);

        this.author = new Konva.Text ({
            text: 'Author',
            fontSize: ShapeConfig.score.author.fontSize,
            fontFamily: ShapeConfig.score.author.fontFamily,
            align: 'center'
        });
        this.add(this.author);

        this.tempo = new Konva.Text ({
            text: 'Tempo',
            fontSize: ShapeConfig.score.tempo.fontSize,
            fontFamily: ShapeConfig.score.tempo.fontFamily,
            align: 'center'
        });
        this.add(this.tempo);
    }

    public update(title: string, author: string, tempo: number) {
        this.title.text(title);
        this.author.text(author);
        this.tempo.text('' + tempo);
    }
}