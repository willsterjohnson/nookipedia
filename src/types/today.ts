/// <reference path="./index.ts" />
declare namespace Nookipedia.Today {
  /**
   * @dev add documentation
   * @since 0.4.0
   * @author Will 'Willster' Johnson (@willster277)
   */
  type extraInfo = {
    Birthday: Villager.SchemaNHDetails;
  };

  /**
   * @dev add documentation
   * @since 0.4.0
   * @author Will 'Willster' Johnson (@willster277)
   */
  type SchemaExtraInfo<T extends Common.EventType> = {
    /**
     * The type of this event
     */
    type: T;
    /**
     * The villager this birthday is for
     */
    extraInfo: T extends keyof extraInfo ? extraInfo[T] : never;
  };

  /**
   * @dev add documentation
   * @since 0.4.0
   * @author Will 'Willster' Johnson (@willster277)
   */
  type Schema = Omit<Event.Schema, "type"> & SchemaExtraInfo<Common.EventType>;
}
