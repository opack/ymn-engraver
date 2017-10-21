import { YmnLine } from './ymn-line';

export class YmnScore {
  private lines: Array<YmnLine> = [];

  public parse(scoreString: string): void {
    let previousLine: YmnLine;
    const linesStrings = scoreString.split('\n');

    linesStrings.forEach(lineString => {
      const line = new YmnLine();

      // Set links
      line.music = this;
      if (previousLine !== undefined) {
        previousLine.next = line;
        line.previous = previousLine;
      }
      previousLine = line;

      // Parse content
      line.parse(lineString);
      this.lines.push(line);
    });
  }
}
