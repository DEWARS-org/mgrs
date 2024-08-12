import type { Hemisphere } from "@dewars/grid";
import { Bounds } from "@dewars/grid";
import { Line } from "@dewars/grid";
import type { Point } from "@dewars/grid";
import { MGRSUtils } from "../MGRSUtils.ts";
import { GridLine } from "../features/GridLine.ts";
import { GridType } from "../grid/GridType.ts";
import { GridTypeUtils } from "../grid/GridTypeUtils.ts";
import { UTM } from "../utm/UTM.ts";
import type { LatitudeBand } from "./LatitudeBand.ts";
import type { LongitudinalStrip } from "./LongitudinalStrip.ts";

/**
 * Grid Zone
 */
export class GridZone {
  /**
   * Longitudinal strip
   */
  private strip: LongitudinalStrip;

  /**
   * Latitude band
   */
  private band: LatitudeBand;

  /**
   * Bounds
   */
  private bounds: Bounds;

  /**
   * Constructor
   *
   * @param strip
   *            longitudinal strip
   * @param band
   *            latitude band
   */
  constructor(strip: LongitudinalStrip, band: LatitudeBand) {
    this.strip = strip;
    this.band = band;
    this.bounds = Bounds.degrees(
      strip.getWest(),
      band.getSouth(),
      strip.getEast(),
      band.getNorth(),
    );
  }

  /**
   * Get the longitudinal strip
   *
   * @return longitudinal strip
   */
  public getStrip(): LongitudinalStrip {
    return this.strip;
  }

  /**
   * Get the latitude band
   *
   * @return latitude band
   */
  public getBand(): LatitudeBand {
    return this.band;
  }

  /**
   * Get the zone number
   *
   * @return zone number
   */
  public getNumber(): number {
    return this.strip.getNumber();
  }

  /**
   * Get the band letter
   *
   * @return band letter
   */
  public getLetter(): string {
    return this.band.getLetter();
  }

  /**
   * Get the hemisphere
   *
   * @return hemisphere
   */
  public getHemisphere(): Hemisphere {
    return this.band.getHemisphere();
  }

  /**
   * Get the bounds
   *
   * @return bounds
   */
  public getBounds(): Bounds {
    return this.bounds;
  }

  /**
   * Get the label name
   *
   * @return name
   */
  public getName(): string {
    return MGRSUtils.getLabelName(this.getNumber(), this.getLetter());
  }

  /**
   * Is the provided bounds within the zone bounds
   *
   * @param bounds
   *            bounds
   * @return true if within bounds
   */
  public isWithin(bounds: Bounds): boolean {
    if (this.bounds.getUnit()) {
      const tempUnit = this.bounds.getUnit();
      if (!tempUnit) {
        throw new Error("Bounds unit is null");
      }
      bounds = bounds.toUnit(tempUnit);
    }
    return (
      this.bounds.getSouth() <= bounds.getNorth() &&
      this.bounds.getNorth() >= bounds.getSouth() &&
      this.bounds.getWest() <= bounds.getEast() &&
      this.bounds.getEast() >= bounds.getWest()
    );
  }

  /**
   * Get the longitudinal strip expansion, number of additional neighbors to
   * iterate over in combination with this strip
   *
   * @return longitudinal strip neighbor iteration expansion
   */
  public getStripExpand(): number {
    return this.strip.getExpand();
  }

  /**
   * Get the grid zone lines
   *
   * @param gridType
   *            grid type
   * @return lines
   */
  public getLinesFromGridType(gridType: GridType): GridLine[] | undefined {
    return this.getLines(this.bounds, gridType);
  }

  /**
   * Get the grid zone lines
   *
   * @param tileBounds
   *            tile bounds
   * @param gridType
   *            grid type
   * @return lines
   */
  public getLines(
    tileBounds: Bounds,
    gridType: GridType,
  ): GridLine[] | undefined {
    let lines: GridLine[] | undefined;

    if (gridType === GridType.Gzd) {
      // if precision is 0, draw the zone bounds
      lines = [];
      for (const line of this.bounds.getLines()) {
        lines.push(GridLine.lineFromLine(line, GridType.Gzd));
      }
    } else {
      const drawBounds = this.getDrawBounds(tileBounds, gridType);

      if (drawBounds) {
        lines = [];

        const precision = gridType;
        const zoneNumber = this.getNumber();
        const hemisphere = this.getHemisphere();
        const minLon = this.bounds.getMinLongitude();
        const maxLon = this.bounds.getMaxLongitude();

        for (
          let easting = drawBounds.getMinLongitude();
          easting < drawBounds.getMaxLongitude();
          easting += precision
        ) {
          const eastingPrecision = GridTypeUtils.getPrecision(easting);

          for (
            let northing = drawBounds.getMinLatitude();
            northing < drawBounds.getMaxLatitude();
            northing += precision
          ) {
            const northingPrecision = GridTypeUtils.getPrecision(northing);

            let southwest = UTM.point(
              zoneNumber,
              hemisphere,
              easting,
              northing,
            );
            const northwest = UTM.point(
              zoneNumber,
              hemisphere,
              easting,
              northing + precision,
            );
            let southeast = UTM.point(
              zoneNumber,
              hemisphere,
              easting + precision,
              northing,
            );

            // For points outside the tile grid longitude bounds,
            // get a bound just outside the bounds
            if (precision > 1) {
              if (southwest.getLongitude() < minLon) {
                southwest = this.getWestBoundsPoint(
                  easting,
                  northing,
                  southwest,
                  southeast,
                );
              } else if (southeast.getLongitude() > maxLon) {
                southeast = this.getEastBoundsPoint(
                  easting,
                  northing,
                  southwest,
                  southeast,
                );
              }
            }

            // Vertical line
            lines.push(
              GridLine.lineFromPoints(southwest, northwest, eastingPrecision),
            );

            // Horizontal line
            lines.push(
              GridLine.lineFromPoints(southwest, southeast, northingPrecision),
            );
          }
        }
      }
    }

    return lines;
  }

