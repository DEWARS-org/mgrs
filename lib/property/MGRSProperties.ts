import { GridProperties } from "@dewars/grid";
import config from "../../resources/mgrs.json" with { type: "json" };

/**
 * MGRS property loader
 */
export class MGRSProperties extends GridProperties {
  /**
   * Singleton instance
   */
  public static instance = new MGRSProperties(config);

  /**
   * Get the singleton instance
   *
   * @return instance
   */
  public static getInstance(): MGRSProperties {
    return MGRSProperties.instance;
  }
}
