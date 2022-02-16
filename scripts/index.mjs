import fs from "fs";
import path from "path";
import devTodo from "./dev-todo.mjs";
import fixThisPlease from "./fix-this-please.mjs";

/** @type {Array<(contents: string) => string>} */
const actions = [devTodo, fixThisPlease];

/**
 * @param {string} pathname
 * @param {(pathname: string) => void} callback
 */
function iterateDir(pathname, callback) {
  for (const file of fs.readdirSync(pathname)) {
    // if file is directory
    if (fs.statSync(path.join(pathname, file)).isDirectory()) {
      iterateDir(path.join(pathname, file), callback);
    } else {
      callback(path.join(pathname, file));
    }
  }
}

function main() {
  const packageDir = path.join(process.cwd(), "package");
  // check dir exists
  if (!fs.existsSync(packageDir)) {
    console.error(`${packageDir} does not exist. Did you run \`svelte-kit package\`?`);
    process.exit(1);
  }
  iterateDir(packageDir, (pathname) => {
    if (pathname.endsWith(".ts") || pathname.endsWith(".js")) {
      let fileContents = fs.readFileSync(pathname, "utf8");
      actions.forEach((callbackfn) => {
        fileContents = callbackfn(fileContents);
      });
      fs.writeFileSync(pathname, fileContents);
    }
  });
}

main();
