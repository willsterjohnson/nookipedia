export type TMonthShortform =
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

export type TMonthLongform =
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

export type TMonthNumericForm =
  | 1
  | "1"
  | "01"
  | 2
  | "2"
  | "02"
  | 3
  | "3"
  | "03"
  | 4
  | "4"
  | "04"
  | 5
  | "5"
  | "05"
  | 6
  | "6"
  | "06"
  | 7
  | "7"
  | "07"
  | 8
  | "8"
  | "08"
  | 9
  | "9"
  | "09"
  | 10
  | "10"
  | 11
  | "11"
  | 12
  | "12";

export type TValidMonth = TMonthShortform | TMonthLongform | TMonthNumericForm;

/** TODO: complete this type */
export type TRarityLevel = string | "Common" | "Uncommon";
