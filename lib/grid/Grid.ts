import type { Color } from "@dewars/color";
import { BaseGrid } from "@dewars/grid";
import { GridStyle } from "@dewars/grid";
import type { Bounds } from "@dewars/grid";
import { PropertyConstants } from "@dewars/grid";
import type { GridTile } from "@dewars/grid";
import type { IComparable } from "tstl";
import type { GridLine } from "../features/GridLine.ts";
import type { GridZone } from "../gzd/GridZone.ts";
import { MGRSProperties } from "../property/MGRSProperties.ts";
import type { GridLabel } from "./GridLabel.ts";
import type { GridLabeler } from "./GridLabeler.ts";
import { GridType } from "./GridType.ts";
import { GridTypeUtils } from "./GridTypeUtils.ts";

/**
 * Grid
 */
export class Grid extends BaseGrid implements IComparable<Grid> {
  /**
   * Default line width
   */
  public static readonly DEFAULT_WIDTH = MGRSProperties.getInstance()
    .getDoubleProperty(
      true,
      PropertyConstants.GRID.toString(),
      PropertyConstants.WIDTH.toString(),
    );

  /**
   * Grid type
   */
  private readonly type: GridType;

  /**
   * Grid line styles
   */
  private styles = new Map<GridType, GridStyle>();

  /**
   * Constructor
   *
   * @param type
   *            grid type
   */
  constructor(type: GridType) {
    super();
    this.type = type;
  }

  /**
   * Get the grid type
   *
   * @return grid type
   */
  public getType(): GridType {
    return this.type;
  }

  /**
   * Is the provided grid type
   *
   * @param type
   *            grid type
   * @return true if the type
   */
  public isType(type: GridType): boolean {
    return this.type === type;
  }

  /**
   * Get the precision in meters
   *
   * @return precision meters
   */
  public getPrecision(): number {
    return this.type;
  }

  /**
   * Get the grid type precision line style for the grid type
   *
   * @param gridType
   *            grid type
   * @return grid type line style
   */
  public getStyle(gridType?: GridType): GridStyle {
    let style: GridStyle;
    if (gridType !== null && gridType !== undefined) {
      if (gridType === this.type) {
        style = super.getStyle();
      } else {
        const tempStyle = this.styles.get(gridType);
        if (!tempStyle) {
          throw new Error(
            `Grid does not contain a style for the grid type: ${gridType}`,
          );
        }
        style = tempStyle;
      }
    } else {
      style = super.getStyle();
    }

    return style;
  }

  /**
   * Get the grid type line style for the grid type or create it
   *
   * @param gridType
   *            grid type
   * @return grid type line style
   */
  private getOrCreateStyle(gridType: GridType): GridStyle {
    let style = this.getStyle(gridType);
    if (!style) {
      style = new GridStyle(undefined, 0);
      this.setStyle(style, gridType);
    }
    return style;
  }

  /**
   * Set the grid type precision line style
   *
   * @param gridType
   *            grid type
   * @param style
   *            grid line style
   */
  public setStyle(style?: GridStyle, gridType?: GridType): void {
    if (gridType === null || gridType === undefined) {
      gridType = this.type;
    }

    if (gridType < this.getPrecision()) {
      throw new Error(
        `Grid can not define a style for a higher precision grid type. Type: ${this.type}, Style Type: ${gridType}`,
      );
    }
    if (gridType === this.type) {
      super.setStyle(style);
    } else {
      this.styles.set(gridType, style ? style : new GridStyle(undefined, 0));
    }
  }

  /**
   * Clear the propagated grid type precision styles
   */
  public clearPrecisionStyles(): void {
    this.styles.clear();
  }

  /**
   * Get the grid type precision line color
   *
   * @param gridType
   *            grid type
   * @return grid type line color
   */
  public getColor(gridType?: GridType): Color | undefined {
    let color: Color | undefined;
    if (gridType !== null && gridType !== undefined) {
      const style = this.getStyle(gridType);
      if (style) {
        color = style.getColor();
      }
    }
    if (!color) {
      color = super.getColor();
    }

    return color;
  }

  /**
   * Set the grid type precision line color
   *
   * @param gridType
   *            grid type
   * @param color
   *            grid line color
   */
  public setColor(color?: Color, gridType?: GridType): void {
    if (gridType === null || gridType === undefined) {
      gridType = this.type;
    }
    this.getOrCreateStyle(gridType).setColor(color);
  }

