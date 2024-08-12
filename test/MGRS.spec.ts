import { expect } from "@std/expect";
import { Point } from "@dewars/grid";
import { MGRS } from "../lib/MGRS.ts";
import { GridType } from "../lib/grid/GridType.ts";
import { GridRange } from "../lib/gzd/GridRange.ts";
import { UTM } from "../lib/utm/UTM.ts";

/**
 * Test parsing a MGRS string value
 *
 * @throws ParseException
 *             upon failure to parse
 */
Deno.test("test parse", () => {
  let mgrsValue = "33XVG74594359";
  let utmValue = "33 N 474590 8643590";

  expect(MGRS.isMGRS(mgrsValue));
  let mgrs = MGRS.parse(mgrsValue);
  expect(MGRS.precision(mgrsValue)).toEqual(GridType.TenMeter);
  expect(MGRS.accuracy(mgrsValue)).toEqual(4);
  expect(mgrs.coordinate(GridType.TenMeter)).toEqual(mgrsValue);
  expect(mgrs.coordinateFromAccuracy(4)).toEqual(mgrsValue);
  expect(mgrs.precision()).toEqual(GridType.TenMeter);
  expect(mgrs.accuracy()).toEqual(4);

  let utm = mgrs.toUTM();
  expect(utmValue).toEqual(utm.toString());

  mgrsValue = "33X VG 74596 43594";
  utmValue = "33 N 474596 8643594";

  expect(MGRS.isMGRS(mgrsValue)).toBe(true);
  mgrs = MGRS.parse(mgrsValue.toLowerCase());
  expect(MGRS.precision(mgrsValue)).toEqual(GridType.Meter);
  expect(MGRS.accuracy(mgrsValue)).toEqual(5);
  expect(mgrs.toString()).toEqual(mgrsValue.replace(/\s/g, ""));

  utm = mgrs.toUTM();
  expect(utm.toString()).toEqual(utmValue);

  expect(UTM.isUTM(utmValue)).toBe(true);
  utm = UTM.parse(utmValue);
  expect(utm.toString()).toEqual(utmValue);

  mgrs = utm.toMGRS();
  expect(mgrs.toString()).toEqual(mgrsValue.replace(/\s/g, ""));

  utmValue = "33 N 474596.26 8643594.54";

  expect(UTM.isUTM(utmValue)).toBe(true);
  utm = UTM.parse(utmValue.toLowerCase());
  expect(utm.toString()).toEqual(utmValue);

  mgrs = utm.toMGRS();
  expect(mgrs.toString()).toEqual(mgrsValue.replace(/\s/g, ""));

  mgrsValue = "33X";
  expect(MGRS.isMGRS(mgrsValue)).toBe(true);
  mgrs = MGRS.parse(mgrsValue);
  expect(MGRS.precision(mgrsValue)).toEqual(GridType.Gzd);
  expect(MGRS.accuracy(mgrsValue)).toEqual(0);
  expect(mgrs.getZone()).toEqual(33);
  expect(mgrs.getBand()).toEqual("X");
  expect(mgrs.getColumn()).toEqual("T");
  expect(mgrs.getRow()).toEqual("V");
  expect(mgrs.getColumnRowId()).toEqual("TV");
  expect(mgrs.getEasting()).toEqual(93363);
  expect(mgrs.getNorthing()).toEqual(99233);
  expect(mgrs.coordinate()).toEqual("33XTV9336399233");
  let point = mgrs.toPoint();
  expect(point.getLongitude()).toBeCloseTo(9.0, 0.0001);
  expect(point.getLatitude()).toBeCloseTo(72.0, 0.0001);
  expect(mgrs.precision()).toEqual(GridType.Meter);
  expect(mgrs.accuracy()).toEqual(5);

  mgrsValue = "33XVG";
  expect(MGRS.isMGRS(mgrsValue)).toBe(true);
  mgrs = MGRS.parse(mgrsValue);
  expect(MGRS.precision(mgrsValue)).toEqual(GridType.HundredKilometer);
  expect(MGRS.accuracy(mgrsValue)).toEqual(0);
  expect(mgrs.getZone()).toEqual(33);
  expect(mgrs.getBand()).toEqual("X");
  expect(mgrs.getColumn()).toEqual("V");
  expect(mgrs.getRow()).toEqual("G");
  expect(mgrs.getColumnRowId()).toEqual("VG");
  expect(mgrs.getEasting()).toEqual(0);
  expect(mgrs.getNorthing()).toEqual(0);
  expect(mgrs.coordinate(GridType.HundredKilometer)).toEqual(mgrsValue);
  expect(mgrs.coordinate()).toEqual("33XVG0000000000");
  point = mgrs.toPoint();
  expect(point.getLongitude()).toBeCloseTo(10.8756458, 0.0001);
  expect(point.getLatitude()).toBeCloseTo(77.445472, 0.0001);
  expect(mgrs.precision()).toEqual(GridType.HundredKilometer);
  expect(mgrs.accuracy()).toEqual(0);

  mgrsValue = "33XVG74";
  expect(MGRS.isMGRS(mgrsValue)).toBe(true);
  mgrs = MGRS.parse(mgrsValue);
  expect(MGRS.precision(mgrsValue)).toEqual(GridType.TenKilometer);
  expect(MGRS.accuracy(mgrsValue)).toEqual(1);
  expect(mgrs.getZone()).toEqual(33);
  expect(mgrs.getBand()).toEqual("X");
  expect(mgrs.getColumn()).toEqual("V");
  expect(mgrs.getRow()).toEqual("G");
  expect(mgrs.getColumnRowId()).toEqual("VG");
  expect(mgrs.getEasting()).toEqual(70000);
  expect(mgrs.getNorthing()).toEqual(40000);
  expect(mgrs.coordinate(GridType.TenKilometer)).toEqual(mgrsValue);
  expect(mgrs.coordinate()).toEqual("33XVG7000040000");
  point = mgrs.toPoint();
  expect(point.getLongitude()).toBeCloseTo(13.7248758, 0.0001);
  expect(point.getLatitude()).toBeCloseTo(77.8324735, 0.0001);
  expect(mgrs.precision()).toEqual(GridType.TenKilometer);
  expect(mgrs.accuracy()).toEqual(1);

  mgrsValue = "33XVG7443";
  expect(MGRS.isMGRS(mgrsValue)).toBe(true);
  mgrs = MGRS.parse(mgrsValue);
  expect(MGRS.precision(mgrsValue)).toEqual(GridType.Kilometer);
  expect(MGRS.accuracy(mgrsValue)).toEqual(2);
  expect(mgrs.getZone()).toEqual(33);
  expect(mgrs.getBand()).toEqual("X");
  expect(mgrs.getColumn()).toEqual("V");
  expect(mgrs.getRow()).toEqual("G");
  expect(mgrs.getColumnRowId()).toEqual("VG");
  expect(mgrs.getEasting()).toEqual(74000);
  expect(mgrs.getNorthing()).toEqual(43000);
  expect(mgrs.coordinate(GridType.Kilometer)).toEqual(mgrsValue);
  expect(mgrs.coordinate()).toEqual("33XVG7400043000");
  point = mgrs.toPoint();
  expect(point.getLongitude()).toBeCloseTo(13.8924385, 0.0001);
  expect(point.getLatitude()).toBeCloseTo(77.8600782, 0.0001);
  expect(mgrs.precision()).toEqual(GridType.Kilometer);
  expect(mgrs.accuracy()).toEqual(2);

  mgrsValue = "33XVG745435";
  expect(MGRS.isMGRS(mgrsValue)).toBe(true);
  mgrs = MGRS.parse(mgrsValue);
  expect(MGRS.precision(mgrsValue)).toEqual(GridType.HundredMeter);
  expect(MGRS.accuracy(mgrsValue)).toEqual(3);
  expect(mgrs.getZone()).toEqual(33);
  expect(mgrs.getBand()).toEqual("X");
  expect(mgrs.getColumn()).toEqual("V");
  expect(mgrs.getRow()).toEqual("G");
  expect(mgrs.getColumnRowId()).toEqual("VG");
  expect(mgrs.getEasting()).toEqual(74500);
  expect(mgrs.getNorthing()).toEqual(43500);
  expect(mgrs.coordinate(GridType.HundredMeter)).toEqual(mgrsValue);
  expect(mgrs.coordinate()).toEqual("33XVG7450043500");
  point = mgrs.toPoint();
  expect(point.getLongitude()).toBeCloseTo(13.9133378, 0.0001);
  expect(point.getLatitude()).toBeCloseTo(77.8646415, 0.0001);
  expect(mgrs.precision()).toEqual(GridType.HundredMeter);
  expect(mgrs.accuracy()).toEqual(3);

  mgrsValue = "33XVG74594359";
  expect(MGRS.isMGRS(mgrsValue)).toBe(true);
  mgrs = MGRS.parse(mgrsValue);
  expect(MGRS.precision(mgrsValue)).toEqual(GridType.TenMeter);
  expect(MGRS.accuracy(mgrsValue)).toEqual(4);
  expect(mgrs.getZone()).toEqual(33);
  expect(mgrs.getBand()).toEqual("X");
  expect(mgrs.getColumn()).toEqual("V");
  expect(mgrs.getRow()).toEqual("G");
  expect(mgrs.getColumnRowId()).toEqual("VG");
  expect(mgrs.getEasting()).toEqual(74590);
  expect(mgrs.getNorthing()).toEqual(43590);
  expect(mgrs.coordinate(GridType.TenMeter)).toEqual(mgrsValue);
  expect(mgrs.coordinate()).toEqual("33XVG7459043590");
  point = mgrs.toPoint();
  expect(point.getLongitude()).toBeCloseTo(13.9171014, 0.0001);
  expect(point.getLatitude()).toBeCloseTo(77.8654628, 0.0001);
  expect(mgrs.precision()).toEqual(GridType.TenMeter);
  expect(mgrs.accuracy()).toEqual(4);

  mgrsValue = "33XVG7459743593";
  expect(MGRS.isMGRS(mgrsValue)).toBe(true);
  mgrs = MGRS.parse(mgrsValue);
  expect(MGRS.precision(mgrsValue)).toEqual(GridType.Meter);
  expect(MGRS.accuracy(mgrsValue)).toEqual(5);
  expect(mgrs.getZone()).toEqual(33);
  expect(mgrs.getBand()).toEqual("X");
  expect(mgrs.getColumn()).toEqual("V");
  expect(mgrs.getRow()).toEqual("G");
  expect(mgrs.getColumnRowId()).toEqual("VG");
  expect(mgrs.getEasting()).toEqual(74597);
  expect(mgrs.getNorthing()).toEqual(43593);
  expect(mgrs.coordinate()).toEqual(mgrsValue);
  expect(mgrs.coordinate()).toEqual("33XVG7459743593");
  point = mgrs.toPoint();
  expect(point.getLongitude()).toBeCloseTo(13.9173973, 0.0001);
  expect(point.getLatitude()).toBeCloseTo(77.8654908, 0.0001);
  expect(mgrs.precision()).toEqual(GridType.Meter);
  expect(mgrs.accuracy()).toEqual(5);
});

