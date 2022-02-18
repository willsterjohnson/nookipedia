/// <reference path="../src/types/index.ts" />

import "mocha";
import i from "chai";
import Nookipedia from "../src";
import dotenv from "dotenv";
dotenv.config();

// overloads to lie in type hinting
function errmsg<TName extends string>(name: TName, not?: false): `Nookipedia class should have public ${TName}`;
function errmsg<TName extends string>(name: string, not: true): `Nookipedia class should not have public ${TName}`;
function errmsg(name: string, not: boolean = false) {
  return `\n     Nookipedia class should ${not ? "not " : ""}have public ${name}\n     `;
}

// modify type to allow typescript to compile failing tests, requires using index access
const nk: Record<string, any> = new Nookipedia(process.env["NOOKIPEDIA_API_KEY"] as string);

describe("Nookipedia class properties & methods", () => {
  describe("Should have public", () => {
    describe("misc", () => {
      it("`baseURL` property (string)", () => {
        i.expect(nk["baseURL"], errmsg("`baseURL` property (string)")).to.be.a("string");
      });
      it("`apiVersion` property (string)", () => {
        i.expect(nk["apiVersion"], errmsg("`apiVersion` property (string)")).to.be.a("string");
      });
      it("`logUrl` property (boolean)", () => {
        i.expect(nk["logUrl"], errmsg("`logUrl` property (boolean)")).to.be.a("boolean");
      });
      it("`checkErrors` method", () => {
        i.expect(nk["checkErrors"], errmsg("`checkErrors` method")).to.be.a("function");
      });
    });
    describe("endpoints", () => {
      it("`villagers` method", () => {
        i.expect(nk["villagers"], errmsg("`villagers` method")).to.be.a("function");
      });
      it("`fish` method", () => {
        i.expect(nk["fish"], errmsg("`fish` method")).to.be.a("function");
      });
      it("`bugs` method", () => {
        i.expect(nk["bugs"], errmsg("`bugs` method")).to.be.a("function");
      });
      it("`seaCreatures` method", () => {
        i.expect(nk["seaCreatures"], errmsg("`seaCreatures` method")).to.be.a("function");
      });
      it("`events` method", () => {
        i.expect(nk["events"], errmsg("`events` method")).to.be.a("function");
      });
      it("`art` method", () => {
        i.expect(nk["art"], errmsg("`art` method")).to.be.a("function");
      });
      it("`furniture` method", () => {
        i.expect(nk["furniture"], errmsg("`furniture` method")).to.be.a("function");
      });
      it("`clothing` method", () => {
        i.expect(nk["clothing"], errmsg("`clothing` method")).to.be.a("function");
      });
      it("`interior` method", () => {
        i.expect(nk["interior"], errmsg("`interior` method")).to.be.a("function");
      });
      it("`tools` method", () => {
        i.expect(nk["tools"], errmsg("`tools` method")).to.be.a("function");
      });
      it("`photos` method", () => {
        i.expect(nk["photos"], errmsg("`photos` method")).to.be.a("function");
      });
      it("`items` method", () => {
        i.expect(nk["items"], errmsg("`items` method")).to.be.a("function");
      });
      it("`recipes` method", () => {
        i.expect(nk["recipes"], errmsg("`recipes` method")).to.be.a("function");
      });
      it("`fossils` method", () => {
        i.expect(nk["fossils"], errmsg("`fossils` method")).to.be.a("function");
      });
      it("`fossilGroups` method", () => {
        i.expect(nk["fossilGroups"], errmsg("`fossilGroups` method")).to.be.a("function");
      });
      it("`allFossils` method", () => {
        i.expect(nk["allFossils"], errmsg("`allFossils` method")).to.be.a("function");
      });
    });
    describe("abstractions", () => {
      it("`today` method", () => {
        i.expect(nk["today"], errmsg("`today` method")).to.be.a("function");
      });
    });
  });
  describe("Should not have public", () => {
    it("`apiKey` property", () => {
      i.expect(nk["apiKey"], errmsg("`apiKey` property", true)).to.be.undefined;
    });
    it("`gameNameAliasMap` property", () => {
      i.expect(nk["gameNameAliasMap"], errmsg("`gameNameAliasMap` property", true)).to.be.undefined;
    });
    it("`fetch` method", () => {
      i.expect(nk["fetch"], errmsg("`fetch` method", true)).to.be.undefined;
    });
    it("`bodyToParams` method", () => {
      i.expect(nk["bodyToParams"], errmsg("`bodyToParams` method", true)).to.be.undefined;
    });
  });
});
