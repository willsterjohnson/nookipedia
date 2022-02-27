/// <reference path="./index.ts" />
declare namespace Nookipedia.Clothing {
  /**
   * @dev add documentation
   * @since 0.5.0
   * @author Will 'Willster' Johnson (@willster277)
   */
  type Category = "Tops" | "Bottoms" | "Dress-up" | "Headwear" | "Accessories" | "Socks" | "Shoes" | "Bags" | "Umbrellas";

  /**
   * @dev add documentation
   * @since 0.5.0
   * @author Will 'Willster' Johnson (@willster277)
   */
  type Color =
    | "Aqua"
    | "Beige"
    | "Black"
    | "Blue"
    | "Brown"
    | "Colorful"
    | "Gray"
    | "Green"
    | "Orange"
    | "Pink"
    | "Purple"
    | "Red"
    | "White"
    | "Yellow";

  /**
   * @dev add documentation
   * @since 0.5.0
   * @author Will 'Willster' Johnson (@willster277)
   */
  type Style = "Active" | "Cool" | "Cute" | "Elegant" | "Gorgeous" | "Simple";

  /**
   * @dev add documentation
   * @since 0.5.0
   * @author Will 'Willster' Johnson (@willster277)
   */
  type Theme =
    | "Comfy"
    | "Everyday"
    | "Fairy tale"
    | "Formal"
    | "Goth"
    | "Outdoorsy"
    | "Party"
    | "Sporty"
    | "Theatrical"
    | "Vacation"
    | "Work";

  /**
   * @dev add documentation
   * @since 0.5.0
   * @author Will 'Willster' Johnson (@willster277)
   */
  type Schema = {
    name: string;
    url: Common.WikiUrl;
    category: Category;
    sell: number;
    variation_total: number;
    vill_equip: boolean;
    seasonality: string;
    version_added: string;
    unlocked: boolean;
    notes: string;
    label_themes: Array<Theme>;
    styles: Array<Style>;
    availability: Array<{ from: string; note: string }>;
    buy: Array<{ price: number; currency: "Bells" | "Poki" | "Miles" }>;
    variations: Array<{
      variation: string;
      image_url: string;
      colors: [Color] | [Color, Color];
    }>;
  };

  /**
   * @dev add documentation
   * @since 0.5.0
   * @author Will 'Willster' Johnson (@willster277)
   */
  type FilterSingle = {
    /**
     * The name of the clothing item you wish to retrieve information about.
     */
    clothing: string;
    /**
     * Specify the desired width of returned image URLs.
     *
     * When unspecified, the linked image(s) returned by the API will be full-resolution.
     * Note that images can only be reduced in size; specifying a width greater than than the maximum
     * size will return the default full-size image URL. Note that requesting specific image sizes
     * for long lists may result in a very long response time.
     */
    thumbsize?: string;
  };

  /**
   * @dev add documentation
   * @since 0.5.0
   * @author Will 'Willster' Johnson (@willster277)
   */
  type FilterMany = {
    category?: Category;
    color?: Color | [Color] | [Color, Color];
    style?: Style;
    labeltheme?: Theme;
  };

  /**
   * @dev add documentation
   * @since 0.5.0
   * @author Will 'Willster' Johnson (@willster277)
   */
  type FilterExcludeDetails = FilterMany & {
    /**
     * Exclude information.
     *
     * When set to true, only clothing names are returned.
     * Instead of an array of objects with all details, the return will be an array of strings.
     */
    excludedetails: true;
  };
}
