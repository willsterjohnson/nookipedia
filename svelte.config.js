// Svelte? Isn't that for building websites?
// Yeah but it's got a decent package builder, so...

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    files: {
      lib: "src",
    },
    package: {
      dir: "package",
      emitTypes: false,
      exports: (f) => !/^_|\/_|\.d\.ts$/.test(f),
      files: (f) => !/types\//.test(f),
    },
  },
};

export default config;