  /**
   * Get the grid type precision line width
   *
   * @param gridType
   *            grid type
   * @return grid type line width
   */
  public getWidth(gridType?: GridType): number {
    let width = 0;
    const style = this.getStyle(gridType);
    if (style) {
      width = style.getWidth();
    }
    if (width === 0) {
      width = super.getWidth();
    }
    return width;
  }

  /**
   * Set the grid type precision line width
   *
   * @param gridType
   *            grid type
   * @param width
   *            grid line width
   */
  public setWidth(width: number, gridType?: GridType): void {
    if (gridType === null || gridType === undefined) {
      gridType = this.type;
    }
    this.getOrCreateStyle(gridType).setWidth(width);
  }

  /**
   * Get the grid labeler
   *
   * @return grid labeler
   */
  public getLabeler(): GridLabeler {
    return super.getLabeler() as GridLabeler;
  }

  /**
   * Set the grid labeler
   *
   * @param labeler
   *            grid labeler
   */
  public setLabeler(labeler: GridLabeler): void {
    super.setLabeler(labeler);
  }

  /**
   * Get the lines for the tile and zone
   *
   * @param tile
   *            tile
   * @param zone
   *            grid zone
   * @return lines
   */
  public getLinesFromGridTile(
    tile: GridTile,
    zone: GridZone,
  ): GridLine[] | undefined {
    return this.getLines(tile.getZoom(), zone, tile.getBounds());
  }

  /**
   * Get the lines for the zoom, tile bounds, and zone
   *
   * @param zoom
   *            zoom level
   * @param tileBounds
   *            tile bounds
   * @param zone
   *            grid zone
   * @return lines
   */
  public getLines(
    zoom: number,
    zone: GridZone,
    tileBounds?: Bounds,
  ): GridLine[] | undefined {
    let lines: GridLine[] | undefined;
    if (tileBounds && this.isLinesWithin(zoom)) {
      lines = this.getLinesFromBounds(tileBounds, zone);
    }
    return lines;
  }

  /**
   * Get the lines for the tile bounds and zone
   *
   * @param tileBounds
   *            tile bounds
   * @param zone
   *            grid zone
   * @return lines
   */
  public getLinesFromBounds(
    tileBounds: Bounds,
    zone: GridZone,
  ): GridLine[] | undefined {
    return zone.getLines(tileBounds, this.type);
  }

  /**
   * Get the labels for the tile and zone
   *
   * @param tile
   *            tile
   * @param zone
   *            grid zone
   * @return labels
   */
  public getLabelsFromGridTile(
    tile: GridTile,
    zone: GridZone,
  ): GridLabel[] | undefined {
    return this.getLabels(tile.getZoom(), zone, tile.getBounds());
  }

  /**
   * Get the labels for the zoom, tile bounds, and zone
   *
   * @param zoom
   *            zoom level
   * @param tileBounds
   *            tile bounds
   * @param zone
   *            grid zone
   * @return labels
   */
  public getLabels(
    zoom: number,
    zone: GridZone,
    tileBounds?: Bounds,
  ): GridLabel[] | undefined {
    let labels: GridLabel[] | undefined;
    if (this.isLabelerWithin(zoom)) {
      labels = this.getLabeler().getLabels(this.type, zone, tileBounds);
    }
    return labels;
  }

  /**
   * {@inheritDoc}
   */
  public compareTo(other: Grid): number {
    return this.getPrecisionCompare() - other.getPrecisionCompare();
  }

  /**
   * Get the precision in meters
   *
   * @return precision meters
   */
  public getPrecisionCompare(): number {
    let precision = this.getPrecision();
    if (precision <= GridType.Gzd) {
      precision = Number.MAX_SAFE_INTEGER;
    }
    return precision;
  }

  public hashCode(): number {
    const prime = 31;
    let result = 1;
    result = prime * result +
      (this.type ? GridTypeUtils.hashCode(this.type) : 0);
    return result;
  }

  /**
   * {@inheritDoc}
   */
  public equals(obj: any): boolean {
    if (this === obj) {
      return true;
    }
    if (!obj) {
      return false;
    }
    if (typeof this !== typeof obj) {
      return false;
    }
    const other = obj as Grid;
    if (this.type !== other.type) {
      return false;
    }
    return true;
  }

  public less(other: Grid): boolean {
    return this.hashCode() < other.hashCode();
  }
}
