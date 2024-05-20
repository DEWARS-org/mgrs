import { test } from "@japa/runner";
import { Point } from "@ngageoint/grid-js";
import { GridLine } from "../../lib/features/GridLine.js";
import { GridType } from "../../lib/grid/GridType.js";

test.group("GridLine Tests", () => {
  test("test copy", ({ expect }) => {
    const point1 = Point.point(0, 0);
    const point2 = Point.point(1, 1);
    const gridLine = new GridLine(GridLine.line(point1, point2));
    gridLine.setGridType(GridType.KILOMETER);

    const gridLineCopy = gridLine.copy();
    expect(gridLineCopy.getGridType()).toEqual(gridLine.getGridType());
    expect(gridLineCopy.numPoints()).toEqual(gridLineCopy.numPoints());
    expect(gridLineCopy.equals(gridLine)).toBe(true);
  });

  test("test create from line", ({ expect }) => {
    const point1 = Point.point(0, 0);
    const point2 = Point.point(1, 1);
    const gridType = GridType.KILOMETER;
    const gridLine = GridLine.lineFromPoints(
      point1,
      point2,
      GridType.KILOMETER,
    );
    expect(gridLine.numPoints()).toEqual(2);
    expect(gridLine.getGridType()).toEqual(gridType);
  });
});
