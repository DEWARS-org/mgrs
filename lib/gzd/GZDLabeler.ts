import type { Color } from "@ngageoint/color-js";
import { MGRS } from "../MGRS.ts";
import { GridLabel } from "../grid/GridLabel.ts";
import { GridLabeler } from "../grid/GridLabeler.ts";
import type { GridType } from "../grid/GridType.ts";
import type { GridZone } from "./GridZone.ts";

/**
 * Grid Zone Designator labeler
 */
export class GZDLabeler extends GridLabeler {
  constructor(
    enabled: boolean,
    minZoom = 0,
    maxZoom?: number,
    color?: Color,
    textSize?: number,
    buffer?: number,
  ) {
    super(enabled, minZoom, maxZoom, color, textSize, buffer);
  }

  /**
   * {@inheritDoc}
   */
  public getLabels(gridType: GridType, zone: GridZone): GridLabel[] {
    const labels: GridLabel[] = [];
    const bounds = zone.getBounds();
    const center = bounds.getCentroid();
    labels.push(
      new GridLabel(
        zone.getName(),
        center,
        bounds,
        gridType,
        MGRS.from(center),
      ),
    );
    return labels;
  }
}
