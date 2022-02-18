/// <reference path="./index.ts" />
declare namespace Nookipedia.Common {
  /**
   * @dev add documentation
   * @since 0.3.0
   * @author Will 'Willster' Johnson (@willster277)
   */
  type Config = {
    baseURL?: string;
    apiVersion?: string;
    logUrl?: boolean;
  };
  /**
   * @dev add documentation
   * @since 0.3.0
   * @author Will 'Willster' Johnson (@willster277)
   */
  type RarityLevel =
    | ""
    | "Unknown"
    | "unknown"
    | "Very Common"
    | "very Common"
    | "Very common"
    | "very common"
    | "Common"
    | "common"
    | "Uncommon"
    | "uncommon"
    | "Rare"
    | "rare"
    | "Very Rare"
    | "very Rare"
    | "Very rare"
    | "very rare";

  /**
   * @dev add documentation
   * @since 0.3.0
   * @author Will 'Willster' Johnson (@willster277)
   */
  type SchemaExcludeDetails = string;
}
