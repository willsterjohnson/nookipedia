// playground for testing and debugging
import Nookipedia from "./package/index.js";
import dotenv from "dotenv";
dotenv.config();

const nk = new Nookipedia(process.env["NOOKIPEDIA_API_KEY"]);

(async () => {
  // Ideally don't commit this file, no worries if you do.
  // <playground>

  // </playground>
})();
