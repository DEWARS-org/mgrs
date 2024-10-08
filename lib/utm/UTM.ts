import { GridConstants } from "@dewars/grid";
import { Hemisphere } from "@dewars/grid";
import { HemisphereUtils } from "@dewars/grid";
import { Point } from "@dewars/grid";
import { DecimalFormat } from "@dewars/decimal-format";
import { MGRS } from "../MGRS.ts";
import { GridZones } from "../gzd/GridZones.ts";

/**
 * Universal Transverse Mercator Projection
 */
export class UTM {
  /**
   * Zone number
   */
  private readonly zone: number;

  /**
   * Hemisphere
   */
  private readonly hemisphere: Hemisphere;

  /**
   * Easting
   */
  private readonly easting: number;

  /**
   * Northing
   */
  private readonly northing: number;

  /**
   * UTM string pattern
   */
  private static readonly utmPattern =
    /^(\d{1,2})\s*([N|S])\s*(\d+\.?\d*)\s*(\d+\.?\d*)$/i;

  /**
   * Create
   *
   * @param zone
   *            zone number
   * @param hemisphere
   *            hemisphere
   * @param easting
   *            easting
   * @param northing
   *            northing
   * @return UTM
   */
  public static create(
    zone: number,
    hemisphere: Hemisphere,
    easting: number,
    northing: number,
  ): UTM {
    return new UTM(zone, hemisphere, easting, northing);
  }

  /**
   * Create a point from the UTM attributes
   *
   * @param zone
   *            zone number
   * @param hemisphere
   *            hemisphere
   * @param easting
   *            easting
   * @param northing
   *            northing
   * @return point
   */
  public static point(
    zone: number,
    hemisphere: Hemisphere,
    easting: number,
    northing: number,
  ): Point {
    return UTM.create(zone, hemisphere, easting, northing).toPoint();
  }

  /**
   * Constructor
   *
   * @param zone
   *            zone number
   * @param hemisphere
   *            hemisphere
   * @param easting
   *            easting
   * @param northing
   *            northing
   */
  constructor(
    zone: number,
    hemisphere: Hemisphere,
    easting: number,
    northing: number,
  ) {
    this.zone = zone;
    this.hemisphere = hemisphere;
    this.easting = easting;
    this.northing = northing;
  }

  /**
   * Get the zone number
   *
   * @return zone number
   */
  public getZone(): number {
    return this.zone;
  }

  /**
   * Get the hemisphere
   *
   * @return hemisphere
   */
  public getHemisphere(): Hemisphere {
    return this.hemisphere;
  }

  /**
   * Get the easting
   *
   * @return easting
   */
  public getEasting(): number {
    return this.easting;
  }

  /**
   * Get the northing
   *
   * @return northing
   */
  public getNorthing(): number {
    return this.northing;
  }

