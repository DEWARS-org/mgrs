import { GridStyle } from "@ngageoint/grid-js";
import { expect } from "chai";
import { Grid } from "../../lib/grid/Grid.js";
import { GridType } from "../../lib/grid/GridType.js";

describe("Grid Tests", () => {
  it("test precision", () => {
    const grid = new Grid(GridType.METER);
    expect(grid.getPrecision()).to.equal(GridType.METER);
  });

  it("test style", () => {
    const grid = new Grid(GridType.KILOMETER);

    expect(() => {
      grid.setStyle(new GridStyle(undefined, 0), GridType.METER);
    }).to.throw(Error);
  });

  it("test compare", () => {
    const grid = new Grid(GridType.METER);
    let grid2 = new Grid(GridType.METER);
    expect(grid.equals(grid2)).to.be.true;

    grid2 = new Grid(GridType.KILOMETER);
    expect(grid.less(grid2)).to.be.true;

    const grid3 = new Grid(GridType.TEN_KILOMETER);
    expect(grid2.less(grid3)).to.be.true;

    expect(grid3.less(grid)).to.be.false;
  });

  it("test type", () => {
    const grid = new Grid(GridType.GZD);
    expect(grid.isType(GridType.GZD)).to.be.true;
    expect(grid.isType(GridType.METER)).to.be.false;
  });
});
