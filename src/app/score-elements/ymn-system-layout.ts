import { YmnSystem } from './ymn-system';
import { YmnMeasure } from './ymn-measure';
import { YmnMeasureLayout } from './ymn-measure-layout';

export class YmnSystemLayout {
  public layout(system: YmnSystem, initialOffset: number): number {
    this.layoutMeasures(system);
    this.layoutLines(system);

    system.shape.y(initialOffset);
    system.shape.updateSize();
    return system.shape.y() + system.shape.width();
  }

  private layoutLines(system: YmnSystem) {
    // Assumes each line's last measure ends at the same position,
    // which should be correct because layoutMeasures() made sure
    // that all measures are the same size
    const measuresOfFirstLine = system.children[0].children;
    const lastMeasure = measuresOfFirstLine[measuresOfFirstLine.length - 1];
    const lineLength = lastMeasure.shape.x() + lastMeasure.shape.width();

    // Layout all lines in this system
    let yOffset = 0;
    system.children.forEach(line => {
      line.shape.y(yOffset);
      line.shape.updateHeight();

      line.shape.setLinesLength(lineLength);

      line.shape.lowerLine.visible(line.next === undefined);
      line.shape.lowerLine.y(line.shape.height() - line.shape.lowerLine.height());

      yOffset += line.shape.height();
    });
  }

  private layoutMeasures(system: YmnSystem) {
    // Assumes that each line has the same number of measures
    const nbMeasures = system.children[0].children.length;

    let xOffset = 0;
    const measures: Array<YmnMeasure> = [];
    for (let curMeasure = 0; curMeasure < nbMeasures; curMeasure++) {
      // Get all measures at that position in the system across lines
      measures.length = 0;
      system.children.forEach(line => {
        measures.push(line.children[curMeasure]);
      });

       // Layout the measures
      const measureLayout = new YmnMeasureLayout();
      xOffset = measureLayout.layout(measures, xOffset);
    }

    // Update the system size
    system.children.forEach(line => {
      line.shape.upperLine.width(xOffset); // TODO : peut-être qu'il faut plutôt modifier le point end de la ligne
      line.shape.lowerLine.width(xOffset);
    });
  }
}
