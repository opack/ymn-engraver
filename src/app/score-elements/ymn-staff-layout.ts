import { YmnStaff } from './ymn-staff';
import { ShapeConfig } from './shape-constants';

export class YmnStaffLayout {
  public layout(staff: YmnStaff, initialOffset: number): number {
    const lastMeasure = staff.children[staff.children.length - 1];
    const staffLength = lastMeasure.shape.x() + lastMeasure.shape.width();

    staff.shape.y(initialOffset);
    staff.shape.updateSize();

    staff.shape.setLinesLength(staffLength);

    staff.shape.upperLine.visible(staff.previous === undefined || !staff.previous.hasSystemSeparator);

    if (staff.hasSystemSeparator) {
      staff.shape.lowerLine.stroke(ShapeConfig.staff.systemSeparator.stroke);
      staff.shape.lowerLine.strokeWidth(ShapeConfig.staff.systemSeparator.strokeWidth);
    } else {
      staff.shape.lowerLine.stroke(ShapeConfig.staff.staffSeparator.stroke);
      staff.shape.lowerLine.strokeWidth(ShapeConfig.staff.staffSeparator.strokeWidth);
    }
    staff.shape.lowerLine.visible(staff.next === undefined || staff.hasSystemSeparator);
    staff.shape.lowerLine.y(staff.shape.height() - staff.shape.lowerLine.height());

    return staff.shape.y() + staff.shape.height();
  }
}
