import type { Response } from "node-fetch";
import fetch from "node-fetch";
import type {
  IVillager,
  IVillagerExcludeDetails,
  IVillagerNHDetails,
  TVillagerFilter,
  TVillagerFilterExcludeDetails,
  TVillagerFilterNHDetails,
} from "./types/villagers";

export interface INookipedia {
  villagers<T extends TVillagerFilter>(
    filters?: T,
  ): Promise<
    T extends TVillagerFilterExcludeDetails
      ? IVillagerExcludeDetails[]
      : T extends TVillagerFilterNHDetails
      ? IVillagerNHDetails[]
      : IVillager[]
  > | void;
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

  private bodyToParams(body: Record<string, string | number | boolean | (string | number | boolean)[]>): string {
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

  public async villagers(filters?: TVillagerFilter): Promise<IVillager[]>;
  public async villagers(filters?: TVillagerFilterNHDetails): Promise<IVillagerNHDetails[]>;
  public async villagers(filters?: TVillagerFilterExcludeDetails): Promise<IVillagerExcludeDetails[]>;
  public async villagers(
    filters?: TVillagerFilter | TVillagerFilterNHDetails | TVillagerFilterExcludeDetails,
  ): Promise<(IVillager | IVillagerNHDetails | IVillagerExcludeDetails)[]> {
    return (await (await this.fetch("villagers?" + this.bodyToParams(filters ?? {}))).json()) as (
      | IVillager
      | IVillagerNHDetails
      | IVillagerExcludeDetails
    )[];
  }
}