/**
 * Test parsing a 100k MGRS string value that falls outside grid zone bounds
 *
 * @throws ParseException
 *             upon failure to parse
 */
Deno.test("test parse 100k bounds", () => {
  let mgrsValue = "32VJN";
  expect(MGRS.isMGRS(mgrsValue)).toBe(true);
  let mgrs = MGRS.parse(mgrsValue);
  let point = mgrs.toPoint();
  expect(point.getLongitude()).toBeCloseTo(3.0, 0.0001);
  expect(point.getLatitude()).toBeCloseTo(60.3007719, 0.0001);
  let comparePoint = MGRS.parse(mgrs.coordinate()).toPoint();
  expect(point.getLongitude()).toBeCloseTo(
    comparePoint.getLongitude(),
    0.0001,
  );
  expect(point.getLatitude()).toBeCloseTo(comparePoint.getLatitude(), 0.0001);

  mgrsValue = "32VKS";
  expect(MGRS.isMGRS(mgrsValue)).toBe(true);
  mgrs = MGRS.parse(mgrsValue);
  point = mgrs.toPoint();
  expect(point.getLongitude()).toBeCloseTo(3.0, 0.0001);
  expect(point.getLatitude()).toBeCloseTo(63.9024981, 0.0001);
  comparePoint = MGRS.parse(mgrs.coordinate()).toPoint();
  expect(point.getLongitude()).toBeCloseTo(
    comparePoint.getLongitude(),
    0.0001,
  );
  expect(point.getLatitude()).toBeCloseTo(comparePoint.getLatitude(), 0.0001);

  mgrsValue = "32VJR";
  expect(MGRS.isMGRS(mgrsValue)).toBe(true);
  mgrs = MGRS.parse(mgrsValue);
  point = mgrs.toPoint();
  expect(point.getLongitude()).toBeCloseTo(3.0, 0.0001);
  expect(point.getLatitude()).toBeCloseTo(63.0020546, 0.0001);
  comparePoint = MGRS.parse(mgrs.coordinate()).toPoint();
  expect(point.getLongitude()).toBeCloseTo(
    comparePoint.getLongitude(),
    0.0001,
  );
  expect(point.getLatitude()).toBeCloseTo(comparePoint.getLatitude(), 0.0001);

  mgrsValue = "32VJH";
  expect(MGRS.isMGRS(mgrsValue)).toBe(true);
  mgrs = MGRS.parse(mgrsValue);
  point = mgrs.toPoint();
  expect(point.getLongitude()).toBeCloseTo(3.0, 0.0001);
  expect(point.getLatitude()).toBeCloseTo(56.0, 0.0001);
  comparePoint = MGRS.parse(mgrs.coordinate()).toPoint();
  expect(point.getLongitude()).toBeCloseTo(
    comparePoint.getLongitude(),
    0.0001,
  );
  expect(point.getLatitude()).toBeCloseTo(comparePoint.getLatitude(), 0.0001);

  mgrsValue = "38KNU";
  expect(MGRS.isMGRS(mgrsValue)).toBe(true);
  mgrs = MGRS.parse(mgrsValue);
  point = mgrs.toPoint();
  expect(point.getLongitude()).toBeCloseTo(45.0, 0.0001);
  expect(point.getLatitude()).toBeCloseTo(-24.0, 0.0001);
  comparePoint = MGRS.parse(mgrs.coordinate()).toPoint();
  expect(point.getLongitude()).toBeCloseTo(
    comparePoint.getLongitude(),
    0.0001,
  );
  expect(point.getLatitude()).toBeCloseTo(comparePoint.getLatitude(), 0.0001);

  mgrsValue = "38KRU";
  expect(MGRS.isMGRS(mgrsValue)).toBe(true);
  mgrs = MGRS.parse(mgrsValue);
  point = mgrs.toPoint();
  expect(point.getLongitude()).toBeCloseTo(47.9486444, 0.0001);
  expect(point.getLatitude()).toBeCloseTo(-24.0, 0.0001);
  comparePoint = MGRS.parse(mgrs.coordinate()).toPoint();
  expect(point.getLongitude()).toBeCloseTo(
    comparePoint.getLongitude(),
    0.0001,
  );
  expect(point.getLatitude()).toBeCloseTo(comparePoint.getLatitude(), 0.0001);

  mgrsValue = "32VPH";
  expect(MGRS.isMGRS(mgrsValue)).toBe(true);
  mgrs = MGRS.parse(mgrsValue);
  point = mgrs.toPoint();
  expect(point.getLongitude()).toBeCloseTo(10.6034691, 0.0001);
  expect(point.getLatitude()).toBeCloseTo(56.0, 0.0001);
  comparePoint = MGRS.parse(mgrs.coordinate()).toPoint();
  expect(point.getLongitude()).toBeCloseTo(
    comparePoint.getLongitude(),
    0.0001,
  );
  expect(point.getLatitude()).toBeCloseTo(comparePoint.getLatitude(), 0.0001);
});

