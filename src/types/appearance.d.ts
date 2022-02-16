namespace Nookipedia {
  /**
   * @dev add documentation
   * @since 0.3.0
   */
  namespace Appearance {
    /**
     * @dev add documentation
     * @since 0.3.0
     * @example "4 PM – 9 AM"
     */
    type Time = "NA" | "All day" | `${Common.ValidHour} ${"AM" | "PM"} - ${Common.ValidHour} ${"AM" | "PM"}`;

    /**
     * @dev add documentation
     * @since 0.3.0
     * @example "Sep – Dec"
     */
    type Months = `${Month.Shortform} - ${Month.Shortform}`;

    /**
     * @dev add documentation
     * @since 0.3.0
     */
    type HemisphereInfo = {
      /**
       * A list of months in which this item can be found,
       * and the times during those months when this item can be found.
       */
      availability_array: Array<{
        months: AppearanceMonths;
        time: AppearanceTime;
      }>;
      /**
       * A record of the availability of this item for each month, including unavailable months.
       */
      times_by_month: Record<Month.IntStringForm, AppearanceTime>;
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
}
