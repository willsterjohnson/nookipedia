/// <reference path="./types/index.d.ts" />
import fetch from "node-fetch";
import NK = Nookipedia;

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
   * @template {Record<string, any> | Array<Record<string, any>>} ExpectedType
   * @param {string} endpoint
   * @returns {Promise<ExpectedType>}
   */
  async #fetch<ExpectedType extends Record<string, any> | Array<Record<string, any>>>(endpoint: string): Promise<ExpectedType> {
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
    return JSON.parse(stringify.replace(/\\u2013/g, "-")) as ExpectedType;
  }

  /**
   * @dev add in-house documentation
   * @since 0.1.0
   * @param {Record<string, NK.Utils.MaybeArray<string | number | boolean>>} body
   * @returns {string}
   */
  #bodyToParams(body: Record<string, NK.Utils.MaybeArray<string | number | boolean>>): string {
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
   * @param {NK.Config} [config={}]
   * @param {NK.Config["baseURL"]} [config.baseURL]
   * @param {NK.Config["apiVersion"]} [config.apiVersion]
   * @param {NK.Config["logUrl"]} [config.logUrl]
   */
  constructor(apiKey: string, config: NK.Common.Config = {}) {
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
   * @template {NK.Utils.AwaitedReturn<Nookipedia["bugs"] | Nookipedia["fish"] | Nookipedia["villagers"]>} ExpectedType
   * @param {Promise<ExpectedType | NK.Error.EndpointError>} apiResponse
   * @returns {Promise<Exclude<Awaited<ExpectedType>, NK.Error.EndpointError>>}
   */
  async checkErrors<
    ExpectedType extends NK.Utils.AwaitedReturn<Nookipedia["bugs"] | Nookipedia["fish"] | Nookipedia["villagers"]>,
  >(
    apiResponse: Promise<ExpectedType | NK.Error.EndpointError>,
  ): Promise<Exclude<Awaited<ExpectedType>, NK.Error.EndpointError>> {
    const out = await apiResponse;
    if ("title" in out) throw new Error(out.title + ": " + out.details);
    return out as Exclude<Awaited<ExpectedType>, NK.Error.EndpointError>;
  }

  /**
   * @dev add in-house documentation
   * @since 0.2.0
   * @type {Record<NK.Villager.GameAlt, NK.Villager.GameActual>}
   */
  #gameNameAliasMap: Record<NK.Villager.GameAlt, NK.Villager.GameActual> = {
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
   * @param {NK.Villager.Filter | NK.Villager.FilterNHDetails | NK.Villager.FilterExcludeDetails} [filters]
   * @returns {Promise<Array<NK.Villager.Schema> | Array<NK.Villager.SchemaNHDetails> | Array<NK.Common.SchemaExcludeDetails> | NK.Error.EndpointError>}
   */
  // get villagers
  async villagers<ExpectedType extends Array<NK.Villager.Schema> = Array<NK.Villager.Schema>>(
    filters?: NK.Villager.Filter,
  ): Promise<ExpectedType | NK.Error.EndpointError>;
  // get villagers + New Horizons details
  async villagers<ExpectedType extends Array<NK.Villager.SchemaNHDetails> = Array<NK.Villager.SchemaNHDetails>>(
    filters?: NK.Villager.FilterNHDetails,
  ): Promise<ExpectedType | NK.Error.EndpointError>;
  // get villager names only
  async villagers<ExpectedType extends Array<NK.Common.SchemaExcludeDetails> = Array<NK.Common.SchemaExcludeDetails>>(
    filters?: NK.Villager.FilterExcludeDetails,
  ): Promise<ExpectedType | NK.Error.EndpointError>;
  // type safety
  async villagers<
    ExpectedType extends Array<NK.Villager.Schema> | Array<NK.Villager.SchemaNHDetails> | Array<NK.Common.SchemaExcludeDetails> =
      | Array<NK.Villager.Schema>
      | Array<NK.Villager.SchemaNHDetails>
      | Array<NK.Common.SchemaExcludeDetails>,
  >(
    filters?: NK.Villager.Filter | NK.Villager.FilterNHDetails | NK.Villager.FilterExcludeDetails,
  ): Promise<ExpectedType | NK.Error.EndpointError>;
  // implementation
  async villagers<
    ExpectedType extends Array<NK.Villager.Schema> | Array<NK.Villager.SchemaNHDetails> | Array<NK.Common.SchemaExcludeDetails> =
      | Array<NK.Villager.Schema>
      | Array<NK.Villager.SchemaNHDetails>
      | Array<NK.Common.SchemaExcludeDetails>,
  >(
    filters?: NK.Villager.Filter | NK.Villager.FilterNHDetails | NK.Villager.FilterExcludeDetails,
  ): Promise<ExpectedType | NK.Error.EndpointError> {
    if (filters) {
      let games = Array.isArray(filters.game) ? filters.game : filters.game ? [filters.game] : [];
      filters.game = [];
      for (let game of games) {
        if (game in this.#gameNameAliasMap) {
          game = this.#gameNameAliasMap[game as NK.Villager.GameAlt];
        }
        filters.game.push(game);
      }
    }
    const endpoint = "villagers?" + this.#bodyToParams(filters ?? {});
    return await this.#fetch<ExpectedType | NK.Error.EndpointError>(endpoint);
  }

  /**
   * @dev add documentation
   * @since 0.2.0
   * @param {NK.Fish.FilterSingle | NK.Fish.FilterMany | NK.Fish.FilterExcludeDetails} [filters]
   * @returns {Promise<NK.Utils.MaybeArray<NK.Fish.Schema> | Array<NK.Common.SchemaExcludeDetails> | NK.Error.EndpointError>}
   */
  // get one fish
  async fish<ExpectedType extends NK.Fish.Schema = NK.Fish.Schema>(
    filters: NK.Fish.FilterSingle,
  ): Promise<ExpectedType | NK.Error.EndpointError>;
  // get many fish
  async fish<ExpectedType extends Array<NK.Fish.Schema> = Array<NK.Fish.Schema>>(
    filters?: NK.Fish.FilterMany,
  ): Promise<ExpectedType | NK.Error.EndpointError>;
  // get many fish names only
  async fish<ExpectedType extends Array<NK.Common.SchemaExcludeDetails> = Array<NK.Common.SchemaExcludeDetails>>(
    filters?: NK.Fish.FilterExcludeDetails,
  ): Promise<ExpectedType | NK.Error.EndpointError>;
  // type safety
  async fish<
    ExpectedType extends NK.Utils.MaybeArray<NK.Fish.Schema> | Array<NK.Common.SchemaExcludeDetails> =
      | NK.Utils.MaybeArray<NK.Fish.Schema>
      | Array<NK.Common.SchemaExcludeDetails>,
  >(
    filters?: NK.Fish.FilterSingle | NK.Fish.FilterMany | NK.Fish.FilterExcludeDetails,
  ): Promise<ExpectedType | NK.Error.EndpointError>;
  // implementation
  async fish<
    ExpectedType extends NK.Utils.MaybeArray<NK.Fish.Schema> | Array<NK.Common.SchemaExcludeDetails> =
      | NK.Utils.MaybeArray<NK.Fish.Schema>
      | Array<NK.Common.SchemaExcludeDetails>,
  >(
    filters?: NK.Fish.FilterSingle | NK.Fish.FilterMany | NK.Fish.FilterExcludeDetails,
  ): Promise<ExpectedType | NK.Error.EndpointError> {
    const endpoint = `/nh/fish${filters && "fish" in filters ? `/${filters.fish}` : ""}?${this.#bodyToParams(filters ?? {})}`;
    return await this.#fetch<ExpectedType | NK.Error.EndpointError>(endpoint);
  }

  /**
   * @dev add documentation
   * @since 0.2.0
   * @param {NK.Bug.FilterSingle | NK.Bug.FilterMany | NK.Bug.FilterExcludeDetails} [filters]
   * @returns {Promise<NK.Bug.Schema | Array<NK.Bug.Schema> | Array<NK.Common.SchemaExcludeDetails> | NK.Error.EndpointError>}
   */
  // get one bug
  async bugs<ExpectedType extends NK.Bug.Schema = NK.Bug.Schema>(
    filters: NK.Bug.FilterSingle,
  ): Promise<ExpectedType | NK.Error.EndpointError>;
  // get many bugs
  async bugs<ExpectedType extends Array<NK.Bug.Schema> = Array<NK.Bug.Schema>>(
    filters?: NK.Bug.FilterMany,
  ): Promise<ExpectedType | NK.Error.EndpointError>;
  // get many bugs names only
  async bugs<ExpectedType extends Array<NK.Common.SchemaExcludeDetails> = Array<NK.Common.SchemaExcludeDetails>>(
    filters?: NK.Bug.FilterExcludeDetails,
  ): Promise<ExpectedType | NK.Error.EndpointError>;
  // type safety
  async bugs<
    ExpectedType extends NK.Utils.MaybeArray<NK.Bug.Schema> | Array<NK.Common.SchemaExcludeDetails> =
      | NK.Utils.MaybeArray<NK.Bug.Schema>
      | Array<NK.Common.SchemaExcludeDetails>,
  >(
    filters?: NK.Bug.FilterSingle | NK.Bug.FilterMany | NK.Bug.FilterExcludeDetails,
  ): Promise<ExpectedType | NK.Error.EndpointError>;
  // implementation
  async bugs<
    ExpectedType extends NK.Utils.MaybeArray<NK.Bug.Schema> | Array<NK.Common.SchemaExcludeDetails> =
      | NK.Utils.MaybeArray<NK.Bug.Schema>
      | Array<NK.Common.SchemaExcludeDetails>,
  >(
    filters?: NK.Bug.FilterSingle | NK.Bug.FilterMany | NK.Bug.FilterExcludeDetails,
  ): Promise<ExpectedType | NK.Error.EndpointError> {
    const endpoint = `/nh/bugs${filters && "bug" in filters ? `/${filters.bug}` : ""}?${this.#bodyToParams(filters ?? {})}`;
    return await this.#fetch<ExpectedType | NK.Error.EndpointError>(endpoint);
  }
}
