import type { Response } from "node-fetch";
import fetch from "node-fetch";
import type { IEndpointError } from "./types/endpointErrors";
import type { MaybeArray } from "./types/utils";
import type {
  IVillager,
  IVillagerExcludeDetails,
  IVillagerNHDetails,
  TVillagerFilter,
  TVillagerFilterExcludeDetails,
  TVillagerFilterNHDetails,
} from "./types/villagers";

export interface INookipedia {
  checkErrors<T extends ReturnType<INookipedia[keyof Omit<INookipedia, "checkErrors">]>>(
    apiResponse: T,
  ): Promise<Exclude<T, IEndpointError>>;
  villagers(
    filters?: TVillagerFilter | TVillagerFilterNHDetails | TVillagerFilterExcludeDetails,
  ): Promise<Array<IVillager | IVillagerNHDetails | IVillagerExcludeDetails> | IEndpointError>;
}

export default class Nookipedia implements INookipedia {
  private apiKey: string;
  public baseURL = "https://api.nookipedia.com/";
  public apiVersion = "1.5.0";

  private async fetch(endpoint: string): Promise<Response> {
    return await fetch(`${this.baseURL}${endpoint}`, {
      headers: {
        "X-API-KEY": this.apiKey,
        "Accept-Version": this.apiVersion,
        "content-type": "application/json",
      },
    });
  }

  private bodyToParams(body: Record<string, MaybeArray<string | number | boolean>>): string {
    return Object.keys(body)
      .map((key) => {
        const value = body[key] as typeof body[keyof typeof body];
        if (Array.isArray(value)) {
          return value.map((item) => `${key}=${item}`).join("&");
        } else {
          return `${key}=${value}`;
        }
      })
      .join("&");
  }

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

  public async checkErrors<T extends ReturnType<INookipedia[keyof Omit<INookipedia, "checkErrors">]>>(
    apiResponse: T,
  ): Promise<Exclude<T, IEndpointError>> {
    const out = await apiResponse;
    if (!Array.isArray(out)) {
      throw new Error(out.title + ": " + out.details);
    } else {
      return out;
    }
  }

  public async villagers(filters?: TVillagerFilter): Promise<Array<IVillager> | IEndpointError>;
  public async villagers(filters?: TVillagerFilterNHDetails): Promise<Array<IVillagerNHDetails> | IEndpointError>;
  public async villagers(filters?: TVillagerFilterExcludeDetails): Promise<Array<IVillagerExcludeDetails> | IEndpointError>;
  public async villagers(
    filters?: TVillagerFilter | TVillagerFilterNHDetails | TVillagerFilterExcludeDetails,
  ): Promise<Array<IVillager | IVillagerNHDetails | IVillagerExcludeDetails> | IEndpointError> {
    const endpoint = "villagers?" + this.bodyToParams(filters ?? {});
    const response = await this.fetch(endpoint);
    const data = (await response.json()) as Array<IVillager | IVillagerNHDetails | IVillagerExcludeDetails> | IEndpointError;
    return data;
  }
}
