/**
 * @dev add documentation
 * @since 0.3.0
 * @author Will 'Willster' Johnson (@willster277)
 */
export type Config = {
  baseURL: string;
  apiVersion: string;
  logUrl: boolean;
};
/**
 * @dev add documentation
 * @since 0.3.0
 * @author Will 'Willster' Johnson (@willster277)
 */
export type RarityLevel =
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
export type SchemaExcludeDetails = string;

/**
 * @dev add documentation
 * @dev ensure there are no other event types
 * @since 0.4.0
 * @author Will 'Willster' Johnson (@willster277)
 */
export type EventType = "Birthday" | "Event" | "Nook Shopping" | "Recipes" | "Season" | "Shopping season";

/**
 * @dev add documentation
 * @since 0.5.0
 * @author Will 'Willster' Johnson (@willster277)
 */
export type WikiUrl<Page extends string = string> = `https://nookipedia.com/wiki/${Page}`;