  /**
   * Get a point west of the horizontal bounds at one meter precision
   *
   * @param easting
   *            easting value
   * @param northing
   *            northing value
   * @param west
   *            west point
   * @param east
   *            east point
   * @return higher precision point
   */
  private getWestBoundsPoint(
    easting: number,
    northing: number,
    west: Point,
    east: Point,
  ): Point {
    return this.getBoundsPoint(easting, northing, west, east, false);
  }

  /**
   * Get a point east of the horizontal bounds at one meter precision
   *
   * @param easting
   *            easting value
   * @param northing
   *            northing value
   * @param west
   *            west point
   * @param east
   *            east point
   * @return higher precision point
   */
  private getEastBoundsPoint(
    easting: number,
    northing: number,
    west: Point,
    east: Point,
  ): Point {
    return this.getBoundsPoint(easting, northing, west, east, true);
  }

  /**
   * Get a point outside of the horizontal bounds at one meter precision
   *
   * @param easting
   *            easting value
   * @param northing
   *            northing value
   * @param west
   *            west point
   * @param east
   *            east point
   * @param eastern
   *            true if east of the eastern bounds, false if west of the
   *            western bounds
   * @return higher precision point
   */
  private getBoundsPoint(
    easting: number,
    northing: number,
    west: Point,
    east: Point,
    eastern: boolean,
  ): Point {
    const line = Line.line(west, east);

    let boundsLine: Line;
    if (eastern) {
      boundsLine = this.bounds.getEastLine();
    } else {
      boundsLine = this.bounds.getWestLine();
    }

    const zoneNumber = this.getNumber();
    const hemisphere = this.getHemisphere();

    // Intersection between the horizontal line and vertical bounds line
    const intersection = line.intersection(boundsLine);

    let boundsEasting = easting;
    if (intersection) {
      // Intersection easting
      const intersectionUtm = UTM.from(intersection, zoneNumber, hemisphere);
      const intersectionEasting = intersectionUtm.getEasting();
      boundsEasting = intersectionEasting - easting;
    }

    // One meter precision just outside the bounds
    if (eastern) {
      boundsEasting = Math.ceil(boundsEasting);
    } else {
      boundsEasting = Math.floor(boundsEasting);
    }

    // Higher precision point just outside of the bounds
    const boundsPoint = UTM.point(
      zoneNumber,
      hemisphere,
      easting + boundsEasting,
      northing,
    );

    return boundsPoint;
  }

  /**
   * Get the draw bounds of easting and northing in meters
   *
   * @param tileBounds
   *            tile bounds
   * @param gridType
   *            grid type
   * @return draw bounds or null
   */
  public getDrawBounds(
    tileBounds: Bounds,
    gridType: GridType,
  ): Bounds | undefined {
    let drawBounds: Bounds | undefined;

    tileBounds = tileBounds.toDegrees().overlap(this.bounds) as Bounds;

    if (tileBounds && !tileBounds.isEmpty()) {
      const zoneNumber = this.getNumber();
      const hemisphere = this.getHemisphere();

      const upperLeftUtm = UTM.from(
        tileBounds.getNorthwest(),
        zoneNumber,
        hemisphere,
      );
      const lowerLeftUtm = UTM.from(
        tileBounds.getSouthwest(),
        zoneNumber,
        hemisphere,
      );
      const lowerRightUtm = UTM.from(
        tileBounds.getSoutheast(),
        zoneNumber,
        hemisphere,
      );
      const upperRightUtm = UTM.from(
        tileBounds.getNortheast(),
        zoneNumber,
        hemisphere,
      );

      const precision = gridType;
      const leftEasting = Math.floor(
        Math.min(upperLeftUtm.getEasting(), lowerLeftUtm.getEasting()) /
          precision,
      ) * precision;
      const lowerNorthing = Math.floor(
        Math.min(lowerLeftUtm.getNorthing(), lowerRightUtm.getNorthing()) /
          precision,
      ) * precision;
      const rightEasting = Math.ceil(
        Math.max(lowerRightUtm.getEasting(), upperRightUtm.getEasting()) /
          precision,
      ) * precision;
      const upperNorthing = Math.ceil(
        Math.max(upperRightUtm.getNorthing(), upperLeftUtm.getNorthing()) /
          precision,
      ) * precision;

      drawBounds = Bounds.meters(
        leftEasting,
        lowerNorthing,
        rightEasting,
        upperNorthing,
      );
    }

    return drawBounds;
  }
}
