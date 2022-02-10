export type TMonthShortformLower = "jan" | "feb" | "mar" | "apr" | "may" | "jun" | "jul" | "aug" | "sep" | "oct" | "nov" | "dec";
export type TMonthShortformUpper = Capitalize<TMonthShortformLower>;
export type TMonthShortform = TMonthShortformLower | TMonthShortformUpper;
export type TMonthLongformLower =
  | "january"
  | "february"
  | "march"
  | "april"
  | "may"
  | "june"
  | "july"
  | "august"
  | "september"
  | "october"
  | "november"
  | "december";
export type TMonthLongformUpper = Capitalize<TMonthLongformLower>;
export type TMonthLongform = TMonthLongformLower | TMonthLongformUpper;
export type TMonthNumOrNumString =
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
export type TValidMonth = TMonthShortform | TMonthLongform | TMonthNumOrNumString;

/** TODO: complete this type */
export type TRarityLevel = string | "Common" | "Uncommon";