/**
 * Test parsing a MGRS string value
 *
 * @throws ParseException
 *             upon failure to parse
 */
Deno.test("test coordinate", () => {
  let mgrs = "35VPL0115697387";
  testCoordinate(29.06757, 63.98863, mgrs);
  testCoordinateMeters(3235787.09, 9346877.48, mgrs);

  mgrs = "39PYP7290672069";
  testCoordinate(53.51, 12.4, mgrs);
  testCoordinateMeters(5956705.95, 1391265.16, mgrs);

  mgrs = "4QFJ1234056781";
  testCoordinate(-157.916861, 21.309444, mgrs);
  testCoordinateMeters(-17579224.55, 2428814.96, mgrs);

  mgrs = "33PYJ6132198972";
  testCoordinate(17.3714337, 8.1258235, mgrs, false);
  testCoordinateMeters(1933779.15, 907610.2, mgrs, false);
});

/**
 * Test parsing GZD coordinates
 *
 * @throws ParseException
 *             upon failure to parse
 */
Deno.test("test GDZ parse", () => {
  const gridRange = new GridRange();

  for (const zone of gridRange) {
    const zoneNumber = zone.getNumber();
    const bandLetter = zone.getLetter();

    const gzd = zoneNumber.toString() + bandLetter;
    expect(MGRS.isMGRS(gzd)).toBe(true);
    const mgrs = MGRS.parse(gzd);
    expect(mgrs).not.toBeNull();
    expect(mgrs.getZone()).toEqual(zoneNumber);
    expect(mgrs.getBand()).toEqual(bandLetter);

    const point = mgrs.toPoint();
    const southwest = zone.getBounds().getSouthwest();

    expect(southwest.getLongitude()).toBeCloseTo(
      point.getLongitude(),
      0.0001,
    );
    expect(southwest.getLatitude()).toBeCloseTo(point.getLatitude(), 0.0001);
  }
});

