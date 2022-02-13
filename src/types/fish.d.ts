import type { TAppearanceHemisphereInfo, TRarityLevel, TValidMonth } from "./common";

export type TFish = {
  /**
   * The URL to the Nookipedia page for this fish.
   */
  url: string;
  /**
   * The name of this fish.
   */
  name: string;
  /**
   * TODO: what is this?
   */
  number: number;
  /**
   * The URL for the image of this fish.
   */
  image_url: string;
  /**
   * The URL for the rendered model of this fish.
   */
  render_url: string;
  /**
   * The time this fish can be caught.
   *
   * IMPORTANT: This doesn't appear to be sent by the API, though it is typed incase it's a Partial type.
   */
  time?: string;
  /**
   * The location this fish may be found in.
   */
  location: string;
  /**
   * The size of this fish's shadow.
   */
  shadow_size: string;
  /**
   * The rarity level of this fish.
   */
  rarity: TRarityLevel;
  /**
   * TODO: what is this?
   */
  total_catch: number;
  /**
   * The price this fish will sell for at Nook's Cranny.
   */
  sell_nook: number;
  /**
   * The price this fish will sell for with CJ.
   */
  sell_cj: number;
  /**
   * The width of this fish's tank.
   */
  tank_width: number;
  /**
   * The length of this fish's tank.
   */
  tank_length: number;
  /**
   * The catchphrases said when catching this fish.
   */
  catchphrases: Array<string>;
  /**
   * Info about the fish's appearance through the year (North Hemisphere).
   */
  north: TAppearanceHemisphereInfo;
  /**
   * Info about the fish's appearance through the year (South Hemisphere).
   */
  south: TAppearanceHemisphereInfo;
};

export type TFishExcludeDetails = string;

export type TFishFilterSingle = {
  /**
   * The name of the fish you wish to retrieve information about.
   */
  fish: string;
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

export type TFishFilterMany = {
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
   * Retrive only the fish that are available in a specific month.
   *
   * Value may be the month's name (jan, january) or the integer representing the month (01, 1).
   *
   * When current is specified, the return body will be an object with two arrays inside,
   * one called north and the other south containing the fish available in each respective hemisphere.
   *
   * Note that the current month is calculated based off the API server's time,
   * so it may be slightly off for you at the beginning or end of the month.
   */
  month?: TValidMonth | "current";
};

export type TFishFilterExcludeDetails = TFishFilterMany & {
  /**
   * Exclude information.
   *
   * When set to true, only fish names are returned.
   * Instead of an array of objects with all details, the return will be an array of strings.
   */
   excludedetails: true;
}