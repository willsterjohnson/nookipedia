/// <reference path="./index.ts" />
declare namespace Nookipedia.Villager {
  /**
   * @dev add documentation
   * @since 0.3.0
   * @author Will 'Willster' Johnson (@willster277)
   */
  type Species =
    | "Alligator"
    | "alligator"
    | "Anteater"
    | "anteater"
    | "Bear"
    | "bear"
    | "Bird"
    | "bird"
    | "Bull"
    | "bull"
    | "Cat"
    | "cat"
    | "Cub"
    | "cub"
    | "Chicken"
    | "chicken"
    | "Cow"
    | "cow"
    | "Deer"
    | "deer"
    | "Dog"
    | "dog"
    | "Duck"
    | "duck"
    | "Eagle"
    | "eagle"
    | "Elephant"
    | "elephant"
    | "Frog"
    | "frog"
    | "Goat"
    | "goat"
    | "Gorilla"
    | "gorilla"
    | "Hamster"
    | "hamster"
    | "Hippo"
    | "hippo"
    | "Horse"
    | "horse"
    | "Koala"
    | "koala"
    | "Kangaroo"
    | "kangaroo"
    | "Lion"
    | "lion"
    | "Monkey"
    | "monkey"
    | "Mouse"
    | "mouse"
    | "Octopus"
    | "octopus"
    | "Ostrich"
    | "ostrich"
    | "Penguin"
    | "penguin"
    | "Pig"
    | "pig"
    | "Rabbit"
    | "rabbit"
    | "Rhino"
    | "rhino"
    | "Sheep"
    | "sheep"
    | "Squirrel"
    | "squirrel"
    | "Tiger"
    | "tiger"
    | "Wolf"
    | "wolf";

  /**
   * @dev add documentation
   * @since 0.3.0
   * @author Will 'Willster' Johnson (@willster277)
   */
  type GameActual = "DNM" | "AC" | "E_PLUS" | "WW" | "CF" | "NL" | "WA" | "NH" | "FILM" | "HHD" | "PC";

  /**
   * @dev add documentation
   * @since 0.3.0
   * @author Will 'Willster' Johnson (@willster277)
   */
  type GameAlt =
    | "dobutsu no mori"
    | "animal crossing"
    | "e+"
    | "dobutsu no mori e+"
    | "wild world"
    | "city folk"
    | "new leaf"
    | "welcome amiibo"
    | "new horizons"
    | "dobutsu no mori film"
    | "gekijoban dobutsu no mori"
    | "happy home designer"
    | "pocket camp";

  /**
   * @dev add documentation
   * @since 0.3.0
   * @author Will 'Willster' Johnson (@willster277)
   */
  type Game = GameActual | GameAlt;

  /**
   * @dev add documentation
   * @since 0.3.0
   * @author Will 'Willster' Johnson (@willster277)
   */
  type Personality =
    | "Lazy"
    | "lazy"
    | "Jock"
    | "jock"
    | "Cranky"
    | "cranky"
    | "Smug"
    | "smug"
    | "Normal"
    | "normal"
    | "Peppy"
    | "peppy"
    | "Snooty"
    | "snooty"
    | "Sisterly"
    | "sisterly";

  /**
   * @dev add documentation
   * @since 0.3.0
   * @author Will 'Willster' Johnson (@willster277)
   */
  type StarSign =
    | "Aries"
    | "aries"
    | "Taurus"
    | "taurus"
    | "Gemini"
    | "gemini"
    | "Cancer"
    | "cancer"
    | "Leo"
    | "leo"
    | "Virgo"
    | "virgo"
    | "Libra"
    | "libra"
    | "Scorpio"
    | "scorpio"
    | "Sagittarius"
    | "sagittarius"
    | "Capricorn"
    | "capricorn"
    | "Aquarius"
    | "aquarius"
    | "Pisces"
    | "pisces";

  /**
   * @dev add documentation
   * @since 0.3.0
   * @author Will 'Willster' Johnson (@willster277)
   */
  type Schema = {
    /**
     * Villager's Nookipedia URL
     */
    url: Common.WikiUrl;
    /**
     * Villager's name
     */
    name: string;
    /**
     * Villager's alternate names
     */
    alt_name: string;
    /**
     * Villager's title color
     */
    title_color: string;
    /**
     * Villager's text color
     */
    text_color: string;
    /**
     * Villager's id
     */
    id: string;
    /**
     * Villager's image URL
     */
    image_url: string;
    /**
     * Villager's species
     */
    species: Species;
    /**
     * Villager's personality
     */
    personality: Personality;
    /**
     * Villager's gender
     */
    gender: "Male" | "Female";
    /**
     * Villager's birthday month
     */
    birthday_month: Month.Valid;
    /**
     * Villager's birthday day
     */
    birthday_day: Month.Day;
    /**
     * Villager's star sign
     */
    sign: StarSign;
    /**
     * Quote from Villager
     */
    quote: string;
    /**
     * Villager's catchphrase
     */
    phrase: string;
    /**
     * Villager's previous catchphrases
     */
    prev_phrases: Array<string>;
    /**
     * Villager's clothing
     */
    clothing: string;
    /**
     * @see https://nookipedia.com/wiki/Islander
     */
    islander: boolean;
    /**
     * Villager's first appearance
     */
    debut: Game;
    /**
     * Villager's games appeared in
     */
    appearances: Array<Game>;
  };

