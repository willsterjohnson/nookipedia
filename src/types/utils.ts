/// <reference path="./index.ts" />
declare namespace Nookipedia.Utils {
  /**
   * @dev add documentation
   * @since 0.3.0
   * @author Will 'Willster' Johnson (@willster277)
   */
  type MaybeArray<T> = T | Array<T>;
  /**
   * @dev add documentation
   * @since 0.3.0
   * @author Will 'Willster' Johnson (@willster277)
   */
  type AwaitedReturn<T extends (...args: any) => any> = Awaited<ReturnType<T>>;
}
