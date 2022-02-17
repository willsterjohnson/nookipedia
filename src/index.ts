/// <reference path="./types/index.ts" />
import fetch from "node-fetch";

/**
 * @dev add documentation
 * @since 0.1.0
 */
export default class NookipediaClass {
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
   * @template {Nookipedia.Utils.MaybeArray<Record<string, any>>} ExpectedType
   * @param {string} endpoint
   * @returns {Promise<ExpectedType>}
   */
  async #fetch<ExpectedType extends Nookipedia.Utils.MaybeArray<Record<string, any>>>(endpoint: string): Promise<ExpectedType> {
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
   * @param {Nookipedia.Common.Config} [config={}]
   * @param {Nookipedia.Common.Config["baseURL"]} [config.baseURL]
   * @param {Nookipedia.Common.Config["apiVersion"]} [config.apiVersion]
   * @param {Nookipedia.Common.Config["logUrl"]} [config.logUrl]
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
   * @template {Nookipedia.Utils.AwaitedReturn<NookipediaClass["bugs"] | NookipediaClass["fish"] | NookipediaClass["villagers"]>} ExpectedType
   * @param {Promise<ExpectedType | Nookipedia.Error.EndpointError>} apiResponse
   * @returns {Promise<Exclude<Awaited<ExpectedType>, Nookipedia.Error.EndpointError>>}
   */
  async checkErrors<
    ExpectedType extends Nookipedia.Utils.AwaitedReturn<
      NookipediaClass["bugs"] | NookipediaClass["fish"] | NookipediaClass["villagers"]
    >,
  >(
    apiResponse: Promise<ExpectedType | Nookipedia.Error.EndpointError>,
  ): Promise<Exclude<Awaited<ExpectedType>, Nookipedia.Error.EndpointError>> {
    const out = await apiResponse;
    if ("title" in out) throw new Error(out.title + ": " + out.details);
    return out as Exclude<Awaited<ExpectedType>, Nookipedia.Error.EndpointError>;
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
   * @template {Array<Nookipedia.Villager.Schema> | Array<Nookipedia.Villager.SchemaNHDetails> | Array<Nookipedia.Common.SchemaExcludeDetails>} ExpectedType
   * @param {Nookipedia.Villager.Filter | Nookipedia.Villager.FilterNHDetails | Nookipedia.Villager.FilterExcludeDetails} [filters]
   * @returns {Promise<ExpectedType | Nookipedia.Error.EndpointError>}
   */
  // get villagers
  async villagers<ExpectedType extends Array<Nookipedia.Villager.Schema> = Array<Nookipedia.Villager.Schema>>(
    filters?: Nookipedia.Villager.Filter,
  ): Promise<ExpectedType | Nookipedia.Error.EndpointError>;
  // get villagers + New Horizons details
  async villagers<ExpectedType extends Array<Nookipedia.Villager.SchemaNHDetails> = Array<Nookipedia.Villager.SchemaNHDetails>>(
    filters?: Nookipedia.Villager.FilterNHDetails,
  ): Promise<ExpectedType | Nookipedia.Error.EndpointError>;
  // get villager names only
  async villagers<
    ExpectedType extends Array<Nookipedia.Common.SchemaExcludeDetails> = Array<Nookipedia.Common.SchemaExcludeDetails>,
  >(filters?: Nookipedia.Villager.FilterExcludeDetails): Promise<ExpectedType | Nookipedia.Error.EndpointError>;
  // type safety
  async villagers<
    ExpectedType extends
      | Array<Nookipedia.Villager.Schema>
      | Array<Nookipedia.Villager.SchemaNHDetails>
      | Array<Nookipedia.Common.SchemaExcludeDetails> =
      | Array<Nookipedia.Villager.Schema>
      | Array<Nookipedia.Villager.SchemaNHDetails>
      | Array<Nookipedia.Common.SchemaExcludeDetails>,
  >(
    filters?: Nookipedia.Villager.Filter | Nookipedia.Villager.FilterNHDetails | Nookipedia.Villager.FilterExcludeDetails,
  ): Promise<ExpectedType | Nookipedia.Error.EndpointError>;
  // implementation
  async villagers<
    ExpectedType extends
      | Array<Nookipedia.Villager.Schema>
      | Array<Nookipedia.Villager.SchemaNHDetails>
      | Array<Nookipedia.Common.SchemaExcludeDetails> =
      | Array<Nookipedia.Villager.Schema>
      | Array<Nookipedia.Villager.SchemaNHDetails>
      | Array<Nookipedia.Common.SchemaExcludeDetails>,
  >(
    filters?: Nookipedia.Villager.Filter | Nookipedia.Villager.FilterNHDetails | Nookipedia.Villager.FilterExcludeDetails,
  ): Promise<ExpectedType | Nookipedia.Error.EndpointError> {
    if (filters) {
      let games = Array.isArray(filters.game) ? filters.game : filters.game ? [filters.game] : [];
      filters.game = [];
      for (let game of games) {
        if (game in this.#gameNameAliasMap) {
          game = this.#gameNameAliasMap[game as Nookipedia.Villager.GameAlt];
        }
        filters.game.push(game);
      }
    }
    const endpoint = "villagers?" + this.#bodyToParams(filters ?? {});
    return await this.#fetch<ExpectedType | Nookipedia.Error.EndpointError>(endpoint);
  }

  /**
   * @dev add documentation
   * @since 0.2.0
   * @template {Nookipedia.Utils.MaybeArray<Nookipedia.Fish.Schema> | Array<Nookipedia.Common.SchemaExcludeDetails>} ExpectedType
   * @param {Nookipedia.Fish.FilterSingle | Nookipedia.Fish.FilterMany | Nookipedia.Fish.FilterExcludeDetails} [filters]
   * @returns {ExpectedType | Nookipedia.Error.EndpointError>}
   */
  // get one fish
  async fish<ExpectedType extends Nookipedia.Fish.Schema = Nookipedia.Fish.Schema>(
    filters: Nookipedia.Fish.FilterSingle,
  ): Promise<ExpectedType | Nookipedia.Error.EndpointError>;
  // get many fish
  async fish<ExpectedType extends Array<Nookipedia.Fish.Schema> = Array<Nookipedia.Fish.Schema>>(
    filters?: Nookipedia.Fish.FilterMany,
  ): Promise<ExpectedType | Nookipedia.Error.EndpointError>;
  // get many fish names only
  async fish<ExpectedType extends Array<Nookipedia.Common.SchemaExcludeDetails> = Array<Nookipedia.Common.SchemaExcludeDetails>>(
    filters?: Nookipedia.Fish.FilterExcludeDetails,
  ): Promise<ExpectedType | Nookipedia.Error.EndpointError>;
  // type safety
  async fish<
    ExpectedType extends Nookipedia.Utils.MaybeArray<Nookipedia.Fish.Schema> | Array<Nookipedia.Common.SchemaExcludeDetails> =
      | Nookipedia.Utils.MaybeArray<Nookipedia.Fish.Schema>
      | Array<Nookipedia.Common.SchemaExcludeDetails>,
  >(
    filters?: Nookipedia.Fish.FilterSingle | Nookipedia.Fish.FilterMany | Nookipedia.Fish.FilterExcludeDetails,
  ): Promise<ExpectedType | Nookipedia.Error.EndpointError>;
  // implementation
  async fish<
    ExpectedType extends Nookipedia.Utils.MaybeArray<Nookipedia.Fish.Schema> | Array<Nookipedia.Common.SchemaExcludeDetails> =
      | Nookipedia.Utils.MaybeArray<Nookipedia.Fish.Schema>
      | Array<Nookipedia.Common.SchemaExcludeDetails>,
  >(
    filters?: Nookipedia.Fish.FilterSingle | Nookipedia.Fish.FilterMany | Nookipedia.Fish.FilterExcludeDetails,
  ): Promise<ExpectedType | Nookipedia.Error.EndpointError> {
    const endpoint = `/nh/fish${filters && "fish" in filters ? `/${filters.fish}` : ""}?${this.#bodyToParams(filters ?? {})}`;
    return await this.#fetch<ExpectedType | Nookipedia.Error.EndpointError>(endpoint);
  }

  /**
   * @dev add documentation
   * @since 0.2.0
   * @template {Nookipedia.Utils.MaybeArray<Nookipedia.Bug.Schema> | Array<Nookipedia.Common.SchemaExcludeDetails>} ExpectedType
   * @param {Nookipedia.Bug.FilterSingle | Nookipedia.Bug.FilterMany | Nookipedia.Bug.FilterExcludeDetails} [filters]
   * @returns {Promise<ExpectedType | Nookipedia.Error.EndpointError>}
   */
  // get one bug
  async bugs<ExpectedType extends Nookipedia.Bug.Schema = Nookipedia.Bug.Schema>(
    filters: Nookipedia.Bug.FilterSingle,
  ): Promise<ExpectedType | Nookipedia.Error.EndpointError>;
  // get many bugs
  async bugs<ExpectedType extends Array<Nookipedia.Bug.Schema> = Array<Nookipedia.Bug.Schema>>(
    filters?: Nookipedia.Bug.FilterMany,
  ): Promise<ExpectedType | Nookipedia.Error.EndpointError>;
  // get many bugs names only
  async bugs<ExpectedType extends Array<Nookipedia.Common.SchemaExcludeDetails> = Array<Nookipedia.Common.SchemaExcludeDetails>>(
    filters?: Nookipedia.Bug.FilterExcludeDetails,
  ): Promise<ExpectedType | Nookipedia.Error.EndpointError>;
  // type safety
  async bugs<
    ExpectedType extends Nookipedia.Utils.MaybeArray<Nookipedia.Bug.Schema> | Array<Nookipedia.Common.SchemaExcludeDetails> =
      | Nookipedia.Utils.MaybeArray<Nookipedia.Bug.Schema>
      | Array<Nookipedia.Common.SchemaExcludeDetails>,
  >(
    filters?: Nookipedia.Bug.FilterSingle | Nookipedia.Bug.FilterMany | Nookipedia.Bug.FilterExcludeDetails,
  ): Promise<ExpectedType | Nookipedia.Error.EndpointError>;
  // implementation
  async bugs<
    ExpectedType extends Nookipedia.Utils.MaybeArray<Nookipedia.Bug.Schema> | Array<Nookipedia.Common.SchemaExcludeDetails> =
      | Nookipedia.Utils.MaybeArray<Nookipedia.Bug.Schema>
      | Array<Nookipedia.Common.SchemaExcludeDetails>,
  >(
    filters?: Nookipedia.Bug.FilterSingle | Nookipedia.Bug.FilterMany | Nookipedia.Bug.FilterExcludeDetails,
  ): Promise<ExpectedType | Nookipedia.Error.EndpointError> {
    const endpoint = `/nh/bugs${filters && "bug" in filters ? `/${filters.bug}` : ""}?${this.#bodyToParams(filters ?? {})}`;
    return await this.#fetch<ExpectedType | Nookipedia.Error.EndpointError>(endpoint);
  }
}
