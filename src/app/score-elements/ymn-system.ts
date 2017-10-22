import { YmnScore } from './ymn-score';
import { YmnSystemShape } from './ymn-system-shape';
import { YmnLine } from './ymn-line';

export class YmnSystem {
  public previous: YmnSystem;
  public next: YmnSystem;
  public parent: YmnScore;
  public children: Array<YmnLine> = [];

  public shape: YmnSystemShape = new YmnSystemShape();

  public parse(scoreString: string): void {
    let previousLine: YmnLine;
    const linesStrings = scoreString.split('\n');

    linesStrings.forEach(lineString => {
      const line = new YmnLine();

      // Add shape
      this.shape.add(line.shape);
      
      // Set links
      line.parent = this;
      if (previousLine !== undefined) {
        previousLine.next = line;
        line.previous = previousLine;
      }
      previousLine = line;

      // Parse content
      line.parse(lineString);
      this.children.push(line);
    });
  }
}
