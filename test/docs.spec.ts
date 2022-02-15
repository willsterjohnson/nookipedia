import "mocha";
import Nookipedia from "../src";
import dotenv from "dotenv";
dotenv.config();

// Test the code found in the docs, because why not?
describe("README.md Docs code", () => {
  const nk = new Nookipedia(process.env["NOOKIPEDIA_API_KEY"] as string);
  describe("Setup", () => {
    it("Instance driver class", () => {
      new Nookipedia(process.env["NOOKIPEDIA_API_KEY"] as string);
    });
  });
  describe("Error Checking and Type Safety", () => {
    it("Error check all villagers", async () => {
      await nk.checkErrors(nk.villagers());
    });
    it("Error check fish by name", async () => {
      await nk.checkErrors(nk.fish({ fish: "Cherry Salmon" }));
    });
    it("Error check bug names only", async () => {
      await nk.checkErrors(nk.bugs({ excludedetails: true }));
    });
  });
  describe("Villagers", async () => {
    it("Get all villagers", async () => {
      await nk.villagers();
    });
    it("Get villager by name", async () => {
      await nk.villagers({ name: "Ribbot" });
    });
    it("Get villager names only", async () => {
      await nk.villagers({ excludedetails: true });
    });
    it("Get villager extra details", async () => {
      await nk.villagers({ nhdetails: true });
    });
  });
  describe("Fish", async () => {
    it("Get all fish", async () => {
      await nk.fish();
    });
    it("Get fish by name", async () => {
      await nk.fish({ fish: "Cherry Salmon" });
    });
    it("Get fish names only", async () => {
      await nk.fish({ excludedetails: true });
    });
  });
  describe("Bugs", async () => {
    it("Get all bugs", async () => {
      await nk.bugs();
    });
    it("Get bug by name", async () => {
      await nk.bugs({ bug: "Grasshopper" });
    });
    it("Get bug names only", async () => {
      await nk.bugs({ excludedetails: true });
    });
  });
});
