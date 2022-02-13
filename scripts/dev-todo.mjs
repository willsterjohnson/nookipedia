import fs from "fs";
import path from "path";

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
      console.log(pathname);
      const fileContents = fs.readFileSync(pathname, "utf8");
      fs.writeFileSync(pathname, fileContents.replace(/\s*?(\*|\/\/)\s*?(@dev|TODO).+?\n/g, "\n"));
    }
  });
}

main();
