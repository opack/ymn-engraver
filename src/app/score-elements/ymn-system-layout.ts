import { YmnSystem } from './ymn-system';
import { YmnMeasure } from './ymn-measure';
import { YmnMeasureLayout } from './ymn-measure-layout';
import { YmnStaffLayout } from './ymn-staff-layout';
import { ShapeConfig } from './shape-constants';

export class YmnSystemLayout {
  public layout(system: YmnSystem, initialOffset: number): number {
    if (system.children.length > 0) {
      this.layoutMeasures(system);
      this.layoutStaves(system);
    }

    system.shape.y(initialOffset);
    system.shape.updateSize();
    return system.shape.y() + system.shape.height() + ShapeConfig.system.bottomSpacing;
  }

  private layoutStaves(system: YmnSystem) {
    let yOffset = 0;
    system.children.forEach(staff => {
      const staffLayout = new YmnStaffLayout();
      yOffset = staffLayout.layout(staff, yOffset);
    });
  }

  private layoutMeasures(system: YmnSystem) {
    // Assumes that each staff has the same number of measures
    const nbMeasures = system.children[0].children.length;

    let xOffset = 0;
    const measures: Array<YmnMeasure> = [];
    for (let curMeasure = 0; curMeasure < nbMeasures; curMeasure++) {
      // Get all measures at that position in the system across staves
      measures.length = 0;
      system.children.forEach(staff => {
        measures.push(staff.children[curMeasure]);
      });

       // Layout the measures
      const measureLayout = new YmnMeasureLayout();
      xOffset = measureLayout.layout(measures, xOffset);
    }

    // Update the system size
    system.children.forEach(staff => {
      staff.shape.upperLine.width(xOffset); // TODO : peut-être qu'il faut plutôt modifier le point end de la ligne
      staff.shape.lowerLine.width(xOffset);
    });
  }
}
