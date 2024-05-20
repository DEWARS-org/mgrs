import { test } from "@japa/runner";
import { GridType } from "../../lib/grid/GridType.js";
import { Grids } from "../../lib/grid/Grids.js";

test.group("Grids Tests", () => {
  test("test construction", ({ expect }) => {
    const defaultGrids = new Grids();
    for (const grid of defaultGrids.grids()) {
      expect(grid.isEnabled()).toEqual(true);
    }

    const enabledGrids = new Grids([GridType.KILOMETER]);
    for (const grid of enabledGrids.grids()) {
      if (grid.getType().valueOf() === GridType.KILOMETER.valueOf()) {
        expect(grid.isEnabled()).toEqual(true);
      } else {
        expect(grid.isEnabled()).toEqual(false);
      }
    }
  });
});
