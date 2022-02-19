/// <reference path="./index.ts" />
declare namespace Nookipedia.Event {
  /**
   * @dev add documentation
   * @since 0.4.0
   * @author Will 'Willster' Johnson (@willster277)
   */
  type Year = `20${Utils.Range<22, 92>}`;
  /**
   * @dev add documentation
   * @since 0.4.0
   * @author Will 'Willster' Johnson (@willster277)
   */
  type Schema = {
    /**
     * The name of this Event
     */
    event: string;
    /**
     * The date this event occurs on in YYY-MM-DD format
     */
    date: string;
    /**
     * The type of this event
     */
    type: Common.EventType;
    /**
     * This event's Nookipedia URL
     */
    url: string;
  };

  /**
   * @dev add documentation
   * @since 0.4.0
   * @author Will 'Willster' Johnson (@willster277)
   */
  type Filter = {
    /**
     * Specify a specific date (in the current or next year) to retrieve events for.
     * Accepts many date formats, such as `YYYY-MM-DD` or `Month Day, Year`, as well
     * as `today` to retrieve the current day's events (UTC time).
     * @todo Utils.Range maxes out at 92, find a better solution
     */
    date?: "today" | `20${Utils.Range<22, 92>}-${Month.NumStringForm}-${Month.DayDoubleDigit}` | string;
    /**
     * Specify the year to retrieve events for. Must be the current or next year.
     */
    year?: Year;
    /**
     * Specify the month to retrieve events for (accepts multiple formats, such as Oct, October, or 10).
     * Most likely want to use alongside year, otherwise events in both the current and next year are returned.
     */
    month?: Month.Valid;
    /**
     * Specify the day of the month to retrieve events for.
     */
    day?: Month.Day;
  };
}