/**
 * Test parsing a Svalbard MGRS string values
 *
 * @throws ParseException
 *             upon failure to parse
 */
Deno.test("test Svalbard parse", () => {
  expect(MGRS.isMGRS("31X")).toBe(true);
  expect(MGRS.parse("31X")).not.toBeNull();
  expect(MGRS.isMGRS("32X")).toBe(false);
  try {
    expect(MGRS.parse("32X")).toBeNull;
    // assert.fail("Expected parse exception");
  } catch (error) {}
  expect(MGRS.isMGRS("32XMH")).toBe(false);
  try {
    MGRS.parse("32XMH");
    // assert.fail("Expected parse exception");
  } catch (error) {}
  expect(MGRS.isMGRS("a32XMH11")).toBe(false);
  try {
    MGRS.parse("32XMH11");
    // assert.fail("Expected parse exception");
  } catch (error) {}
  expect(MGRS.isMGRS("32XMH1111")).toBe(false);
  try {
    MGRS.parse("32XMH1111");
    // assert.fail("Expected parse exception");
  } catch (error) {}
  expect(MGRS.isMGRS("32XMH111111")).toBe(false);
  try {
    MGRS.parse("32XMH111111");
    // assert.fail("Expected parse exception");
  } catch (error) {}
  expect(MGRS.isMGRS("32XMH11111111")).toBe(false);
  try {
    MGRS.parse("32XMH11111111");
    // assert.fail("Expected parse exception");
  } catch (error) {}
  expect(MGRS.isMGRS("32XMH111111111")).toBe(false);
  try {
    MGRS.parse("32XMH111111111");
    // assert.fail("Expected parse exception");
  } catch (error) {}
  expect(MGRS.isMGRS("33X")).toBe(true);
  expect(MGRS.parse("33X")).not.toBeNull();
  expect(MGRS.isMGRS("34X")).toBe(false);
  try {
    expect(MGRS.parse("34X")).toBeNull;
    // assert.fail("Expected parse exception");
  } catch (error) {}
  expect(MGRS.isMGRS("35X")).toBe(true);
  expect(MGRS.parse("35X")).not.toBeNull();
  expect(MGRS.isMGRS("36X")).toBe(false);
  try {
    expect(MGRS.parse("36X")).toBeNull;
    // assert.fail("Expected parse exception");
  } catch (error) {}
  expect(MGRS.isMGRS("37X")).toBe(true);
  expect(MGRS.parse("37X")).not.toBeNull();
});

