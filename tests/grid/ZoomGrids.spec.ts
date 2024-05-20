import { test } from "@japa/runner";
import { Grid } from "../../lib/grid/Grid.js";
import { GridType } from "../../lib/grid/GridType.js";
import { ZoomGrids } from "../../lib/grid/ZoomGrids.js";

test.group("ZoomGrids Tests", () => {
  test("test precision", ({ expect }) => {
    const zoomGrids = new ZoomGrids(5);
    expect(zoomGrids.getPrecision()).toBeUndefined;

    zoomGrids.addGrid(new Grid(GridType.HUNDRED_KILOMETER));
    zoomGrids.addGrid(new Grid(GridType.TEN_KILOMETER));
    zoomGrids.addGrid(new Grid(GridType.METER));

    expect(zoomGrids.getPrecision()?.valueOf()).toEqual(
      GridType.METER.valueOf(),
    );
  });
});
