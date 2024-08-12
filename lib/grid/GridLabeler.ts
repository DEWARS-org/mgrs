import { Color } from "@ngageoint/color-js";
import { Labeler } from "@ngageoint/grid-js/Labeler";
import type { Bounds } from "@ngageoint/grid-js/features/Bounds";
import { PropertyConstants } from "@ngageoint/grid-js/property/PropertyConstants";
import type { GridZone } from "../gzd/GridZone.ts";
import { MGRSProperties } from "../property/MGRSProperties.ts";
import type { GridLabel } from "./GridLabel.ts";
import type { GridType } from "./GridType.ts";

/**
 * Grid Labeler
 */
export abstract class GridLabeler extends Labeler {
  /**
   * Default text size
   */
  public static readonly DEFAULT_TEXT_SIZE = MGRSProperties.getInstance()
    .getDoubleProperty(
      true,
      PropertyConstants.LABELER.toString(),
      PropertyConstants.TEXT_SIZE.toString(),
    );

  /**
   * Default buffer size
   */
  public static readonly DEFAULT_BUFFER = MGRSProperties.getInstance()
    .getDoubleProperty(
      true,
      PropertyConstants.LABELER.toString(),
      PropertyConstants.BUFFER.toString(),
    );

  constructor(
    enabled: boolean,
    minZoom = 0,
    maxZoom: number | undefined,
    color = Color.black(),
    textSize = GridLabeler.DEFAULT_TEXT_SIZE,
    buffer = GridLabeler.DEFAULT_BUFFER,
  ) {
    if (!textSize || !buffer) {
      throw new Error("Text size and buffer must be defined");
    }
    super(enabled, minZoom, maxZoom, color, textSize, buffer);
  }

  /**
   * Get labels for the bounds
   *
   * @param gridType
   *            grid type
   * @param zone
   *            grid zone
   *  * @param tileBounds
   *            tile bounds
   * @return labels
   */
  public abstract getLabels(
    gridType: GridType,
    zone: GridZone,
    tileBounds?: Bounds,
  ): GridLabel[] | undefined;
}
