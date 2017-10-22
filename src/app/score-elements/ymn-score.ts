import { YmnScoreShape } from './ymn-score-shape';
import { YmnScoreLayout } from './ymn-score-layout';
import { YmnSystem } from './ymn-system';

export class YmnScore {
  public children: Array<YmnSystem> = [];
  public shape: YmnScoreShape = new YmnScoreShape();

  constructor(
    public title: string,
    public author: string,
    public tempo: number
  ) {}

  public parse(scoreString: string): void {
    let previousSystem: YmnSystem;
    const systemsStrings = scoreString.split('#');

    systemsStrings.forEach(systemsString => {
      const system = new YmnSystem();

      // Add shape
      this.shape.add(system.shape);
      
      // Set links
      system.parent = this;
      if (previousSystem !== undefined) {
        previousSystem.next = system;
        system.previous = previousSystem;
      }
      previousSystem = system;

      // Parse content
      system.parse(systemsString);
      this.children.push(system);
    });

    this.shape.update(this.title, this.author, this.tempo);
  }

  public layout() {
    const scoreLayout = new YmnScoreLayout();
    scoreLayout.layout(this);
  }
}
