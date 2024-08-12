import { BaseZoomGrids } from "@dewars/grid";
import type { Grid } from "./Grid.ts";
import type { GridType } from "./GridType.ts";

/**
 * Zoom Level Matching Grids
 */
export class ZoomGrids extends BaseZoomGrids<Grid> {
  /**
   * Constructor
   *
   * @param zoom
   *            zoom level
   */
  constructor(zoom: number) {
    super(zoom);
  }

  /**
   * Get the grid type precision
   *
   * @return grid type precision
   */
  public getPrecision(): GridType | undefined {
    let type: GridType | undefined;
    if (super.hasGrids()) {
      type = this.grids.begin().value.getType();
    }
    return type;
  }
}
