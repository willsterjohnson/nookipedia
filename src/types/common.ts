/// <reference path="./index.ts" />
declare namespace Nookipedia.Common {
  /**
   * @dev add documentation
   * @since 0.3.0
   */
  type Config = {
    baseURL?: string;
    apiVersion?: string;
    logUrl?: boolean;
  };
  /** TODO: complete this type */
  /**
   * @dev add documentation
   * @since 0.3.0
   */
  type RarityLevel =
    | string
    | ""
    | "Unknown"
    | "unknown"
    | "Very Common"
    | "Very common"
    | "Common"
    | "common"
    | "Uncommon"
    | "uncommon"
    | "Rare"
    | "rare"
    | "Very Rare"
    | "Very rare";

  /**
   * @dev add documentation
   * @since 0.3.0
   */
  type ValidHour = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

  /**
   * @dev add documentation
   * @since 0.3.0
   */
  type SchemaExcludeDetails = string;
}