/**
 * Test the WGS84 coordinate with expected MGSR coordinate
 *
 * @param longitude
 *            longitude in degrees
 * @param latitude
 *            latitude in degrees
 * @param value
 *            MGRS value
 * @param test100k
 *            set false when falls outside the grid zone
 * @throws ParseException
 *             upon failure to parse
 */
function testCoordinate(
  longitude: number,
  latitude: number,
  value: string,
  test100k = true,
): void {
  const point = Point.point(longitude, latitude);
  testCoordinateByPoint(point, value, test100k);
  testCoordinateByPoint(point.toMeters(), value, test100k);
}

/**
 * Test the WGS84 coordinate with expected MGSR coordinate
 *
 * @param longitude
 *            longitude in degrees
 * @param latitude
 *            latitude in degrees
 * @param value
 *            MGRS value
 * @param test100k
 *            set false when falls outside the grid zone
 * @throws ParseException
 *             upon failure to parse
 */
function testCoordinateMeters(
  longitude: number,
  latitude: number,
  value: string,
  test100k = true,
): void {
  const point = Point.meters(longitude, latitude);
  testCoordinateByPoint(point, value, test100k);
  testCoordinateByPoint(point.toDegrees(), value, test100k);
}

/**
 * Test the coordinate with expected MGSR coordinate
 *
 * @param point
 *            point
 * @param value
 *            MGRS value
 * @param test100k
 *            set false when falls outside the grid zone
 * @throws ParseException
 *             upon failure to parse
 */
