/// <reference path="./types/index.ts" />
import fetch from "node-fetch";

/**
 * @dev add documentation
 * @param {string} apiKey
 * @param {Nookipedia.Common.Config} [config={}]
 * @param {Nookipedia.Common.Config["baseURL"]} [config.baseURL]
 * @param {Nookipedia.Common.Config["apiVersion"]} [config.apiVersion]
 * @param {Nookipedia.Common.Config["logUrl"]} [config.logUrl]
 * @since 0.1.0
 * @author Will 'Willster' Johnson (@willster277)
 */
export default class NookipediaClass {
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

  // ###########################################################################################################################
  // ###########################################################################################################################
  // ######################################################### PRIVATE #########################################################
  // ###########################################################################################################################
  // ###########################################################################################################################

  /**
   * @dev add in-house documentation
   * @type {string}
   * @since 0.1.0
   * @author Will 'Willster' Johnson (@willster277)
   */
  #apiKey: string;

  /**
   * @dev add in-house documentation
   * @type {Record<Nookipedia.Villager.GameAlt, Nookipedia.Villager.GameActual>}
   * @since 0.2.0
   * @author Will 'Willster' Johnson (@willster277)
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
   * @dev add in-house documentation
   * @template {Nookipedia.Utils.MaybeArray<Record<string, any>>} ExpectedType
   * @param {string} endpoint
   * @returns {Promise<ExpectedType>}
   * @since 0.1.0
   * @author Will 'Willster' Johnson (@willster277)
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
   * @param {Record<string, Nookipedia.Utils.MaybeArray<string | number | boolean>>} body
   * @returns {string}
   * @since 0.1.0
   * @author Will 'Willster' Johnson (@willster277)
   */
  #bodyToParams(body: Record<string, Nookipedia.Utils.MaybeArray<string | number | boolean>>): string {
    return Object.entries(body)
      .map(([key, value]) => {
        if (Array.isArray(value)) {
          return value.map((item) => `${key}=${encodeURIComponent(item)}`).join("&");
        } else {
          return `${key}=${value}`;
        }
      })
      .join("&");
  }

  /**
   * @dev add in-house documentation
   * @param {Nookipedia.Today.Schema} event
   * @dev maintain union of extraInfo locations
   * @param {{ [K in keyof Nookipedia.Today.extraInfo]: (date: Nookipedia.Today.Schema["date"]) => Nookipedia.Utils.MaybePromise<Nookipedia.Today.extraInfo[K]> }} assign
   */
  async #todayExtraInfo(
    event: Nookipedia.Today.Schema,
    assign: {
      [K in keyof Nookipedia.Today.extraInfo]: (
        event: Nookipedia.Today.Schema["event"],
        date: [year: Nookipedia.Event.Year, month: Nookipedia.Month.Valid, date: Nookipedia.Month.Day],
      ) => Nookipedia.Utils.MaybePromise<Nookipedia.Today.extraInfo[K]>;
    },
  ): Promise<void> {
    for (const [key, value] of Object.entries(assign)) {
      if (event.type === key) {
        event.extraInfo = await value(
          event.event,
          event.date.split("-") as [Nookipedia.Event.Year, Nookipedia.Month.Valid, Nookipedia.Month.Day],
        );
      }
    }
  }

  // ############################################################################################################################
  // ############################################################################################################################
  // ########################################################## PUBLIC ##########################################################
  // ############################################################################################################################
  // ############################################################################################################################

  // ############################################################################################################################
  // ########################################################### MISC ###########################################################
  // ############################################################################################################################

  /**
   * @dev add documentation
   * @type {string}
   * @since 0.1.0
   * @author Will 'Willster' Johnson (@willster277)
   */
  baseURL: string = "https://api.nookipedia.com/";
  /**
   * @dev add documentation
   * @type {string}
   * @since 0.1.0
   * @author Will 'Willster' Johnson (@willster277)
   */
  apiVersion: string = "1.5.0";
  /**
   * @dev add documentation
   * @type {boolean}
   * @since 0.2.0
   * @author Will 'Willster' Johnson (@willster277)
   */
  logUrl: boolean = false;

  /**
   * @dev add documentation
   * @template {Array<Nookipedia.Villager.Schema> | Array<Nookipedia.Villager.SchemaNHDetails> | Nookipedia.Utils.MaybeArray<Nookipedia.Fish.Schema> | Nookipedia.Utils.MaybeArray<Nookipedia.Bug.Schema> | Array<Nookipedia.Event.Schema> | Array<Nookipedia.Common.SchemaExcludeDetails>} ExpectedType
   * @param {Promise<ExpectedType | Nookipedia.Error.EndpointError>} apiResponse
   * @returns {Promise<ExpectedType>}
   * @since 0.1.0
   * @author Will 'Willster' Johnson (@willster277)
   */
  async checkErrors<
    ExpectedType extends  // villagers
      | Array<Nookipedia.Villager.Schema>
      | Array<Nookipedia.Villager.SchemaNHDetails>
      // fish
      | Nookipedia.Utils.MaybeArray<Nookipedia.Fish.Schema>
      // bugs
      | Nookipedia.Utils.MaybeArray<Nookipedia.Bug.Schema>
      // events
      | Array<Nookipedia.Event.Schema>
      // common
      | Array<Nookipedia.Common.SchemaExcludeDetails>,
  >(apiResponse: Promise<ExpectedType | Nookipedia.Error.EndpointError>): Promise<ExpectedType> {
    const out = await apiResponse;
    if ("title" in out) throw new Error(out.title + ": " + out.details);
    return out;
  }

  // ############################################################################################################################
  // ######################################################### ENDPOINT #########################################################
  // ############################################################################################################################

  /**
   * @dev add documentation
   * @template {Array<Nookipedia.Villager.Schema> | Array<Nookipedia.Villager.SchemaNHDetails> | Array<Nookipedia.Common.SchemaExcludeDetails>} ExpectedType
   * @param {Nookipedia.Villager.Filter | Nookipedia.Villager.FilterNHDetails | Nookipedia.Villager.FilterExcludeDetails} [filters]
   * @returns {Promise<ExpectedType | Nookipedia.Error.EndpointError>}
   * @since 0.1.0
   * @author Will 'Willster' Johnson (@willster277)
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
  // implementation
  /**
   * @dev add documentation
   * @template {Array<Nookipedia.Villager.Schema> | Array<Nookipedia.Villager.SchemaNHDetails> | Array<Nookipedia.Common.SchemaExcludeDetails>} ExpectedType
   * @param {Nookipedia.Villager.Filter | Nookipedia.Villager.FilterNHDetails | Nookipedia.Villager.FilterExcludeDetails} [filters]
   * @returns {Promise<ExpectedType | Nookipedia.Error.EndpointError>}
   * @since 0.1.0
   * @author Will 'Willster' Johnson (@willster277)
   */
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
   * @template {Nookipedia.Utils.MaybeArray<Nookipedia.Fish.Schema> | Array<Nookipedia.Common.SchemaExcludeDetails>} ExpectedType
   * @param {Nookipedia.Fish.FilterSingle | Nookipedia.Fish.FilterMany | Nookipedia.Fish.FilterExcludeDetails} [filters]
   * @returns {ExpectedType | Nookipedia.Error.EndpointError>}
   * @since 0.2.0
   * @author Will 'Willster' Johnson (@willster277)
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
  /**
   * @dev add documentation
   * @template {Nookipedia.Utils.MaybeArray<Nookipedia.Fish.Schema> | Array<Nookipedia.Common.SchemaExcludeDetails>} ExpectedType
   * @param {Nookipedia.Fish.FilterSingle | Nookipedia.Fish.FilterMany | Nookipedia.Fish.FilterExcludeDetails} [filters]
   * @returns {ExpectedType | Nookipedia.Error.EndpointError>}
   * @since 0.2.0
   * @author Will 'Willster' Johnson (@willster277)
   */
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
   * @template {Nookipedia.Utils.MaybeArray<Nookipedia.Bug.Schema> | Array<Nookipedia.Common.SchemaExcludeDetails>} ExpectedType
   * @param {Nookipedia.Bug.FilterSingle | Nookipedia.Bug.FilterMany | Nookipedia.Bug.FilterExcludeDetails} [filters]
   * @returns {Promise<ExpectedType | Nookipedia.Error.EndpointError>}
   * @since 0.2.0
   * @author Will 'Willster' Johnson (@willster277)
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
  /**
   * @dev add documentation
   * @template {Nookipedia.Utils.MaybeArray<Nookipedia.Bug.Schema> | Array<Nookipedia.Common.SchemaExcludeDetails>} ExpectedType
   * @param {Nookipedia.Bug.FilterSingle | Nookipedia.Bug.FilterMany | Nookipedia.Bug.FilterExcludeDetails} [filters]
   * @returns {Promise<ExpectedType | Nookipedia.Error.EndpointError>}
   * @since 0.2.0
   * @author Will 'Willster' Johnson (@willster277)
   */
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

  // async seaCreatures() {};

  /**
   * @dev add documentation
   * @template {Array<Nookipedia.Event.Schema>} ExpectedType
   * @param {Nookipedia.Event.Filter} [filters]
   * @returns {Promise<ExpectedType | Nookipedia.Error.EndpointError>}
   * @since 0.4.0
   * @author Will 'Willster' Johnson (@willster277)
   */
  async events<ExpectedType extends Array<Nookipedia.Event.Schema> = Array<Nookipedia.Event.Schema>>(
    filters?: Nookipedia.Event.Filter,
  ): Promise<ExpectedType | Nookipedia.Error.EndpointError> {
    const endpoint = "/nh/events?" + this.#bodyToParams(filters ?? {});
    return await this.#fetch<ExpectedType | Nookipedia.Error.EndpointError>(endpoint);
  }
  // async art() {};
  // async furniture() {};
  // async clothing() {};
  // async interior() {};
  // async tools() {};
  // async photos() {};
  // async items() {};
  // async recipes() {};
  // async fossils() {};
  // async fossilGroups() {};
  // async allFossils() {};

  // ############################################################################################################################
  // ######################################################### ABSTRACT #########################################################
  // ############################################################################################################################

  /**
   * Get all of today's events, if any.
   *
   * If there is additional info about the event that can be fetched
   * from elsewhere, it will be on the `extraInfo` property.
   * @dev implement referencing, eg if type == "Birthday", add property `details` containing Villager.SchemaNHDetails
   * @returns {Promise<Array<Nookipedia.Today.Schema>>}
   */
  async today(): Promise<Array<Nookipedia.Today.Schema>> {
    let events: Array<Nookipedia.Today.Schema> = await this.checkErrors(this.events({ date: "today" }));
    for (const event of events) {
      await this.#todayExtraInfo(event, {
        Birthday: async (name, [_, month, day]) =>
          (
            await this.checkErrors<[Nookipedia.Villager.SchemaNHDetails]>(
              this.villagers({
                name: name.split("'s")[0],
                nhdetails: true,
                birthday: day,
                birthmonth: month,
              }),
            )
          )[0],
      });
    }
    return events;
  }
}
