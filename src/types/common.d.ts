/**
 * @dev add documentation
 * @since 0.2.0
 */
export type TMonthShortform = "Jan" | "jan" | "Feb" | "feb" | "Mar" | "mar" | "Apr" | "apr" | "May" | "may" | "Jun" | "jun" | "Jul" | "jul" | "Aug" | "aug" | "Sep" | "sep" | "Oct" | "oct" | "Nov" | "nov" | "Dec" | "dec";

/**
 * @dev add documentation
 * @since 0.2.0
 */
export type TMonthLongform = "January" | "january" | "February" | "february" | "March" | "march" | "April" | "april" | "May" | "may" | "June" | "june" | "July" | "july" | "August" | "august" | "September" | "september" | "October" | "october" | "November" | "november" | "December" | "december";

/**
 * @dev add documentation
 * @since 0.2.0
 */
export type TMonthIntegerForm = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

/**
 * @dev add documentation
 * @since 0.2.0
 */
export type TMonthIntStringForm = "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "12";

/**
 * @dev add documentation
 * @since 0.2.0
 */
export type TMonthNumStringForm = "01" | "02" | "03" | "04" | "05" | "06" | "07" | "08" | "09" | "10" | "11" | "12";

/**
 * @dev add documentation
 * @since 0.2.0
 */
export type TMonthNumericForm = TMonthIntegerForm | TMonthIntStringForm | TMonthNumStringForm;

/**
 * @dev add documentation
 * @since 0.2.0
 */
export type TValidMonth = TMonthShortform | TMonthLongform | TMonthNumericForm;

/** TODO: complete this type */
/**
 * @dev add documentation
 * @since 0.2.0
 */
export type TRarityLevel = string | "" | "Unknown" | "unknown" | "Very Common" | "Very common" | "Common" | "common" | "Uncommon" | "uncommon" | "Rare" | "rare" | "Very Rare" | "Very rare";

/**
 * @dev add documentation
 * @since 0.2.0
 */
export type TValidHour = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

/**
 * @dev add documentation
 * @since 0.2.0
 * @example "4 PM – 9 AM"
 */
export type TAppearanceTime = "NA" | "All day" | `${TValidHour} ${"AM" | "PM"} - ${TValidHour} ${"AM" | "PM"}`;

/**
 * @dev add documentation
 * @since 0.2.0
 * @example "Sep – Dec"
 */
export type TAppearanceMonths = `${TMonthShortform} - ${TMonthShortform}`;

/**
 * @dev add documentation
 * @since 0.2.0
 */
export type TAppearanceHemisphereInfo = {
  /**
   * A list of months in which this item can be found,
   * and the times during those months when this item can be found.
   */
  availability_array: Array<{
    months: TBugMonths;
    time: TBugAppearanceTime;
  }>;
  /**
   * A record of the availability of this item for each month, including unavailable months.
   */
  times_by_month: Record<TMonthIntStringForm, TBugAppearanceTime>;
  /**
   * The availability periods of this item in months.
   * Written as a string comprised of TBugMonths-like substrings.
   * @example "Mar – May; Sep – Dec"
   */
  months: string;
  /**
   * A list of month numbers (1=Jan, 2=Feb, etc.) for each month in which this item can be found.
   */
  months_array: Array<TMonthIntegerForm>;
};
