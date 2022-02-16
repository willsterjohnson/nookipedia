/// <reference path="./index.ts" />
declare namespace Nookipedia.Month {
  /**
   * @dev add documentation
   * @since 0.3.0
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
   */
  type IntegerForm = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

  /**
   * @dev add documentation
   * @since 0.3.0
   */
  type IntStringForm = "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "12";

  /**
   * @dev add documentation
   * @since 0.3.0
   */
  type NumStringForm = "01" | "02" | "03" | "04" | "05" | "06" | "07" | "08" | "09" | "10" | "11" | "12";

  /**
   * @dev add documentation
   * @since 0.3.0
   */
  type NumericForm = IntegerForm | IntStringForm | NumStringForm;

  /**
   * @dev add documentation
   * @since 0.3.0
   */
  type Valid = Shortform | Longform | NumericForm;
}
