import type { TValidMonth } from "./common";

export type TVillagerSpecies =
  | "alligator"
  | "anteater"
  | "bear"
  | "bird"
  | "bull"
  | "cat"
  | "cub"
  | "chicken"
  | "cow"
  | "deer"
  | "dog"
  | "duck"
  | "eagle"
  | "elephant"
  | "frog"
  | "goat"
  | "gorilla"
  | "hamster"
  | "hippo"
  | "horse"
  | "koala"
  | "kangaroo"
  | "lion"
  | "monkey"
  | "mouse"
  | "octopus"
  | "ostrich"
  | "penguin"
  | "pig"
  | "rabbit"
  | "rhino"
  | "sheep"
  | "squirrel"
  | "tiger"
  | "wolf";

// TODO: full names permitted and translated to identifiers
export type TVillagerGame = "DNM" | "AC" | "E_PLUS" | "WW" | "CF" | "NL" | "WA" | "NH" | "FILM" | "HHD" | "PC";

export type TVillagerPersonality = "lazy" | "jock" | "cranky" | "smug" | "normal" | "peppy" | "snooty" | "sisterly";

export type TVillagerBirthday =
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16
  | 17
  | 18
  | 19
  | 20
  | 21
  | 22
  | 23
  | 24
  | 25
  | 26
  | 27
  | 28
  | 29
  | 30
  | 31;

export type TVillagerStarSign =
  | "Aries"
  | "Taurus"
  | "Gemini"
  | "Cancer"
  | "Leo"
  | "Virgo"
  | "Libra"
  | "Scorpio"
  | "Sagittarius"
  | "Capricorn"
  | "Aquarius"
  | "Pisces";

// TODO: more descriptive JSDoc
export type IVillager = {
  /**
   * Villager's Nookipedia URL
   */
  url: string;
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
  species: TVillagerSpecies;
  /**
   * Villager's personality
   */
  personality: TVillagerPersonality;
  // check this, are there any NB/other in the game?
  /**
   * Villager's gender
   */
  gender: "Male" | "Female";
  /**
   * Villager's birthday month
   */
  birthday_month: TValidMonth;
  /**
   * Villager's birthday day
   */
  birthday_day: TVillagerBirthday;
  /**
   * Villager's star sign
   */
  sign: TVillagerStarSign;
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
  prev_phrases: string[];
  /**
   * Villager's clothing
   */
  clothing: string;
  /**
   * Is Villager an islander?
   */
  islander: boolean;
  /**
   * Villager's first appearance
   */
  debut: TVillagerGame;
  /**
   * Villager's games appeared in
   */
  appearances: TVillagerGame[];
};
export type IVillagerExcludeDetails = string;
// TODO: more descriptive JSDoc
export type IVillagerNHDetails = IVillager & {
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
    fav_styles: string[];
    /**
     * New Horizons - Favorite colors
     */
    fav_colors: string[];
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

export type TVillagerFilter = {
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
  species?: TVillagerSpecies;
  /**
   * Retrieve villagers with a certain personality.
   *
   * For 'sisterly', note that the community often also calls it 'uchi' or 'big sister'.
   */
  personality?: TVillagerPersonality;
  /**
   * Retrieve villagers that appear in all listed games.
   *
   * For example, if you want only villagers that appear in both New Horizons and Pocket Camp, you would send in `["NH", "PC"]`.
   */
  game?: TVillagerGame | TVillagerGame[];
  /**
   * Retrieve villagers born in a specific month.
   *
   * Value may be the month's name (jan, january) or the integer representing the month (01, 1).
   */
  birthmonth?: TValidMonth;
  /**
   * Use with birthmonth to get villager(s) born on a specific day.
   */
  birthday?: TVillagerBirthday;
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
export type TVillagerFilterExcludeDetails = TVillagerFilter & {
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
export type TVillagerFilterNHDetails = TVillagerFilter & {
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
