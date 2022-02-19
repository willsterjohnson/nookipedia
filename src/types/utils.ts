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
   * @since 0.4.0
   * @author Will 'Willster' Johnson (@willster277)
   */
  type MaybePromise<T> = T | Promise<T>;
  /**
   * @dev add documentation
   * @since 0.3.0
   * @author Will 'Willster' Johnson (@willster277)
   */
  type AwaitedReturn<T extends (...args: any) => any> = Awaited<ReturnType<T>>;

  /**
   * @dev add documentation
   * @since 0.4.0
   * @author Will 'Willster' Johnson (@willster277)
   * @author (@moccaplusplus) https://github.com/microsoft/TypeScript/issues/15480#issuecomment-601714262
   */
  type PrependNextNum<A extends Array<unknown>> = A["length"] extends infer T
    ? ((t: T, ...a: A) => void) extends (...x: infer X) => void
      ? X
      : never
    : never;

  /**
   * @dev add documentation
   * @since 0.4.0
   * @author Will 'Willster' Johnson (@willster277)
   * @author (@moccaplusplus) https://github.com/microsoft/TypeScript/issues/15480#issuecomment-601714262
   */
  type EnumerateInternal<A extends Array<unknown>, N extends number> = {
    0: A;
    1: EnumerateInternal<PrependNextNum<A>, N>;
  }[N extends A["length"] ? 0 : 1];

  /**
   * @dev add documentation
   * @since 0.4.0
   * @author Will 'Willster' Johnson (@willster277)
   * @author (@moccaplusplus) https://github.com/microsoft/TypeScript/issues/15480#issuecomment-601714262
   */
  type Enumerate<N extends number> = EnumerateInternal<[], N> extends (infer E)[] ? E : never;

  /**
   * @dev add documentation
   * IMPORTANT: This is likely to fail on anything bigger than a small range. (largest tested working: Range<1, 92>)
   * @since 0.4.0
   * @author Will 'Willster' Johnson (@willster277)
   * @author (@moccaplusplus) https://github.com/microsoft/TypeScript/issues/15480#issuecomment-601714262
   */
  type Range<FROM extends number, TO extends number> = Exclude<Enumerate<TO>, Enumerate<FROM>>;
}
