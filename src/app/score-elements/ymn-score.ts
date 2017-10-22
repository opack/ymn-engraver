import { YmnScoreShape } from './ymn-score-shape';
import { YmnScoreLayout } from './ymn-score-layout';
import { YmnScoreParser } from './ymn-score-parser';
import { YmnSystem } from './ymn-system';

export class YmnScore {
  public children: Array<YmnSystem> = [];
  public shape: YmnScoreShape = new YmnScoreShape();

  constructor(
    public title: string,
    public author: string,
    public tempo: number
  ) {}

  public parse(scoreString: string) {
    const parser = new YmnScoreParser();
    parser.parse(scoreString, this);
  }

  public layout() {
    const scoreLayout = new YmnScoreLayout();
    scoreLayout.layout(this);
  }
}
