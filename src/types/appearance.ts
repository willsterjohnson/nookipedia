/// <reference path="./index.ts" />
declare namespace Nookipedia.Appearance {
  /**
   * @dev add documentation
   * @example "4 PM – 9 AM"
   * @since 0.3.0
   * @author Will 'Willster' Johnson (@willster277)
   */
  type Time = "NA" | "All day" | `${Common.ValidHour} ${"AM" | "PM"} - ${Common.ValidHour} ${"AM" | "PM"}`;

  /**
   * @dev add documentation
   * @example "Sep – Dec"
   * @since 0.3.0
   * @author Will 'Willster' Johnson (@willster277)
   */
  type Months = `${Month.Shortform} - ${Month.Shortform}`;

  /**
   * @dev add documentation
   * @since 0.3.0
   * @author Will 'Willster' Johnson (@willster277)
   */
  type HemisphereInfo = {
    /**
     * A list of months in which this item can be found,
     * and the times during those months when this item can be found.
     */
    availability_array: Array<{
      months: Months;
      time: Time;
    }>;
    /**
     * A record of the availability of this item for each month, including unavailable months.
     */
    times_by_month: Record<Month.IntStringForm, Time>;
    /**
     * The availability periods of this item in months.
     * Written as a string comprised of TBugMonths-like substrings.
     * @example "Mar – May; Sep – Dec"
     */
    months: string;
    /**
     * A list of month numbers (1=Jan, 2=Feb, etc.) for each month in which this item can be found.
     */
    months_array: Array<Month.IntegerForm>;
  };
}
