import { test } from "@japa/runner";
import { GridStyle } from "@ngageoint/grid-js";
import { Grid } from "../../lib/grid/Grid.js";
import { GridType } from "../../lib/grid/GridType.js";

test.group("Grid Tests", () => {
  test("test precision", ({ expect }) => {
    const grid = new Grid(GridType.METER);
    expect(grid.getPrecision()).toEqual(GridType.METER);
  });

  test("test style", ({ expect }) => {
    const grid = new Grid(GridType.KILOMETER);

    expect(() => {
      grid.setStyle(new GridStyle(undefined, 0), GridType.METER);
    }).toThrow(Error);
  });

  test("test compare", ({ expect }) => {
    const grid = new Grid(GridType.METER);
    let grid2 = new Grid(GridType.METER);
    expect(grid.equals(grid2)).toBe(true);

    grid2 = new Grid(GridType.KILOMETER);
    expect(grid.less(grid2)).toBe(true);

    const grid3 = new Grid(GridType.TEN_KILOMETER);
    expect(grid2.less(grid3)).toBe(true);

    expect(grid3.less(grid)).toBe(false);
  });

  test("test type", ({ expect }) => {
    const grid = new Grid(GridType.GZD);
    expect(grid.isType(GridType.GZD)).toBe(true);
    expect(grid.isType(GridType.METER)).toBe(false);
  });
});
