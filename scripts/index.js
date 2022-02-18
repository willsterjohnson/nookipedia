import fs from "fs";
import path from "path";
import devTodo from "./dev-todo.js";
import fixThisPlease from "./fix-this-please.js";

/** @type {Array<(contents: string) => string>} */
const actions = [devTodo, fixThisPlease];

/**
 * @param {string} pathname
 * @param {(pathname: string, filename:string) => void} callback
 */
function iterateDir(pathname, callback) {
  for (const filename of fs.readdirSync(pathname)) {
    if (fs.statSync(path.join(pathname, filename)).isDirectory()) {
      iterateDir(path.join(pathname, filename), callback);
    } else {
      callback(path.join(pathname, filename), filename);
    }
  }
}

/**
 * @param {string} write
 * @param {string} [onFinish]
 */
function writeLoading(write, onFinish) {
  let i = 0;
  const interval = setInterval(() => {
    process.stdout.clearLine(0);
    process.stdout.cursorTo(0);
    i++;
    process.stdout.write(`${write}${".".repeat(i % 4)}`);
  }, 300);
  return () => {
    clearInterval(interval);
    if (onFinish) console.log(onFinish);
  };
}

function main() {
  console.log("Running build scripts");
  const packageDir = path.join(process.cwd(), "package");
  // check dir exists
  if (!fs.existsSync(packageDir)) {
    console.error(`${packageDir} does not exist. Did you run \`svelte-kit package\`?`);
    process.exit(1);
  }
  iterateDir(packageDir, (pathname, filename) => {
    if (pathname.endsWith(".ts") || pathname.endsWith(".js")) {
      let fileContents = fs.readFileSync(pathname, "utf8");
      actions.forEach((cb) => {
        const clear = writeLoading(`${filename}: ${cb.name}`);
        fileContents = cb(fileContents);
        clear();
      });
      fs.writeFileSync(pathname, fileContents);
      console.log(`${filename}: Done!`);
    }
  });
}

main();
