import fetch from "node-fetch";
import type { TEndpointError } from "./types/endpointErrors";
import type { TFish, TFishFilterMany, TFishFilterSingle } from "./types/fish";
import type { MaybeArray } from "./types/utils";
import type {
  TVillager,
  TVillagerExcludeDetails,
  TVillagerNHDetails,
  TVillagerFilter,
  TVillagerFilterExcludeDetails,
  TVillagerFilterNHDetails,
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
   * @dev add in-house documentation
   * @since 0.1.0
   * @template {Record<string, any> | Array<Record<string, any>>} T
   * @param {string} endpoint
   * @returns {Promise<T>}
   */
  private async fetch<T extends Record<string, any> | Array<Record<string, any>>>(endpoint: string): Promise<T> {
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
   * @param {Record<string, MaybeArray<string | number | boolean>>} body
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
   * @param {{ baseURL?: string; apiVersion?: string }} [config={}]
   */
  constructor(apiKey: string, config: { baseURL?: string; apiVersion?: string } = {}) {
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
  }

  /**
   * @dev add documentation
   * @since 0.1.0
   * @template {ReturnType<Nookipedia["villagers"]> | ReturnType<Nookipedia["fish"]>} T
   * @param {T} apiResponse
   * @returns {Promise<Exclude<Awaited<T>, TEndpointError>>}
   */
  public async checkErrors<T extends ReturnType<Nookipedia["villagers"]> | ReturnType<Nookipedia["fish"]>>(
    apiResponse: T,
  ): Promise<Exclude<Awaited<T>, TEndpointError>> {
    const out = await apiResponse;
    if ("title" in out) {
      throw new Error(out.title + ": " + out.details);
    } else {
      return out as Exclude<Awaited<T>, TEndpointError>;
    }
  }

  /**
   * @dev add documentation
   * @since 0.1.0
   * @param {VillagerFilter | TVillagerFilterNHDetails | TVillagerFilterExcludeDetail} [filters]
   * @returns {Promise<Array<TVillager | TVillagerNHDetails | TVillagerExcludeDetails> | TEndpointError>}
   */
  public async villagers(filters?: TVillagerFilter): Promise<Array<TVillager> | TEndpointError>;
  public async villagers(filters?: TVillagerFilterNHDetails): Promise<Array<TVillagerNHDetails> | TEndpointError>;
  public async villagers(filters?: TVillagerFilterExcludeDetails): Promise<Array<TVillagerExcludeDetails> | TEndpointError>;
  public async villagers(
    filters?: TVillagerFilter | TVillagerFilterNHDetails | TVillagerFilterExcludeDetails,
  ): Promise<Array<TVillager> | Array<TVillagerNHDetails> | Array<TVillagerExcludeDetails> | TEndpointError>;
  public async villagers(
    filters?: TVillagerFilter | TVillagerFilterNHDetails | TVillagerFilterExcludeDetails,
  ): Promise<Array<TVillager> | Array<TVillagerNHDetails> | Array<TVillagerExcludeDetails> | TEndpointError> {
    const endpoint = "villagers?" + this.bodyToParams(filters ?? {});
    return await this.fetch<Array<TVillager> | Array<TVillagerNHDetails> | Array<TVillagerExcludeDetails> | TEndpointError>(endpoint);
  }

  /**
   * @dev add documentation
   * @since 0.2.0
   * @param {TFishFilterSingle | TFishFilterMany} [filters]
   * @returns {Promise<Array<TFish> | TFish | TEndpointError>}
   */
  public async fish(filters: TFishFilterSingle): Promise<TFish | TEndpointError>;
  public async fish(filters?: TFishFilterMany): Promise<Array<TFish> | TEndpointError>;
  public async fish(filters?: TFishFilterSingle | TFishFilterMany): Promise<Array<TFish> | TFish | TEndpointError>;
  public async fish(filters?: TFishFilterSingle | TFishFilterMany): Promise<Array<TFish> | TFish | TEndpointError> {
    console.log(`/nh/fish${filters && "fish" in filters ? `/${filters.fish}` : ""}?`);
    const endpoint = `/nh/fish${filters && "fish" in filters ? `/${filters.fish}` : ""}?` + this.bodyToParams(filters ?? {});
    return await this.fetch<Array<TFish> | TFish | TEndpointError>(endpoint);
  }
}
