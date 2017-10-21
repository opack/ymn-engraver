import { YmnScoreShape } from './ymn-score-shape';
import { YmnScoreLayout } from './ymn-score-layout';
import { YmnLine } from './ymn-line';

export class YmnScore {
  public lines: Array<YmnLine> = [];
  public shape: YmnScoreShape;

  constructor(
    public title: string,
    public author: string,
    public tempo: number
  ) {}

  public parse(scoreString: string): void {
    let previousLine: YmnLine;
    const linesStrings = scoreString.split('\n');

    linesStrings.forEach(lineString => {
      const line = new YmnLine();

      // Set links
      line.score = this;
      if (previousLine !== undefined) {
        previousLine.next = line;
        line.previous = previousLine;
      }
      previousLine = line;

      // Parse content
      line.parse(lineString);
      this.lines.push(line);
    });

    this.shape = new YmnScoreShape(this.title, this.author, this.tempo);
  }

  public layout() {
    const scoreLayout = YmnScoreLayout.getInstance();
    scoreLayout.layout(this);
  }
}