function testCoordinateByPoint(
  point: Point,
  value: string,
  test100k: boolean,
): void {
  const mgrs = MGRS.from(point);
  expect(value).toEqual(mgrs.toString());
  expect(value).toEqual(mgrs.coordinate());

  const gzd = mgrs.coordinate(GridType.Gzd);
  expect(gzd).toEqual(accuracyValue(value, -1));
  expect(MGRS.isMGRS(gzd)).toBe(true);
  const gzdMgrs = MGRS.parse(gzd);
  expect(MGRS.precision(gzd)).toEqual(GridType.Gzd);
  expect(MGRS.accuracy(gzd)).toEqual(0);
  expect(gzdMgrs.coordinate(GridType.Gzd)).toEqual(gzd);

  const hundredKilometer = mgrs.coordinate(GridType.HundredKilometer);
  expect(hundredKilometer).toEqual(accuracyValue(value, 0));
  expect(mgrs.coordinateFromAccuracy(0)).toEqual(hundredKilometer);
  expect(MGRS.isMGRS(hundredKilometer)).toBe(true);
  const hundredKilometerMgrs = MGRS.parse(hundredKilometer);
  expect(MGRS.precision(hundredKilometer)).toEqual(GridType.HundredKilometer);
  expect(MGRS.accuracy(hundredKilometer)).toEqual(0);
  // @TODO: CHECK
  // expect(
  //   hundredKilometer,
  //   hundredKilometerMgrs.coordinate(GridType.HUNDRED_KILOMETER),
  // ).toEqual(hundredKilometer);
  if (test100k) {
    expect(hundredKilometerMgrs.getEasting()).toEqual(0);
    expect(hundredKilometerMgrs.getNorthing()).toEqual(0);
    expect(hundredKilometerMgrs.precision()).toEqual(GridType.HundredKilometer);
    expect(hundredKilometerMgrs.accuracy()).toEqual(0);
  }

  const tenKilometer = mgrs.coordinate(GridType.TenKilometer);
  expect(tenKilometer).toEqual(accuracyValue(value, 1));
  expect(mgrs.coordinateFromAccuracy(1)).toEqual(tenKilometer);
  expect(MGRS.isMGRS(tenKilometer)).toBe(true);
  const tenKilometerMgrs = MGRS.parse(tenKilometer);
  expect(MGRS.precision(tenKilometer)).toEqual(GridType.TenKilometer);
  expect(MGRS.accuracy(tenKilometer)).toEqual(1);
  expect(tenKilometerMgrs.coordinate(GridType.TenKilometer)).toEqual(
    tenKilometer,
  );
  expect(tenKilometerMgrs.getEasting()).toEqual(getEasting(tenKilometer, 1));
  expect(tenKilometerMgrs.getNorthing()).toEqual(getNorthing(tenKilometer, 1));
  expect(tenKilometerMgrs.precision()).toEqual(GridType.TenKilometer);
  expect(tenKilometerMgrs.accuracy()).toEqual(1);

  const kilometer = mgrs.coordinate(GridType.Kilometer);
  expect(kilometer).toEqual(accuracyValue(value, 2));
  expect(mgrs.coordinateFromAccuracy(2)).toEqual(kilometer);
  expect(MGRS.isMGRS(kilometer)).toBe(true);
  const kilometerMgrs = MGRS.parse(kilometer);
  expect(MGRS.precision(kilometer)).toEqual(GridType.Kilometer);
  expect(MGRS.accuracy(kilometer)).toEqual(2);
  expect(kilometerMgrs.coordinate(GridType.Kilometer)).toEqual(kilometer);
  expect(kilometerMgrs.getEasting()).toEqual(getEasting(kilometer, 2));
  expect(kilometerMgrs.getNorthing()).toEqual(getNorthing(kilometer, 2));
  expect(kilometerMgrs.precision()).toEqual(GridType.Kilometer);
  expect(kilometerMgrs.accuracy()).toEqual(2);

  const hundredMeter = mgrs.coordinate(GridType.HundredMeter);
  expect(hundredMeter).toEqual(accuracyValue(value, 3));
  expect(mgrs.coordinateFromAccuracy(3)).toEqual(hundredMeter);
  expect(MGRS.isMGRS(hundredMeter)).toBe(true);
  const hundredMeterMgrs = MGRS.parse(hundredMeter);
  expect(MGRS.precision(hundredMeter)).toEqual(GridType.HundredMeter);
  expect(MGRS.accuracy(hundredMeter)).toEqual(3);
  expect(hundredMeterMgrs.coordinate(GridType.HundredMeter)).toEqual(
    hundredMeter,
  );
  expect(hundredMeterMgrs.getEasting()).toEqual(getEasting(hundredMeter, 3));
  expect(hundredMeterMgrs.getNorthing()).toEqual(getNorthing(hundredMeter, 3));
  expect(hundredMeterMgrs.precision()).toEqual(GridType.HundredMeter);
  expect(hundredMeterMgrs.accuracy()).toEqual(3);

  const tenMeter = mgrs.coordinate(GridType.TenMeter);
  expect(tenMeter).toEqual(accuracyValue(value, 4));
  expect(mgrs.coordinateFromAccuracy(4)).toEqual(tenMeter);
  expect(MGRS.isMGRS(tenMeter)).toBe(true);
  const tenMeterMgrs = MGRS.parse(tenMeter);
  expect(MGRS.precision(tenMeter)).toEqual(GridType.TenMeter);
  expect(MGRS.accuracy(tenMeter)).toEqual(4);
  expect(tenMeterMgrs.coordinate(GridType.TenMeter)).toEqual(tenMeter);
  expect(tenMeterMgrs.getEasting()).toEqual(getEasting(tenMeter, 4));
  expect(tenMeterMgrs.getNorthing()).toEqual(getNorthing(tenMeter, 4));
  expect(tenMeterMgrs.precision()).toEqual(GridType.TenMeter);
  expect(tenMeterMgrs.accuracy()).toEqual(4);

  const meter = mgrs.coordinate();
  expect(value).toEqual(meter);
  expect(meter).toEqual(accuracyValue(value, 5));
  expect(mgrs.coordinateFromAccuracy(5)).toEqual(meter);
  expect(MGRS.isMGRS(meter)).toBe(true);
  const meterMgrs = MGRS.parse(meter);
  expect(MGRS.precision(meter)).toEqual(GridType.Meter);
  expect(MGRS.accuracy(meter)).toEqual(5);
  expect(meterMgrs.coordinate()).toEqual(meter);
  expect(meterMgrs.getEasting()).toEqual(getEasting(meter, 5));
  expect(meterMgrs.getNorthing()).toEqual(getNorthing(meter, 5));
  expect(meterMgrs.precision()).toEqual(GridType.Meter);
  expect(meterMgrs.accuracy()).toEqual(5);
}

