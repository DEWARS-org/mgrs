import { expect } from "@std/expect";
import { Grid } from "../../lib/grid/Grid.ts";
import { GridType } from "../../lib/grid/GridType.ts";
import { ZoomGrids } from "../../lib/grid/ZoomGrids.ts";

Deno.test("test precision", () => {
  const zoomGrids = new ZoomGrids(5);
  expect(zoomGrids.getPrecision()).toBeUndefined;

  zoomGrids.addGrid(new Grid(GridType.HundredKilometer));
  zoomGrids.addGrid(new Grid(GridType.TenKilometer));
  zoomGrids.addGrid(new Grid(GridType.Meter));

  expect(zoomGrids.getPrecision()?.valueOf()).toEqual(
    GridType.Meter.valueOf(),
  );
});