  /**
   * Convert to a point
   *
   * @return point
   */
  public toPoint(): Point {
    let north = this.northing;
    if (this.hemisphere === Hemisphere.South) {
      // Remove 10,000,000 meter offset used for southern hemisphere
      north -= 10000000.0;
    }

    let latitude = ((north / 6366197.724 / 0.9996 +
      (1 +
          0.006739496742 * Math.cos(north / 6366197.724 / 0.9996) ** 2 -
          (0.006739496742 *
              Math.sin(north / 6366197.724 / 0.9996) *
              Math.cos(north / 6366197.724 / 0.9996) *
              (Math.atan(
                Math.cos(
                  Math.atan(
                    (Math.exp(
                      ((this.easting - 500000) /
                        ((0.9996 * 6399593.625) /
                          Math.sqrt(
                            1 +
                              0.006739496742 *
                                Math.cos(north / 6366197.724 / 0.9996) ** 2,
                          ))) *
                        (1 -
                          (((0.006739496742 *
                              ((this.easting - 500000) /
                                  ((0.9996 * 6399593.625) /
                                    Math.sqrt(
                                      1 +
                                        0.006739496742 *
                                          Math.cos(
                                              north / 6366197.724 / 0.9996,
                                            ) ** 2,
                                    ))) **
                                2) /
                              2) *
                              Math.cos(north / 6366197.724 / 0.9996) ** 2) /
                            3),
                    ) -
                      Math.exp(
                        (-(this.easting - 500000) /
                          ((0.9996 * 6399593.625) /
                            Math.sqrt(
                              1 +
                                0.006739496742 *
                                  Math.cos(north / 6366197.724 / 0.9996) ** 2,
                            ))) *
                          (1 -
                            (((0.006739496742 *
                                ((this.easting - 500000) /
                                    ((0.9996 * 6399593.625) /
                                      Math.sqrt(
                                        1 +
                                          0.006739496742 *
                                            Math.cos(
                                                north / 6366197.724 / 0.9996,
                                              ) **
                                              2,
                                      ))) **
                                  2) /
                                2) *
                                Math.cos(north / 6366197.724 / 0.9996) ** 2) /
                              3),
                      )) /
                      2 /
                      Math.cos(
                        ((north -
                              0.9996 *
                                6399593.625 *
                                (north / 6366197.724 / 0.9996 -
                                  ((0.006739496742 * 3) / 4) *
                                    (north / 6366197.724 / 0.9996 +
                                      Math.sin(
                                          (2 * north) / 6366197.724 / 0.9996,
                                        ) /
                                        2) +
                                  (((((0.006739496742 * 3) / 4) ** 2 * 5) / 3) *
                                      (3 *
                                          (north / 6366197.724 / 0.9996 +
                                            Math.sin(
                                                (2 * north) / 6366197.724 /
                                                  0.9996,
                                              ) /
                                              2) +
                                        Math.sin(
                                            (2 * north) / 6366197.724 / 0.9996,
                                          ) *
                                          Math.cos(
                                              north / 6366197.724 / 0.9996,
                                            ) **
                                            2)) /
                                    4 -
                                  (((((0.006739496742 * 3) / 4) ** 3 * 35) /
                                      27) *
                                      ((5 *
                                            (3 *
                                                (north / 6366197.724 / 0.9996 +
                                                  Math.sin(
                                                      (2 * north) /
                                                        6366197.724 / 0.9996,
                                                    ) /
                                                    2) +
                                              Math.sin(
                                                  (2 * north) / 6366197.724 /
                                                    0.9996,
                                                ) *
                                                Math.cos(
                                                    north / 6366197.724 /
                                                      0.9996,
                                                  ) **
                                                  2)) /
                                          4 +
                                        Math.sin(
                                            (2 * north) / 6366197.724 / 0.9996,
                                          ) *
                                          Math.cos(
                                              north / 6366197.724 / 0.9996,
                                            ) ** 2 *
                                          Math.cos(
                                              north / 6366197.724 / 0.9996,
                                            ) **
                                            2)) /
                                    3)) /
                              ((0.9996 * 6399593.625) /
                                Math.sqrt(
                                  1 +
                                    0.006739496742 *
                                      Math.cos(north / 6366197.724 / 0.9996) **
                                        2,
                                ))) *
                            (1 -
                              ((0.006739496742 *
                                  ((this.easting - 500000) /
                                      ((0.9996 * 6399593.625) /
                                        Math.sqrt(
                                          1 +
                                            0.006739496742 *
                                              Math.cos(
                                                  north / 6366197.724 / 0.9996,
                                                ) **
                                                2,
                                        ))) **
                                    2) /
                                  2) *
                                Math.cos(north / 6366197.724 / 0.9996) ** 2) +
                          north / 6366197.724 / 0.9996,
                      ),
                  ),
                ) *
                  Math.tan(
                    ((north -
                          0.9996 *
                            6399593.625 *
                            (north / 6366197.724 / 0.9996 -
                              ((0.006739496742 * 3) / 4) *
                                (north / 6366197.724 / 0.9996 +
                                  Math.sin((2 * north) / 6366197.724 / 0.9996) /
                                    2) +
                              (((((0.006739496742 * 3) / 4) ** 2 * 5) / 3) *
                                  (3 *
                                      (north / 6366197.724 / 0.9996 +
                                        Math.sin(
                                            (2 * north) / 6366197.724 / 0.9996,
                                          ) /
                                          2) +
                                    Math.sin(
                                        (2 * north) / 6366197.724 / 0.9996,
                                      ) *
                                      Math.cos(north / 6366197.724 / 0.9996) **
                                        2)) /
                                4 -
                              (((((0.006739496742 * 3) / 4) ** 3 * 35) / 27) *
                                  ((5 *
                                        (3 *
                                            (north / 6366197.724 / 0.9996 +
                                              Math.sin(
                                                  (2 * north) / 6366197.724 /
                                                    0.9996,
                                                ) /
                                                2) +
                                          Math.sin(
                                              (2 * north) / 6366197.724 /
                                                0.9996,
                                            ) *
                                            Math.cos(
                                                north / 6366197.724 / 0.9996,
                                              ) ** 2)) /
                                      4 +
                                    Math.sin(
                                        (2 * north) / 6366197.724 / 0.9996,
                                      ) *
                                      Math.cos(north / 6366197.724 / 0.9996) **
                                        2 *
                                      Math.cos(north / 6366197.724 / 0.9996) **
                                        2)) /
                                3)) /
                          ((0.9996 * 6399593.625) /
                            Math.sqrt(
                              1 +
                                0.006739496742 *
                                  Math.cos(north / 6366197.724 / 0.9996) ** 2,
                            ))) *
                        (1 -
                          ((0.006739496742 *
                              ((this.easting - 500000) /
                                  ((0.9996 * 6399593.625) /
                                    Math.sqrt(
                                      1 +
                                        0.006739496742 *
                                          Math.cos(
                                              north / 6366197.724 / 0.9996,
                                            ) ** 2,
                                    ))) **
                                2) /
                              2) *
                            Math.cos(north / 6366197.724 / 0.9996) ** 2) +
                      north / 6366197.724 / 0.9996,
                  ),
              ) -
                north / 6366197.724 / 0.9996) *
              3) /
            2) *
        (Math.atan(
          Math.cos(
            Math.atan(
              (Math.exp(
                ((this.easting - 500000) /
                  ((0.9996 * 6399593.625) /
                    Math.sqrt(
                      1 +
                        0.006739496742 *
                          Math.cos(north / 6366197.724 / 0.9996) ** 2,
                    ))) *
                  (1 -
                    (((0.006739496742 *
                        ((this.easting - 500000) /
                            ((0.9996 * 6399593.625) /
                              Math.sqrt(
                                1 +
                                  0.006739496742 *
                                    Math.cos(north / 6366197.724 / 0.9996) ** 2,
                              ))) **
                          2) /
                        2) *
                        Math.cos(north / 6366197.724 / 0.9996) ** 2) /
                      3),
              ) -
                Math.exp(
                  (-(this.easting - 500000) /
                    ((0.9996 * 6399593.625) /
                      Math.sqrt(
                        1 +
                          0.006739496742 *
                            Math.cos(north / 6366197.724 / 0.9996) ** 2,
                      ))) *
                    (1 -
                      (((0.006739496742 *
                          ((this.easting - 500000) /
                              ((0.9996 * 6399593.625) /
                                Math.sqrt(
                                  1 +
                                    0.006739496742 *
                                      Math.cos(north / 6366197.724 / 0.9996) **
                                        2,
                                ))) **
                            2) /
                          2) *
                          Math.cos(north / 6366197.724 / 0.9996) ** 2) /
                        3),
                )) /
                2 /
                Math.cos(
                  ((north -
                        0.9996 *
                          6399593.625 *
                          (north / 6366197.724 / 0.9996 -
                            ((0.006739496742 * 3) / 4) *
                              (north / 6366197.724 / 0.9996 +
                                Math.sin((2 * north) / 6366197.724 / 0.9996) /
                                  2) +
                            (((((0.006739496742 * 3) / 4) ** 2 * 5) / 3) *
                                (3 *
                                    (north / 6366197.724 / 0.9996 +
                                      Math.sin(
                                          (2 * north) / 6366197.724 / 0.9996,
                                        ) /
                                        2) +
                                  Math.sin((2 * north) / 6366197.724 / 0.9996) *
                                    Math.cos(north / 6366197.724 / 0.9996) **
                                      2)) /
                              4 -
                            (((((0.006739496742 * 3) / 4) ** 3 * 35) / 27) *
                                ((5 *
                                      (3 *
                                          (north / 6366197.724 / 0.9996 +
                                            Math.sin(
                                                (2 * north) / 6366197.724 /
                                                  0.9996,
                                              ) /
                                              2) +
                                        Math.sin(
                                            (2 * north) / 6366197.724 / 0.9996,
                                          ) *
                                          Math.cos(
                                              north / 6366197.724 / 0.9996,
                                            ) **
                                            2)) /
                                    4 +
                                  Math.sin((2 * north) / 6366197.724 / 0.9996) *
                                    Math.cos(north / 6366197.724 / 0.9996) **
                                      2 *
                                    Math.cos(north / 6366197.724 / 0.9996) **
                                      2)) /
                              3)) /
                        ((0.9996 * 6399593.625) /
                          Math.sqrt(
                            1 +
                              0.006739496742 *
                                Math.cos(north / 6366197.724 / 0.9996) ** 2,
                          ))) *
                      (1 -
                        ((0.006739496742 *
                            ((this.easting - 500000) /
                                ((0.9996 * 6399593.625) /
                                  Math.sqrt(
                                    1 +
                                      0.006739496742 *
                                        Math.cos(
                                            north / 6366197.724 / 0.9996,
                                          ) ** 2,
                                  ))) **
                              2) /
                            2) *
                          Math.cos(north / 6366197.724 / 0.9996) ** 2) +
                    north / 6366197.724 / 0.9996,
                ),
            ),
          ) *
            Math.tan(
              ((north -
                    0.9996 *
                      6399593.625 *
                      (north / 6366197.724 / 0.9996 -
                        ((0.006739496742 * 3) / 4) *
                          (north / 6366197.724 / 0.9996 +
                            Math.sin((2 * north) / 6366197.724 / 0.9996) / 2) +
                        (((((0.006739496742 * 3) / 4) ** 2 * 5) / 3) *
                            (3 *
                                (north / 6366197.724 / 0.9996 +
                                  Math.sin((2 * north) / 6366197.724 / 0.9996) /
                                    2) +
                              Math.sin((2 * north) / 6366197.724 / 0.9996) *
                                Math.cos(north / 6366197.724 / 0.9996) ** 2)) /
                          4 -
                        (((((0.006739496742 * 3) / 4) ** 3 * 35) / 27) *
                            ((5 *
                                  (3 *
                                      (north / 6366197.724 / 0.9996 +
                                        Math.sin(
                                            (2 * north) / 6366197.724 / 0.9996,
                                          ) /
                                          2) +
                                    Math.sin(
                                        (2 * north) / 6366197.724 / 0.9996,
                                      ) *
                                      Math.cos(north / 6366197.724 / 0.9996) **
                                        2)) /
                                4 +
                              Math.sin((2 * north) / 6366197.724 / 0.9996) *
                                Math.cos(north / 6366197.724 / 0.9996) ** 2 *
                                Math.cos(north / 6366197.724 / 0.9996) ** 2)) /
                          3)) /
                    ((0.9996 * 6399593.625) /
                      Math.sqrt(
                        1 +
                          0.006739496742 *
                            Math.cos(north / 6366197.724 / 0.9996) ** 2,
                      ))) *
                  (1 -
                    ((0.006739496742 *
                        ((this.easting - 500000) /
                            ((0.9996 * 6399593.625) /
                              Math.sqrt(
                                1 +
                                  0.006739496742 *
                                    Math.cos(north / 6366197.724 / 0.9996) ** 2,
                              ))) **
                          2) /
                        2) *
                      Math.cos(north / 6366197.724 / 0.9996) ** 2) +
                north / 6366197.724 / 0.9996,
            ),
        ) -
          north / 6366197.724 / 0.9996)) *
      180) /
      Math.PI;
    latitude = Math.round(latitude * 10000000);
    latitude /= 10000000;

    let longitude = (Math.atan(
          (Math.exp(
            ((this.easting - 500000) /
              ((0.9996 * 6399593.625) /
                Math.sqrt(
                  1 +
                    0.006739496742 *
                      Math.cos(north / 6366197.724 / 0.9996) ** 2,
                ))) *
              (1 -
                (((0.006739496742 *
                    ((this.easting - 500000) /
                        ((0.9996 * 6399593.625) /
                          Math.sqrt(
                            1 +
                              0.006739496742 *
                                Math.cos(north / 6366197.724 / 0.9996) ** 2,
                          ))) **
                      2) /
                    2) *
                    Math.cos(north / 6366197.724 / 0.9996) ** 2) /
                  3),
          ) -
            Math.exp(
              (-(this.easting - 500000) /
                ((0.9996 * 6399593.625) /
                  Math.sqrt(
                    1 +
                      0.006739496742 *
                        Math.cos(north / 6366197.724 / 0.9996) ** 2,
                  ))) *
                (1 -
                  (((0.006739496742 *
                      ((this.easting - 500000) /
                          ((0.9996 * 6399593.625) /
                            Math.sqrt(
                              1 +
                                0.006739496742 *
                                  Math.cos(north / 6366197.724 / 0.9996) ** 2,
                            ))) **
                        2) /
                      2) *
                      Math.cos(north / 6366197.724 / 0.9996) ** 2) /
                    3),
            )) /
            2 /
            Math.cos(
              ((north -
                    0.9996 *
                      6399593.625 *
                      (north / 6366197.724 / 0.9996 -
                        ((0.006739496742 * 3) / 4) *
                          (north / 6366197.724 / 0.9996 +
                            Math.sin((2 * north) / 6366197.724 / 0.9996) / 2) +
                        (((((0.006739496742 * 3) / 4) ** 2 * 5) / 3) *
                            (3 *
                                (north / 6366197.724 / 0.9996 +
                                  Math.sin((2 * north) / 6366197.724 / 0.9996) /
                                    2) +
                              Math.sin((2 * north) / 6366197.724 / 0.9996) *
                                Math.cos(north / 6366197.724 / 0.9996) ** 2)) /
                          4 -
                        (((((0.006739496742 * 3) / 4) ** 3 * 35) / 27) *
                            ((5 *
                                  (3 *
                                      (north / 6366197.724 / 0.9996 +
                                        Math.sin(
                                            (2 * north) / 6366197.724 / 0.9996,
                                          ) / 2) +
                                    Math.sin(
                                        (2 * north) / 6366197.724 / 0.9996,
                                      ) *
                                      Math.cos(north / 6366197.724 / 0.9996) **
                                        2)) /
                                4 +
                              Math.sin((2 * north) / 6366197.724 / 0.9996) *
                                Math.cos(north / 6366197.724 / 0.9996) ** 2 *
                                Math.cos(north / 6366197.724 / 0.9996) ** 2)) /
                          3)) /
                    ((0.9996 * 6399593.625) /
                      Math.sqrt(
                        1 +
                          0.006739496742 *
                            Math.cos(north / 6366197.724 / 0.9996) ** 2,
                      ))) *
                  (1 -
                    ((0.006739496742 *
                        ((this.easting - 500000) /
                            ((0.9996 * 6399593.625) /
                              Math.sqrt(
                                1 +
                                  0.006739496742 *
                                    Math.cos(north / 6366197.724 / 0.9996) ** 2,
                              ))) **
                          2) /
                        2) *
                      Math.cos(north / 6366197.724 / 0.9996) ** 2) +
                north / 6366197.724 / 0.9996,
            ),
        ) *
          180) /
        Math.PI +
      this.zone * 6 -
      183;
    longitude = Math.round(longitude * 10000000);
    longitude /= 10000000;

    return Point.degrees(longitude, latitude);
  }

