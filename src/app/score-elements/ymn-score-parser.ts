import { YmnScore } from './ymn-score';
import { YmnSystem } from './ymn-system';
import { YmnSystemParser } from './ymn-system-parser';
import { SYSTEM_INDICATION_REGEXP } from './score-constants';

export class YmnScoreParser {
  public parse(scoreString: string, score: YmnScore): void {
    SYSTEM_INDICATION_REGEXP.lastIndex = 0;
    let matched = SYSTEM_INDICATION_REGEXP.exec(scoreString);
    if (matched === null) {
      alert('No system detected. Remember to enclose your systems with curly braces "{...}".');
      return;
    }

    const systemsStrings: Array<string> = [];
    do {
      systemsStrings.push(matched[1]);
      matched = SYSTEM_INDICATION_REGEXP.exec(scoreString);
    }
    while (matched !== null);

    this.parseSystems(systemsStrings, score);

    score.shape.update(score.title, score.author, score.tempo);
  }

  private parseSystems(systemsStrings: string[], score: YmnScore): void {
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
  }

}
