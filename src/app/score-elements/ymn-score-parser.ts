import { YmnScore } from './ymn-score';
import { YmnSystem } from './ymn-system';
import { YmnSystemParser } from './ymn-system-parser';
import { SYSTEM_INDICATION_REGEXP, YmnScoreNotation } from './score-constants';

export class YmnScoreParser {
  public parse(scoreString: string, score: YmnScore): void {

    const systemsStrings = scoreString.split(YmnScoreNotation.separators.system);

    const systemParser = new YmnSystemParser();

    let previousSystem: YmnSystem;
    systemsStrings.forEach(systemString => {
      const system = new YmnSystem();

      // Add shape
      score.shape.add(system.shape);

      // Set links
      system.parent = score;
      if (previousSystem !== undefined) {
        previousSystem.next = system;
        system.previous = previousSystem;
      }
      previousSystem = system;

      // Parse content
      systemParser.parse(systemString, system);
      score.children.push(system);
    });

    score.shape.update(score.title, score.author, score.tempo);
  }
}
