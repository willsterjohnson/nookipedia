import fetch from "node-fetch";
import type { MaybeArray } from "./types/utils";
import type { TEndpointError } from "./types/endpointErrors";
import type { TBug, TBugExcludeDetails, TBugFilterExcludeDetails, TBugFilterMany, TBugFilterSingle } from "./types/bugs";
import type { TFish, TFishExcludeDetails, TFishFilterExcludeDetails, TFishFilterMany, TFishFilterSingle } from "./types/fish";
import type {
  TVillager,
  TVillagerExcludeDetails,
  TVillagerNHDetails,
  TVillagerFilter,
  TVillagerFilterExcludeDetails,
  TVillagerFilterNHDetails,
  TVillagerGameAlt,
  TVillagerGameActual,
} from "./types/villagers";

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
  private apiKey: string;
  /**
   * @dev add documentation
   * @since 0.1.0
   * @type {string}
   */
  public baseURL: string = "https://api.nookipedia.com/";
  /**
   * @dev add documentation
   * @since 0.1.0
   * @type {string}
   */
  public apiVersion: string = "1.5.0";
  /**
   * @dev add documentation
   * @since 0.2.0
   * @type {boolean}
   */
  public logUrl: boolean = false;

  /**
   * @dev add in-house documentation
   * @since 0.1.0
   * @template {Record<string, any> | Array<Record<string, any>>} T
   * @param {string} endpoint
   * @returns {Promise<T>}
   */
  private async fetch<T extends Record<string, any> | Array<Record<string, any>>>(endpoint: string): Promise<T> {
    if (this.logUrl) {
      console.log(`\x1b[34m[Nookipedia]\x1b[0m Attempting to fetch data from: \x1b[32m${this.baseURL}${endpoint}\x1b[0m`);
    }
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      headers: {
        "X-API-KEY": this.apiKey,
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
   * @param {Record<string, import("./types/utils").MaybeArray<string | number | boolean>>} body
   * @returns {string}
   */
  private bodyToParams(body: Record<string, MaybeArray<string | number | boolean>>): string {
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
   * @param {{ baseURL?: string; apiVersion?: string; logUrl?: boolean }} [config={}]
   */
  constructor(apiKey: string, config: { baseURL?: string; apiVersion?: string; logUrl?: boolean } = {}) {
    this.apiKey = apiKey;
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
   * @template {ReturnType<Nookipedia["bugs"]>|ReturnType<Nookipedia["fish"]>|ReturnType<Nookipedia["villagers"]>} T
   * @param {T} apiResponse
   * @returns {Promise<Exclude<Awaited<T>, TEndpointError>>}
   */
  public async checkErrors<T extends ReturnType<Nookipedia["bugs"]> | ReturnType<Nookipedia["fish"]> | ReturnType<Nookipedia["villagers"]>>(
    apiResponse: T,
  ): Promise<Exclude<Awaited<T>, TEndpointError>> {
    const out = await apiResponse;
    if ("title" in out) {
      throw new Error(out.title + ": " + out.details);
    } else {
      return out as Exclude<Awaited<T>, TEndpointError>;
    }
  }

  private gameNameAliasMap: Record<TVillagerGameAlt, TVillagerGameActual> = {
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
   * @param {VillagerFilter | TVillagerFilterNHDetails | TVillagerFilterExcludeDetail} [filters]
   * @returns {Promise<Array<TVillager | TVillagerNHDetails | TVillagerExcludeDetails> | TEndpointError>}
   */
  // get villagers
  public async villagers(filters?: TVillagerFilter): Promise<Array<TVillager> | TEndpointError>;
  // get villagers + New Horizons details
  public async villagers(filters?: TVillagerFilterNHDetails): Promise<Array<TVillagerNHDetails> | TEndpointError>;
  // get villager names only
  public async villagers(filters?: TVillagerFilterExcludeDetails): Promise<Array<TVillagerExcludeDetails> | TEndpointError>;
  // type safety
  public async villagers(
    filters?: TVillagerFilter | TVillagerFilterNHDetails | TVillagerFilterExcludeDetails,
  ): Promise<Array<TVillager> | Array<TVillagerNHDetails> | Array<TVillagerExcludeDetails> | TEndpointError>;
  // implementation
  public async villagers(
    filters?: TVillagerFilter | TVillagerFilterNHDetails | TVillagerFilterExcludeDetails,
  ): Promise<Array<TVillager> | Array<TVillagerNHDetails> | Array<TVillagerExcludeDetails> | TEndpointError> {
    if (filters) {
      let games = Array.isArray(filters.game) ? filters.game : filters.game ? [filters.game] : [];
      filters.game = games.map((game) => {
        if (game in this.gameNameAliasMap) {
          game = this.gameNameAliasMap[game as TVillagerGameAlt];
        }
        return game;
      });
    }
    const endpoint = "villagers?" + this.bodyToParams(filters ?? {});
    return await this.fetch<Array<TVillager> | Array<TVillagerNHDetails> | Array<TVillagerExcludeDetails> | TEndpointError>(endpoint);
  }

  /**
   * @dev add documentation
   * @since 0.2.0
   * @param {TFishFilterSingle | TFishFilterMany | TFishFilterExcludeDetails} [filters]
   * @returns {Promise<TFish | Array<TFish> | Array<TFishExcludeDetails> | TEndpointError>}
   */
  // get one fish
  public async fish(filters: TFishFilterSingle): Promise<TFish | TEndpointError>;
  // get many fish
  public async fish(filters?: TFishFilterMany): Promise<Array<TFish> | TEndpointError>;
  // get many fish names only
  public async fish(filters?: TFishFilterExcludeDetails): Promise<Array<TFishExcludeDetails> | TEndpointError>;
  // type safety
  public async fish(
    filters?: TFishFilterSingle | TFishFilterMany | TFishFilterExcludeDetails,
  ): Promise<TFish | Array<TFish> | Array<TFishExcludeDetails> | TEndpointError>;
  // implementation
  public async fish(
    filters?: TFishFilterSingle | TFishFilterMany | TFishFilterExcludeDetails,
  ): Promise<TFish | Array<TFish> | Array<TFishExcludeDetails> | TEndpointError> {
    const endpoint = `/nh/fish${filters && "fish" in filters ? `/${filters.fish}` : ""}?${this.bodyToParams(filters ?? {})}`;
    return await this.fetch<Array<TFish> | TFish | TEndpointError>(endpoint);
  }

  /**
   * @dev add documentation
   * @since 0.2.0
   * @param {TBugFilterSingle | TBugFilterMany | TBugFilterExcludeDetails} [filters]
   * @returns {Promise<TBug | Array<TBug> | Array<TBugExcludeDetails> | TEndpointError>}
   */
  // get one bug
  public async bugs(filters: TBugFilterSingle): Promise<TBug | TEndpointError>;
  // get many bugs
  public async bugs(filters?: TBugFilterMany): Promise<Array<TBug> | TEndpointError>;
  // get many bugs names only
  public async bugs(filters?: TBugFilterExcludeDetails): Promise<Array<TBugExcludeDetails> | TEndpointError>;
  // type safety
  public async bugs(
    filters?: TBugFilterSingle | TBugFilterMany | TBugFilterExcludeDetails,
  ): Promise<TBug | Array<TBug> | Array<TBugExcludeDetails> | TEndpointError>;
  // implementation
  public async bugs(
    filters?: TBugFilterSingle | TBugFilterMany | TBugFilterExcludeDetails,
  ): Promise<TBug | Array<TBug> | Array<TBugExcludeDetails> | TEndpointError> {
    const endpoint = `/nh/bugs${filters && "bug" in filters ? `/${filters.bug}` : ""}?${this.bodyToParams(filters ?? {})}`;
    return await this.fetch<Array<TBug> | TBug | TEndpointError>(endpoint);
  }
}
