import { YmnSystem } from './ymn-system';
import { YmnLine } from './ymn-line';
import { YmnLineParser } from './ymn-line-parser';

export class YmnSystemParser {
  public parse(systemString: string, system: YmnSystem): void {
    const lineParser = new YmnLineParser();
    let previousLine: YmnLine;
    const linesStrings = systemString.split('\n');

    linesStrings.forEach(lineString => {
      // Do not treat empty lines
      if (lineString === '') {
        return;
      }
      
      const line = new YmnLine();

      // Add shape
      system.shape.add(line.shape);
      
      // Set links
      line.parent = system;
      if (previousLine !== undefined) {
        previousLine.next = line;
        line.previous = previousLine;
      }
      previousLine = line;

      // Parse content
      lineParser.parse(lineString, line);
      system.children.push(line);
    });
  }
}
