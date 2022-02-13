import "mocha";
import i from "chai";
import Nookipedia from "../src";
import dotenv from "dotenv";
dotenv.config();

const nk = new Nookipedia(process.env["NOOKIPEDIA_API_KEY"] as string);

//   "Class properties & methods": {
describe("Class properties & methods", () => {
  it("should have 'baseURL' property (string)", () => {
    i.expect(nk.baseURL).to.be.a("string");
  });
  it("should have 'apiVersion' property (string)", () => {
    i.expect(nk.apiVersion).to.be.a("string");
  });
  it("should have 'logUrl' property (boolean)", () => {
    i.expect(nk.logUrl).to.be.a("boolean");
  });
  it("should have 'checkErrors' method", () => {
    i.expect(nk.checkErrors).to.be.a("function");
  });
  it("should have 'villagers' method", () => {
    i.expect(nk.villagers).to.be.a("function");
  });
  it("should have 'fish' method", () => {
    i.expect(nk.fish).to.be.a("function");
  });
  it("should have 'bugs' method", () => {
    i.expect(nk.bugs).to.be.a("function");
  });
  // it("should have 'seaCreatures' method", () => {
  //   i.expect(nk.seaCreatures).to.be.a("function");
  // });
  // it("should have 'events' method", () => {
  //   i.expect(nk.events).to.be.a("function");
  // });
  // it("should have 'art' method", () => {
  //   i.expect(nk.art).to.be.a("function");
  // });
  // it("should have 'furniture' method", () => {
  //   i.expect(nk.furniture).to.be.a("function");
  // });
  // it("should have 'clothing' method", () => {
  //   i.expect(nk.clothing).to.be.a("function");
  // });
  // it("should have 'interior' method", () => {
  //   i.expect(nk.interior).to.be.a("function");
  // });
  // it("should have 'tools' method", () => {
  //   i.expect(nk.tools).to.be.a("function");
  // });
  // it("should have 'photos' method", () => {
  //   i.expect(nk.photos).to.be.a("function");
  // });
  // it("should have 'items' method", () => {
  //   i.expect(nk.items).to.be.a("function");
  // });
  // it("should have 'recipes' method", () => {
  //   i.expect(nk.recipes).to.be.a("function");
  // });
  // it("should have 'fossils' method", () => {
  //   i.expect(nk.fossils).to.be.a("function");
  // });
  // it("should have 'fossilGroups' method", () => {
  //   i.expect(nk.fossilGroups).to.be.a("function");
  // });
  // it("should have 'allFossils' method", () => {
  //   i.expect(nk.allFossils).to.be.a("function");
  // });
  it("should not have exposed 'apiKey' property (boolean)", () => {
    // @ts-expect-error
    i.expect(nk.apiKey).to.be.undefined;
  });
  it("should not have exposed 'gameNameAliasMap' property (boolean)", () => {
    // @ts-expect-error
    i.expect(nk.gameNameAliasMap).to.be.undefined;
  });
  it("should not have exposed 'fetch' method", () => {
    // @ts-expect-error
    i.expect(nk.fetch).to.be.undefined;
  });
  it("should not have exposed 'bodyToParams' method", () => {
    // @ts-expect-error
    i.expect(nk.bodyToParams).to.be.undefined;
  });
});
