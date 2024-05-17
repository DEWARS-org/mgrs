import { expect } from "chai";
import { GridType } from "../../lib/grid/GridType.js";
import { Grids } from "../../lib/grid/Grids.js";

describe("Grids Tests", () => {
  it("test construction", () => {
    const defaultGrids = new Grids();
    for (const grid of defaultGrids.grids()) {
      expect(grid.isEnabled()).to.equal(true);
    }

    const enabledGrids = new Grids([GridType.KILOMETER]);
    for (const grid of enabledGrids.grids()) {
      if (grid.getType().valueOf() === GridType.KILOMETER.valueOf()) {
        expect(grid.isEnabled()).to.equal(true);
      } else {
        expect(grid.isEnabled()).to.equal(false);
      }
    }
  });
});
