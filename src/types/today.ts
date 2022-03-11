import type { Event, Common, Villager } from "./";
/**
 * @dev add documentation
 * @since 0.4.0
 * @author Will 'Willster' Johnson (@willster277)
 */
export type extraInfo = {
  Birthday: Villager.SchemaNHDetails;
};

/**
 * @dev add documentation
 * @since 0.4.0
 * @author Will 'Willster' Johnson (@willster277)
 */
export type SchemaExtraInfo<T extends Common.EventType> = {
  /**
   * The type of this event
   */
  type: T;
  /**
   * Extra info on this event.
   *
   * For birthdays, contains the villager the event is for.
   */
  extraInfo?: T extends keyof extraInfo ? extraInfo[T] : never;
};

/**
 * @dev add documentation
 * @since 0.4.0
 * @author Will 'Willster' Johnson (@willster277)
 */
export type Schema = Omit<Event.Schema, "type"> & SchemaExtraInfo<Common.EventType>;
