import { expect } from "@std/expect";
import { GridType } from "../../lib/grid/GridType.ts";
import { Grids } from "../../lib/grid/Grids.ts";

Deno.test("test construction", () => {
  const defaultGrids = new Grids();
  for (const grid of defaultGrids.grids()) {
    expect(grid.isEnabled()).toEqual(true);
  }

  const enabledGrids = new Grids([GridType.Kilometer]);
  for (const grid of enabledGrids.grids()) {
    if (grid.getType().valueOf() === GridType.Kilometer.valueOf()) {
      expect(grid.isEnabled()).toEqual(true);
    } else {
      expect(grid.isEnabled()).toEqual(false);
    }
  }
});
