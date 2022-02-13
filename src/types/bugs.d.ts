import type { TAppearanceHemisphereInfo, TRarityLevel, TValidMonth } from "./common";

export type TBug = {
  /**
   * The URL to the Nookipedia page for this bug.
   */
  url: string;
  /**
   * The name of this bug.
   */
  name: string;
  /**
   * TODO: what is this?
   */
  number: number;
  /**
   * The URL for the image of this bug.
   */
  image_url: string;
  /**
   * The URL for the rendered model of this bug.
   */
  render_url: string;
  /**
   * The time this bug can be caught.
   *
   * IMPORTANT: This doesn't appear to be sent by the API, though it is typed incase it's a Partial type.
   */
  time?: string;
  /**
   * The location this bug may be found in.
   */
  location: string;
  /**
   * The rarity level of this bug.
   */
  rarity: TRarityLevel;
  /**
   * TODO: what is this?
   */
  total_catch: number;
  /**
   * The price this bug will sell for at Nook's Cranny.
   */
  sell_nook: number;
  /**
   * The price this bug will sell for with CJ.
   */
  sell_flick: number;
  /**
   * The width of this bug's tank.
   */
  tank_width: number;
  /**
   * The length of this bug's tank.
   */
  tank_length: number;
  /**
   * The catchphrases said when catching this bug.
   */
  catchphrases: Array<string>;
  /**
   * Info about the bug's appearance through the year (North Hemisphere).
   */
  north: TAppearanceHemisphereInfo;
  /**
   * Info about the bug's appearance through the year (South Hemisphere).
   */
  south: TAppearanceHemisphereInfo;
};

export type TBugExcludeDetails = string;

export type TBugFilterSingle = {
  /**
   * The name of the bug you wish to retrieve information about.
   */
  bug: string;
  /**
   * Specify the desired width of returned image URLs.
   *
   * When unspecified, the linked image(s) returned by the API will be full-resolution.
   * Note that images can only be reduced in size; specifying a width greater than than the maximum
   * size will return the default full-size image URL. Note that requesting specific image sizes
   * for long lists may result in a very long response time.
   */
  thumbsize?: string;
};

export type TBugFilterMany = {
  /**
   * Specify the desired width of returned image URLs.
   *
   * When unspecified, the linked image(s) returned by the API will be full-resolution.
   * Note that images can only be reduced in size; specifying a width greater than than the maximum
   * size will return the default full-size image URL. Note that requesting specific image sizes
   * for long lists may result in a very long response time.
   */
  thumbsize?: string;
  /**
   * Retrive only the bug that are available in a specific month.
   *
   * Value may be the month's name (jan, january) or the integer representing the month (01, 1).
   *
   * When current is specified, the return body will be an object with two arrays inside,
   * one called north and the other south containing the bug available in each respective hemisphere.
   *
   * Note that the current month is calculated based off the API server's time,
   * so it may be slightly off for you at the beginning or end of the month.
   */
  month?: TValidMonth | "current";
};

export type TBugFilterExcludeDetails = TBugFilterMany & {
  /**
   * Exclude information.
   *
   * When set to true, only bug names are returned.
   * Instead of an array of objects with all details, the return will be an array of strings.
   */
   excludedetails: true;
}
