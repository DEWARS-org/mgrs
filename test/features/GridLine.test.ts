import { expect } from "@std/expect";
import { Point } from "@ngageoint/grid-js/features/Point";
import { GridLine } from "../../lib/features/GridLine.ts";
import { GridType } from "../../lib/grid/GridType.ts";

Deno.test("test copy", () => {
  const point1 = Point.point(0, 0);
  const point2 = Point.point(1, 1);
  const gridLine = new GridLine(GridLine.line(point1, point2));
  gridLine.setGridType(GridType.Kilometer);

  const gridLineCopy = gridLine.copy();
  expect(gridLineCopy.getGridType()).toEqual(gridLine.getGridType());
  expect(gridLineCopy.numPoints()).toEqual(gridLineCopy.numPoints());
  expect(gridLineCopy.equals(gridLine)).toBe(true);
});

Deno.test("test create from line", () => {
  const point1 = Point.point(0, 0);
  const point2 = Point.point(1, 1);
  const gridType = GridType.Kilometer;
  const gridLine = GridLine.lineFromPoints(
    point1,
    point2,
    GridType.Kilometer,
  );
  expect(gridLine.numPoints()).toEqual(2);
  expect(gridLine.getGridType()).toEqual(gridType);
});
