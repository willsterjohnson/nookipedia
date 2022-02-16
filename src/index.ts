/// <reference path="./types/index.d.ts" />
import fetch from "node-fetch";

/**
 * @dev add documentation
 * @since 0.1.0
 */
export default class Nookipedia {
  /**
   * @dev add in-house documentation
   * @since 0.1.0
   * @type {string}
   */
  #apiKey: string;
  /**
   * @dev add documentation
   * @since 0.1.0
   * @type {string}
   */
  baseURL: string = "https://api.nookipedia.com/";
  /**
   * @dev add documentation
   * @since 0.1.0
   * @type {string}
   */
  apiVersion: string = "1.5.0";
  /**
   * @dev add documentation
   * @since 0.2.0
   * @type {boolean}
   */
  logUrl: boolean = false;

  /**
   * @dev add in-house documentation
   * @since 0.1.0
   * @template {Record<string, any> | Array<Record<string, any>>} T
   * @param {string} endpoint
   * @returns {Promise<T>}
   */
  async #fetch<T extends Record<string, any> | Array<Record<string, any>>>(endpoint: string): Promise<T> {
    if (this.logUrl) {
      console.log(`\x1b[34m[Nookipedia]\x1b[0m Attempting to fetch data from: \x1b[32m${this.baseURL}${endpoint}\x1b[0m`);
    }
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      headers: {
        "X-API-KEY": this.#apiKey,
        "Accept-Version": this.apiVersion,
        "content-type": "application/json",
      },
    });
    const stringify = await response.text();
    return JSON.parse(stringify.replace(/\\u2013/g, "-")) as T;
  }

  /**
   * @dev add in-house documentation
   * @since 0.1.0
   * @param {Record<string, Nookipedia.Utils.MaybeArray<string | number | boolean>>} body
   * @returns {string}
   */
  #bodyToParams(body: Record<string, Nookipedia.Utils.MaybeArray<string | number | boolean>>): string {
    return Object.keys(body)
      .map((key) => {
        const value = body[key] as typeof body[keyof typeof body];
        if (Array.isArray(value)) {
          return value.map((item) => `${key}=${encodeURIComponent(item)}`).join("&");
        } else {
          return `${key}=${value}`;
        }
      })
      .join("&");
  }

  /**
   * @dev add documentation
   * @since 0.1.0
   * @param {string} apiKey
   * @param {Nookipedia.Config} [config={}]
   * @param {Nookipedia.Config["baseURL"]} [config.baseURL]
   * @param {Nookipedia.Config["apiVersion"]} [config.apiVersion]
   * @param {Nookipedia.Config["logUrl"]} [config.logUrl]
   */
  constructor(apiKey: string, config: Nookipedia.Common.Config = {}) {
    this.#apiKey = apiKey;
    if (config.apiVersion) {
      if (/\d+\.\d+\.\d+/.test(config.apiVersion)) {
        this.apiVersion = config.apiVersion;
      } else {
        throw new Error("Nookipedia: API version must be a valid version number.");
      }
    }
    if (config.baseURL) {
      this.baseURL = config.baseURL.endsWith("/") ? config.baseURL : config.baseURL + "/";
    }
    if (config.logUrl) {
      this.logUrl = config.logUrl;
    }
  }

  /**
   * @dev add documentation
   * @since 0.1.0
   * @template {ReturnType<Nookipedia["bugs"]> | ReturnType<Nookipedia["fish"]> | ReturnType<Nookipedia["villagers"]>} T
   * @param {T} apiResponse
   * @returns {Promise<Exclude<Awaited<T>, Nookipedia.Error.EndpointError>>}
   */
  async checkErrors<T extends ReturnType<Nookipedia["bugs"]> | ReturnType<Nookipedia["fish"]> | ReturnType<Nookipedia["villagers"]>>(
    apiResponse: T,
  ): Promise<Exclude<Awaited<T>, Nookipedia.Error.EndpointError>> {
    const out = await apiResponse;
    if ("title" in out) {
      throw new Error(out.title + ": " + out.details);
    } else {
      return out as Exclude<Awaited<T>, Nookipedia.Error.EndpointError>;
    }
  }

  /**
   * @dev add in-house documentation
   * @since 0.2.0
   * @type {Record<Nookipedia.Villager.GameAlt, Nookipedia.Villager.GameActual>}
   */
  #gameNameAliasMap: Record<Nookipedia.Villager.GameAlt, Nookipedia.Villager.GameActual> = {
    "dobutsu no mori": "DNM",
    "animal crossing": "AC",
    "e+": "E_PLUS",
    "dobutsu no mori e+": "E_PLUS",
    "wild world": "WW",
    "city folk": "CF",
    "new leaf": "NL",
    "welcome amiibo": "WA",
    "new horizons": "NH",
    "dobutsu no mori film": "FILM",
    "gekijoban dobutsu no mori": "FILM",
    "happy home designer": "HHD",
    "pocket camp": "PC",
  };
  /**
   * @dev add documentation
   * @since 0.1.0
   * @param {Nookipedia.Villager.Filter | Nookipedia.Villager.FilterNHDetails | Nookipedia.Villager.FilterExcludeDetails} [filters]
   * @returns {Promise<Array<Nookipedia.Villager.Schema> | Array<Nookipedia.Villager.SchemaNHDetails> | Array<Nookipedia.Common.SchemaExcludeDetails> | Nookipedia.Error.EndpointError>}
   */
  // get villagers
  async villagers(filters?: Nookipedia.Villager.Filter): Promise<Array<Nookipedia.Villager.Schema> | Nookipedia.Error.EndpointError>;
  // get villagers + New Horizons details
  async villagers(
    filters?: Nookipedia.Villager.FilterNHDetails,
  ): Promise<Array<Nookipedia.Villager.SchemaNHDetails> | Nookipedia.Error.EndpointError>;
  // get villager names only
  async villagers(
    filters?: Nookipedia.Villager.FilterExcludeDetails,
  ): Promise<Array<Nookipedia.Common.SchemaExcludeDetails> | Nookipedia.Error.EndpointError>;
  // type safety
  async villagers(
    filters?: Nookipedia.Villager.Filter | Nookipedia.Villager.FilterNHDetails | Nookipedia.Villager.FilterExcludeDetails,
  ): Promise<
    | Array<Nookipedia.Villager.Schema>
    | Array<Nookipedia.Villager.SchemaNHDetails>
    | Array<Nookipedia.Common.SchemaExcludeDetails>
    | Nookipedia.Error.EndpointError
  >;
  // implementation
  async villagers(
    filters?: Nookipedia.Villager.Filter | Nookipedia.Villager.FilterNHDetails | Nookipedia.Villager.FilterExcludeDetails,
  ): Promise<
    | Array<Nookipedia.Villager.Schema>
    | Array<Nookipedia.Villager.SchemaNHDetails>
    | Array<Nookipedia.Common.SchemaExcludeDetails>
    | Nookipedia.Error.EndpointError
  > {
    if (filters) {
      let games = Array.isArray(filters.game) ? filters.game : filters.game ? [filters.game] : [];
      filters.game = games.map((game) => {
        if (game in this.#gameNameAliasMap) {
          game = this.#gameNameAliasMap[game as Nookipedia.Villager.GameAlt];
        }
        return game;
      });
    }
    const endpoint = "villagers?" + this.#bodyToParams(filters ?? {});
    return await this.#fetch<
      | Array<Nookipedia.Villager.Schema>
      | Array<Nookipedia.Villager.SchemaNHDetails>
      | Array<Nookipedia.Common.SchemaExcludeDetails>
      | Nookipedia.Error.EndpointError
    >(endpoint);
  }

  /**
   * @dev add documentation
   * @since 0.2.0
   * @param {Nookipedia.Fish.FilterSingle | Nookipedia.Fish.FilterMany | Nookipedia.Fish.FilterExcludeDetails} [filters]
   * @returns {Promise<Nookipedia.Fish.Schema | Array<Nookipedia.Fish.Schema> | Array<Nookipedia.Common.SchemaExcludeDetails> | Nookipedia.Error.EndpointError>}
   */
  // get one fish
  async fish(filters: Nookipedia.Fish.FilterSingle): Promise<Nookipedia.Fish.Schema | Nookipedia.Error.EndpointError>;
  // get many fish
  async fish(filters?: Nookipedia.Fish.FilterMany): Promise<Array<Nookipedia.Fish.Schema> | Nookipedia.Error.EndpointError>;
  // get many fish names only
  async fish(
    filters?: Nookipedia.Fish.FilterExcludeDetails,
  ): Promise<Array<Nookipedia.Common.SchemaExcludeDetails> | Nookipedia.Error.EndpointError>;
  // type safety
  async fish(
    filters?: Nookipedia.Fish.FilterSingle | Nookipedia.Fish.FilterMany | Nookipedia.Fish.FilterExcludeDetails,
  ): Promise<
    Nookipedia.Fish.Schema | Array<Nookipedia.Fish.Schema> | Array<Nookipedia.Common.SchemaExcludeDetails> | Nookipedia.Error.EndpointError
  >;
  // implementation
  async fish(
    filters?: Nookipedia.Fish.FilterSingle | Nookipedia.Fish.FilterMany | Nookipedia.Fish.FilterExcludeDetails,
  ): Promise<
    Nookipedia.Fish.Schema | Array<Nookipedia.Fish.Schema> | Array<Nookipedia.Common.SchemaExcludeDetails> | Nookipedia.Error.EndpointError
  > {
    const endpoint = `/nh/fish${filters && "fish" in filters ? `/${filters.fish}` : ""}?${this.#bodyToParams(filters ?? {})}`;
    return await this.#fetch<Array<Nookipedia.Fish.Schema> | Nookipedia.Fish.Schema | Nookipedia.Error.EndpointError>(endpoint);
  }

  /**
   * @dev add documentation
   * @since 0.2.0
   * @param {Nookipedia.Bug.FilterSingle | Nookipedia.Bug.FilterMany | Nookipedia.Bug.FilterExcludeDetails} [filters]
   * @returns {Promise<Nookipedia.Bug.Schema | Array<Nookipedia.Bug.Schema> | Array<Nookipedia.Common.SchemaExcludeDetails> | Nookipedia.Error.EndpointError>}
   */
  // get one bug
  async bugs(filters: Nookipedia.Bug.FilterSingle): Promise<Nookipedia.Bug.Schema | Nookipedia.Error.EndpointError>;
  // get many bugs
  async bugs(filters?: Nookipedia.Bug.FilterMany): Promise<Array<Nookipedia.Bug.Schema> | Nookipedia.Error.EndpointError>;
  // get many bugs names only
  async bugs(
    filters?: Nookipedia.Bug.FilterExcludeDetails,
  ): Promise<Array<Nookipedia.Common.SchemaExcludeDetails> | Nookipedia.Error.EndpointError>;
  // type safety
  async bugs(
    filters?: Nookipedia.Bug.FilterSingle | Nookipedia.Bug.FilterMany | Nookipedia.Bug.FilterExcludeDetails,
  ): Promise<
    Nookipedia.Bug.Schema | Array<Nookipedia.Bug.Schema> | Array<Nookipedia.Common.SchemaExcludeDetails> | Nookipedia.Error.EndpointError
  >;
  // implementation
  async bugs(
    filters?: Nookipedia.Bug.FilterSingle | Nookipedia.Bug.FilterMany | Nookipedia.Bug.FilterExcludeDetails,
  ): Promise<
    Nookipedia.Bug.Schema | Array<Nookipedia.Bug.Schema> | Array<Nookipedia.Common.SchemaExcludeDetails> | Nookipedia.Error.EndpointError
  > {
    const endpoint = `/nh/bugs${filters && "bug" in filters ? `/${filters.bug}` : ""}?${this.#bodyToParams(filters ?? {})}`;
    return await this.#fetch<Array<Nookipedia.Bug.Schema> | Nookipedia.Bug.Schema | Nookipedia.Error.EndpointError>(endpoint);
  }
}
