import { expect } from 'chai';
import { ZoomGrids } from '../../lib/grid/ZoomGrids.js';
import { GridType } from '../../lib/grid/GridType.js';
import { Grid } from '../../lib/grid/Grid.js';

describe('ZoomGrids Tests', function () {
  it('test precision', function () {
    const zoomGrids = new ZoomGrids(5);
    expect(zoomGrids.getPrecision()).to.be.undefined;

    zoomGrids.addGrid(new Grid(GridType.HUNDRED_KILOMETER));
    zoomGrids.addGrid(new Grid(GridType.TEN_KILOMETER));
    zoomGrids.addGrid(new Grid(GridType.METER));

    expect(zoomGrids.getPrecision()?.valueOf()).to.equal(GridType.METER.valueOf());
  });
});
