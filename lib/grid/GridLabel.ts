import { Label } from "@ngageoint/grid-js/Label";
import type { Bounds } from "@ngageoint/grid-js/features/Bounds";
import type { Point } from "@ngageoint/grid-js/features/Point";
import type { MGRS } from "../MGRS.ts";
import type { GridType } from "./GridType.ts";

/**
 * MGRS Grid Label
 */
export class GridLabel extends Label {
  /**
   * Grid type
   */
  private gridType: GridType;

  /**
   * MGRS coordinate
   */
  private coordinate: MGRS;

  /**
   * Constructor
   *
   * @param name
   *            name
   * @param center
   *            center point
   * @param bounds
   *            bounds
   * @param gridType
   *            grid type
   * @param coordinate
   *            MGRS coordinate
   */
  constructor(
    name: string,
    center: Point,
    bounds: Bounds,
    gridType: GridType,
    coordinate: MGRS,
  ) {
    super(name, center, bounds);
    this.gridType = gridType;
    this.coordinate = coordinate;
  }

  /**
   * Get the grid type
   *
   * @return grid type
   */
  public getGridType(): GridType {
    return this.gridType;
  }

  /**
   * Set the grid type
   *
   * @param gridType
   *            grid type
   */
  public setGridType(gridType: GridType): void {
    this.gridType = gridType;
  }

  /**
   * Get the MGRS coordinate
   *
   * @return MGRS coordinate
   */
  public getCoordinate(): MGRS {
    return this.coordinate;
  }

  /**
   * Set the MGRS coordinate
   *
   * @param coordinate
   *            MGRS coordinate
   */
  public setCoordinate(coordinate: MGRS): void {
    this.coordinate = coordinate;
  }
}