  /**
   * Convert to a MGRS coordinate
   *
   * @return MGRS
   */
  public toMGRS(): MGRS {
    return MGRS.from(this.toPoint());
  }

  /**
   * Format to a UTM string
   *
   * @return UTM string
   */
  public format(): string {
    const formatter = new DecimalFormat("0.##");

    return `${this.zone.toString().padStart(2, "0")} ${
      this.hemisphere === Hemisphere.North
        ? GridConstants.NORTH_CHAR
        : GridConstants.SOUTH_CHAR
    } ${formatter.format(this.easting)} ${formatter.format(this.northing)}`;
  }

  /**
   * {@inheritDoc}
   */
  public toString(): string {
    return this.format();
  }

  /**
   * Return whether the given string is valid UTM string
   *
   * @param utm
   *            potential UTM string
   * @return true if UTM string is valid, false otherwise
   */
  public static isUTM(utm: string): boolean {
    return UTM.utmPattern.test(utm);
  }

  /**
   * Parse a UTM value (Zone N|S Easting Northing)
   *
   * @param utm
   *            UTM value
   * @return UTM
   * @throws ParseException
   *             upon failure to parse UTM value
   */
  public static parse(utm: string): UTM {
    if (!UTM.utmPattern.test(utm)) {
      throw new Error(`Invalid UTM: ${utm}`);
    }

    const matches = utm.match(UTM.utmPattern);

    if (!matches) {
      throw new Error(`Invalid UTM input: ${utm}`);
    }

    const zone = Number.parseInt(matches[1], 10);
    const hemisphere =
      matches[2].localeCompare(GridConstants.NORTH_CHAR, undefined, {
          sensitivity: "base",
        }) === 0
        ? Hemisphere.North
        : Hemisphere.South;
    const easting = +matches[3];
    const northing = +matches[4];

    return UTM.create(zone, hemisphere, easting, northing);
  }

