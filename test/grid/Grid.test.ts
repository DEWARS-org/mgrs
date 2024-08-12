import { expect } from "@std/expect";
import { GridStyle } from "@dewars/grid";
import { Grid } from "../../lib/grid/Grid.ts";
import { GridType } from "../../lib/grid/GridType.ts";

Deno.test("test precision", () => {
  const grid = new Grid(GridType.Meter);
  expect(grid.getPrecision()).toEqual(GridType.Meter);
});

Deno.test("test style", () => {
  const grid = new Grid(GridType.Kilometer);

  expect(() => {
    grid.setStyle(new GridStyle(undefined, 0), GridType.Meter);
  }).toThrow(Error);
});

Deno.test("test compare", () => {
  const grid = new Grid(GridType.Meter);
  let grid2 = new Grid(GridType.Meter);
  expect(grid.equals(grid2)).toBe(true);

  grid2 = new Grid(GridType.Kilometer);
  expect(grid.less(grid2)).toBe(true);

  const grid3 = new Grid(GridType.TenKilometer);
  expect(grid2.less(grid3)).toBe(true);

  expect(grid3.less(grid)).toBe(false);
});

Deno.test("test type", () => {
  const grid = new Grid(GridType.Gzd);
  expect(grid.isType(GridType.Gzd)).toBe(true);
  expect(grid.isType(GridType.Meter)).toBe(false);
});