  /**
   * @dev add documentation
   * @since 0.3.0
   * @author Will 'Willster' Johnson (@willster277)
   */
  type SchemaNHDetails = Schema & {
    nh_details: {
      /**
       * New Horizons - Image URL
       */
      image_url: string;
      /**
       * New Horizons - Photo URL
       */
      photo_url: string;
      /**
       * New Horizons - Icon URL
       */
      icon_url: string;
      /**
       * New Horizons - Quote
       */
      quote: string;
      /**
       * New Horizons - Sub-personality
       */
      "sub-personality": string;
      /**
       * New Horizons - Catchphrase
       */
      catchphrase: string;
      /**
       * New Horizons - Clothing
       */
      clothing: string;
      /**
       * New Horizons - Clothing variation
       */
      clothing_variation: string;
      /**
       * New Horizons - Favorite styles
       */
      fav_styles: Array<string>;
      /**
       * New Horizons - Favorite colors
       */
      fav_colors: Array<string>;
      /**
       * New Horizons - Hobby
       */
      hobby: string;
      /**
       * New Horizons - Home image URL (interior)
       */
      house_interior_url: string;
      /**
       * New Horizons - Home image URL (exterior)
       */
      house_exterior_url: string;
      /**
       * New Horizons - Home wallpaper
       */
      house_wallpaper: string;
      /**
       * New Horizons - Home flooring
       */
      house_flooring: string;
      /**
       * New Horizons - Home music
       */
      house_music: string;
      /**
       * New Horizons - Home music note
       */
      house_music_note: string;
    };
  };

  /**
   * @dev add documentation
   * @since 0.3.0
   * @author Will 'Willster' Johnson (@willster277)
   */
  type Filter = {
    /**
     * Villager name
     *
     * For most names you will get back an array with one object,
     * but note that names are not a unique identifier across the series,
     * as there are 3 names that are shared by multiple villagers (Lulu, Petunia, Carmen).
     * For those 3 names you will get back an array with 2 objects. How you disambiguate between these villagers is up to you.
     */
    name?: string;
    /**
     * Retrieve villagers of a certain species.
     */
    species?: Species;
    /**
     * Retrieve villagers with a certain personality.
     *
     * For 'sisterly', note that the community often also calls it 'uchi' or 'big sister'.
     */
    personality?: Personality;
    /**
     * Retrieve villagers that appear in all listed games.
     *
     * For example, if you want only villagers that appear in both New Horizons and Pocket Camp, you would send in `["NH", "PC"]`.
     */
    game?: Game | Array<Game>;
    /**
     * Retrieve villagers born in a specific month.
     *
     * Value may be the month's name (jan, january) or the integer representing the month (01, 1).
     */
    birthmonth?: Month.Valid;
    /**
     * Use with birthmonth to get villager(s) born on a specific day.
     */
    birthday?: Month.Day;
    /**
     * Specify the desired width of returned image URLs.
     *
     * When unspecified, the linked image(s) returned by the API will be full-resolution.
     * Note that images can only be reduced in size; specifying a width greater than than the maximum
     * size will return the default full-size image URL. Note that requesting specific image sizes
     * for long lists may result in a very long response time.
     */
    thumbsize?: number;
  };

  /**
   * @dev add documentation
   * @since 0.3.0
   * @author Will 'Willster' Johnson (@willster277)
   */
  type FilterExcludeDetails = Filter & {
    /**
     * Retrive New Horizons info.
     *
     * When set to true, an nh_details object will be included that contains New Horizons details about the villager.
     * If the villager does not appear in New Horizons, the returned nh_details field will be empty.
     */
    nhdetails?: boolean;
    /**
     * Exclude information.
     *
     * When set to true, only villager names are returned.
     * Instead of an array of objects with all details, the return will be an array of strings.
     */
    excludedetails: true;
  };

  /**
   * @dev add documentation
   * @since 0.3.0
   * @author Will 'Willster' Johnson (@willster277)
   */
  type FilterNHDetails = Filter & {
    /**
     * Retrive New Horizons info.
     *
     * When set to true, an nh_details object will be included that contains New Horizons details about the villager.
     * If the villager does not appear in New Horizons, the returned nh_details field will be empty.
     */
    nhdetails: true;
    /**
     * Exclude information.
     *
     * When set to true, only villager names are returned.
     * Instead of an array of objects with all details, the return will be an array of strings.
     */
    excludedetails?: false;
  };
}
