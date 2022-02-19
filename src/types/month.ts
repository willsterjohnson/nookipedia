/// <reference path="./index.ts" />
declare namespace Nookipedia.Month {
  /**
   * @dev add documentation
   * @since 0.3.0
   * @author Will 'Willster' Johnson (@willster277)
   */
  type Shortform =
    | "Jan"
    | "jan"
    | "Feb"
    | "feb"
    | "Mar"
    | "mar"
    | "Apr"
    | "apr"
    | "May"
    | "may"
    | "Jun"
    | "jun"
    | "Jul"
    | "jul"
    | "Aug"
    | "aug"
    | "Sep"
    | "sep"
    | "Oct"
    | "oct"
    | "Nov"
    | "nov"
    | "Dec"
    | "dec";

  /**
   * @dev add documentation
   * @since 0.3.0
   * @author Will 'Willster' Johnson (@willster277)
   */
  type Longform =
    | "January"
    | "january"
    | "February"
    | "february"
    | "March"
    | "march"
    | "April"
    | "april"
    | "May"
    | "may"
    | "June"
    | "june"
    | "July"
    | "july"
    | "August"
    | "august"
    | "September"
    | "september"
    | "October"
    | "october"
    | "November"
    | "november"
    | "December"
    | "december";

  /**
   * @dev add documentation
   * @since 0.3.0
   * @author Will 'Willster' Johnson (@willster277)
   */
  type IntegerForm = Utils.Range<1, 13>;

  /**
   * @dev add documentation
   * @since 0.3.0
   * @author Will 'Willster' Johnson (@willster277)
   */
  type IntStringForm = `${Utils.Range<1, 13>}`;

  /**
   * @dev add documentation
   * @since 0.3.0
   * @author Will 'Willster' Johnson (@willster277)
   */
  type NumStringForm = "01" | "02" | "03" | "04" | "05" | "06" | "07" | "08" | "09" | "10" | "11" | "12";

  /**
   * @dev add documentation
   * @since 0.3.0
   * @author Will 'Willster' Johnson (@willster277)
   */
  type NumericForm = IntegerForm | IntStringForm | NumStringForm;

  /**
   * @dev add documentation
   * @since 0.3.0
   * @author Will 'Willster' Johnson (@willster277)
   */
  type Valid = Shortform | Longform | NumericForm;

  /**
   * @dev add documentation
   * @since 0.4.0
   * @author Will 'Willster' Johnson (@willster277)
   */
  type DaySingleDigit = Utils.Range<1, 10> | `${Utils.Range<1, 10>}`;

  /**
   * @dev add documentation
   * @since 0.4.0
   * @author Will 'Willster' Johnson (@willster277)
   */
  type Day10Plus = Utils.Range<10, 32> | `${Utils.Range<10, 32>}`;

  /**
   * @dev add documentation
   * @since 0.4.0
   * @author Will 'Willster' Johnson (@willster277)
   */
  type DayDoubleDigit = "01" | "02" | "03" | "04" | "05" | "06" | "07" | "08" | "09" | Day10Plus;

  /**
   * @dev add documentation
   * @since 0.4.0
   * @author Will 'Willster' Johnson (@willster277)
   */
  type Day = DaySingleDigit | Day10Plus;

  /**
   * @dev add documentation
   * @since 0.3.0
   * @author Will 'Willster' Johnson (@willster277)
   */
  type ValidHour = Utils.Range<1, 13>;
}