  /**
   * Create from a coordinate, zone number, and hemisphere
   *
   * @param point
   *            coordinate
   * @param zone
   *            zone number
   * @param hemisphere
   *            hemisphere
   * @return UTM
   */
  public static from(
    point: Point,
    zone?: number,
    hemisphere?: Hemisphere,
  ): UTM {
    if (!zone) {
      zone = GridZones.getZoneNumberFromPoint(point);
    }
    if (!hemisphere) {
      hemisphere = HemisphereUtils.from(point);
    }

    point = point.toDegrees();

    const latitude = point.getLatitude();
    const longitude = point.getLongitude();

    let easting = ((0.5 *
          Math.log(
            (1 +
              Math.cos((latitude * Math.PI) / 180) *
                Math.sin(
                  (longitude * Math.PI) / 180 -
                    ((6 * zone - 183) * Math.PI) / 180,
                )) /
              (1 -
                Math.cos((latitude * Math.PI) / 180) *
                  Math.sin(
                    (longitude * Math.PI) / 180 -
                      ((6 * zone - 183) * Math.PI) / 180,
                  )),
          ) *
          0.9996 *
          6399593.62) /
          (1 + 0.0820944379 ** 2 * Math.cos((latitude * Math.PI) / 180) ** 2) **
            0.5) *
        (1 +
          ((0.0820944379 ** 2 / 2) *
              (0.5 *
                  Math.log(
                    (1 +
                      Math.cos((latitude * Math.PI) / 180) *
                        Math.sin(
                          (longitude * Math.PI) / 180 -
                            ((6 * zone - 183) * Math.PI) / 180,
                        )) /
                      (1 -
                        Math.cos((latitude * Math.PI) / 180) *
                          Math.sin(
                            (longitude * Math.PI) / 180 -
                              ((6 * zone - 183) * Math.PI) / 180,
                          )),
                  )) **
                2 *
              Math.cos((latitude * Math.PI) / 180) ** 2) /
            3) +
      500000;
    easting = Math.round(easting * 100) * 0.01;

    let northing = (((Math.atan(
          Math.tan((latitude * Math.PI) / 180) /
            Math.cos(
              (longitude * Math.PI) / 180 - ((6 * zone - 183) * Math.PI) / 180,
            ),
        ) -
          (latitude * Math.PI) / 180) *
          0.9996 *
          6399593.625) /
          Math.sqrt(
            1 + 0.006739496742 * Math.cos((latitude * Math.PI) / 180) ** 2,
          )) *
        (1 +
          (0.006739496742 / 2) *
            (0.5 *
                Math.log(
                  (1 +
                    Math.cos((latitude * Math.PI) / 180) *
                      Math.sin(
                        (longitude * Math.PI) / 180 -
                          ((6 * zone - 183) * Math.PI) / 180,
                      )) /
                    (1 -
                      Math.cos((latitude * Math.PI) / 180) *
                        Math.sin(
                          (longitude * Math.PI) / 180 -
                            ((6 * zone - 183) * Math.PI) / 180,
                        )),
                )) **
              2 *
            Math.cos((latitude * Math.PI) / 180) ** 2) +
      0.9996 *
        6399593.625 *
        ((latitude * Math.PI) / 180 -
          0.005054622556 *
            ((latitude * Math.PI) / 180 +
              Math.sin((2 * latitude * Math.PI) / 180) / 2) +
          (4.258201531e-5 *
              (3 *
                  ((latitude * Math.PI) / 180 +
                    Math.sin((2 * latitude * Math.PI) / 180) / 2) +
                Math.sin((2 * latitude * Math.PI) / 180) *
                  Math.cos((latitude * Math.PI) / 180) ** 2)) /
            4 -
          (1.674057895e-7 *
              ((5 *
                    (3 *
                        ((latitude * Math.PI) / 180 +
                          Math.sin((2 * latitude * Math.PI) / 180) / 2) +
                      Math.sin((2 * latitude * Math.PI) / 180) *
                        Math.cos((latitude * Math.PI) / 180) ** 2)) /
                  4 +
                Math.sin((2 * latitude * Math.PI) / 180) *
                  Math.cos((latitude * Math.PI) / 180) ** 2 *
                  Math.cos((latitude * Math.PI) / 180) ** 2)) /
            3);

    if (hemisphere === Hemisphere.South) {
      northing += 10000000;
    }

    northing = Math.round(northing * 100) * 0.01;

    return UTM.create(zone, hemisphere, easting, northing);
  }
}
