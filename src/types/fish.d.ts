import type { TMonthShortform, TMonthShortformUpper, TRarityLevel } from "./common";

/** @example "4 PM – 9 AM" */
export type TFishAppearanceTime = "NA" | "All day" | `${number} ${"AM" | "PM"} - ${number} ${"AM" | "PM"}`;

/** @example "Sep – Dec" */
export type TFishMonths = `${TMonthShortformUpper} - ${TMonthShortformUpper}`;

export type TFishHemisphereInfo = {
  /**
   * A list of months in which this fish can be found,
   * and the times during those months when this fish can be found.
   */
  availability_array: Array<{
    months: TFishMonths;
    time: TFishAppearanceTime;
  }>;
  /**
   * A record of the availability of this fish for each month, including unavailable months.
   */
  times_by_month: Record<"1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "12", TFishAppearanceTime>;
  /**
   * The availability periods of this fish in months.
   * Written as a string comprised of TFishMonths-like substrings.
   * @example "Mar – May; Sep – Dec"
   */
  months: string;
  /**
   * A list of month numbers (1=Jan, 2=Feb, etc.) for each month in which this fish can be found.
   */
  months_array: Array<number>;
};


// @dev hm yes, funny name
export type IFish = {
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
   */
  time: string;
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
  north: TFishHemisphereInfo;
  /**
   * Info about the fish's appearance through the year (South Hemisphere).
   */
  south: TFishHemisphereInfo;
};
