import { expect } from "chai";
import { Grid } from "../../lib/grid/Grid.js";
import { GridType } from "../../lib/grid/GridType.js";
import { ZoomGrids } from "../../lib/grid/ZoomGrids.js";

describe("ZoomGrids Tests", () => {
  it("test precision", () => {
    const zoomGrids = new ZoomGrids(5);
    expect(zoomGrids.getPrecision()).to.be.undefined;

    zoomGrids.addGrid(new Grid(GridType.HUNDRED_KILOMETER));
    zoomGrids.addGrid(new Grid(GridType.TEN_KILOMETER));
    zoomGrids.addGrid(new Grid(GridType.METER));

    expect(zoomGrids.getPrecision()?.valueOf()).to.equal(
      GridType.METER.valueOf(),
    );
  });
});
