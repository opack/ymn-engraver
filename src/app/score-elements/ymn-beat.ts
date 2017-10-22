import { YmnMeasure } from './ymn-measure';
import { YmnBeatShape } from './ymn-beat-shape';
import { YmnChord } from './ymn-chord';

export class YmnBeat {
  public previous: YmnBeat;
  public next: YmnBeat;
  public parent: YmnMeasure;

  public children: Array<YmnChord> = [];
  public shape: YmnBeatShape = new YmnBeatShape();

  public parse(beatString: string): void {
    let previousChord: YmnChord;
    const chordsString = beatString.split(' ');
    chordsString.forEach(chordString => {
      const chord = new YmnChord();

      // Add shape
      this.shape.add(chord.shape);

      // Set links
      chord.parent = this;
      if (previousChord !== undefined) {
        previousChord.next = chord;
        chord.previous = previousChord;
      }
      previousChord = chord;

      // Parse content
      chord.parse(chordString);
      this.children.push(chord);
    });
  }
}