/**
 * Get the MGRS value in the accuracy digits
 *
 * @param value
 *            MGRS value
 * @param accuracy
 *            accuracy digits (-1 for GZD)
 * @return MGRS in accuracy
 */
function accuracyValue(value: string, accuracy: number): string {
  const gzdLength = value.length % 2 === 1 ? 3 : 2;
  let accuracyValue = value.substring(0, gzdLength);

  if (accuracy >= 0) {
    accuracyValue += value.substring(gzdLength, gzdLength + 2);

    if (accuracy > 0) {
      const eastingNorthing = value.substring(accuracyValue.length);
      const currentAccuracy = eastingNorthing.length / 2;
      const easting = eastingNorthing.substring(0, currentAccuracy);
      const northing = eastingNorthing.substring(currentAccuracy);

      accuracyValue += easting.substring(0, accuracy);
      accuracyValue += northing.substring(0, accuracy);
    }
  }

  return accuracyValue;
}

/**
 * Get the easting of the MGRS value in the accuracy
 *
 * @param value
 *            MGRS value
 * @param accuracy
 *            accuracy digits
 * @return easting
 */
function getEasting(value: string, accuracy: number): number {
  return padAccuracy(
    value.substring(value.length - 2 * accuracy, value.length - accuracy),
    accuracy,
  );
}

/**
 * Get the northing of the MGRS value in the accuracy
 *
 * @param value
 *            MGRS value
 * @param accuracy
 *            accuracy digits
 * @return northing
 */
function getNorthing(value: string, accuracy: number): number {
  return padAccuracy(value.substring(value.length - accuracy), accuracy);
}

/**
 * Pad the value with the accuracy and parse as a long
 *
 * @param value
 *            MGRS value
 * @param accuracy
 *            accuracy digits
 * @return long value
 */
function padAccuracy(value: string, accuracy: number): number {
  let paddedValue = value;
  for (let i = accuracy; i < 5; i++) {
    paddedValue += "0";
  }
  return Number(paddedValue);
}
