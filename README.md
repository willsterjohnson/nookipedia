# Nookipedia

An unofficial JavaScript driver for the [Nookipedia API](https://api.nookipedia.com/).

[Installation](#installation) | [Quick Start](#quick-start) | [Docs](#docs) | [License](#license)

## Installation

[To Top](#nookipedia)

To install the package, run;

```sh
npm install --save @willsterjohnson/nookipedia
```

## Quick Start

[To Top](#nookipedia)

The best practice for this library is to place your Nookipedia API token in a `.env` file, and to load it with the [`dotenv`](https://github.com/motdotla/dotenv) module.

```sh
# .env
NOOKIPEDIA_TOKEN=your-token-here
```

```js
/* index.js */
// import this library's driver class
import Nookipedia from "@willsterjohnson/nookipedia";
// import and configure dotenv to use environment variables
import dotenv from "dotenv";
dotenv.config();

const nk = new Nookipedia(
  // pass in your API token to authenticate requests
  process.env["NOOKIPEDIA_TOKEN"],
  {
    // you may also specify an API version
    apiVersion: "1.5.0",
    // or change the base URL if you need to
    baseURL: "https://api.nookipedia.com/",
    // to show the url being accessed, set to true
    logUrl: false,
  },
);

// getting all villagers
const everyVillager = await nk.checkErrors(nk.villagers());
// getting only Ribbot
const Ribbot = await nk.checkErrors(nk.villagers({ name: "Ribbot" }));
```

## Docs

[To Top](#nookipedia)

These docs use TypeScript as examples. If you want to use JavaScript, simply omit the `: TypeName` or `as Type` parts.

[Setup](#setup) | [Error Checking and Type Safety](#error-checking-and-type-safety) | [Villagers](#villagers) | [Fish](#fish) | [Bugs](#bugs)

### Setup

[To Docs](#docs) | [To Top](#nookipedia)

To use this library, install the package and instance the driver class.

```ts
import Nookipedia from "@willsterjohnson/nookipedia";
import dotenv from "dotenv";
dotenv.config();

const nk = new Nookipedia(process.env["NOOKIPEDIA_TOKEN"]) as const;
```

### Error Checking and Type Safety

[To Docs](#docs) | [To Top](#nookipedia)

To check that the API didn't respond with and error, and (for TypeScript users) to remove the error type from the response, use the `checkErrors` method.

```ts
const errorCheckedAllVillagers = await nk.checkErrors(nk.villagers());
const errorCheckedFishByName = await nk.checkErrors(nk.fish({ fish: "Cherry Salmon" }));
const errorCheckedBugNamesOnly = await nk.checkErrors(nk.bugs({ excludedetails: true }));
```

Note that only the `nk.checkErrors` method needs to be awaited, the endpoint method passed in will be awaited automatically.

If there is an error, the `nk.checkErrors` method will throw an error with the API error info as it's message. For your application, you may want to wrap this in a `try`/`catch` block.

### Villagers

[To Docs](#docs) | [To Top](#nookipedia)

To make queries to the [Villagers endpoint](https://api.nookipedia.com/doc#/paths/~1villagers/get), use the `villagers` method.

```ts
const allVillagers = await nk.villagers();
const villagerByName = await nk.villagers({ name: "Ribbot" });
const villagerNamesOnly = await nk.villagers({ excludedetails: true });
const villagerExtraDetails = await nk.villagers({ nhdetails: true });
```

For a full list of paramaters, see either the TypeScript definition file or the official API docs.

For the optional `game` parameter, you may pass either the specified abbreviations, or the expanded game titles.
All Valid options are listed below;

<!-- prettier-ignore-start -->
```js
// abbreviations
"DNM", "AC", "E_PLUS", "WW", "CF", "NL", "WA", "NH", "FILM", "HHD", "PC"
// expanded titles
"dobutsu no mori", "animal crossing", "e+", "dobutsu no mori e+", "wild world", "city folk", "new leaf", "welcome amiibo", "new horizons", "dobutsu no mori film", "happy home designer", "pocket camp"
```
<!-- prettier-ignore-end -->

### Fish

[To Docs](#docs) | [To Top](#nookipedia)

To make queries to the Fish endpoints ([all](https://api.nookipedia.com/doc#/paths/~1nh~1fish/get), [single](https://api.nookipedia.com/doc#/paths/~1nh~1fish~1{fish}/get)), use the `fish` method.

```ts
const allFish = await nk.fish();
const fishByName = await nk.fish({ fish: "Cherry Salmon" });
const fishNamesOnly = await nk.fish({ excludedetails: true });
```

For a full list of paramaters, see either the TypeScript definition file or the official API docs.

### Bugs

[To Docs](#docs) | [To Top](#nookipedia)

o make queries to the Bugs endpoints ([all](https://api.nookipedia.com/doc#/paths/~1nh~1bugs/get), [single](https://api.nookipedia.com/doc#/paths/~1nh~1bugs~1{bug}/get)), use the `fish` method.

```ts
const allBugs = await nk.bugs();
const bugByName = await nk.bugs({ bug: "Grasshopper" });
const bugNamesOnly = await nk.bugs({ excludedetails: true });
```

For a full list of paramaters, see either the TypeScript definition file or the official API docs.

## License

[To Top](#nookipedia)

This project is licensed under the [MIT license](./LICENSE.md).

DNM - Dobutsu no Mori
AC - Animal Crossing
E_PLUS - Dobutsu no Mori e+
WW - Wild World
CF - City Folk
NL - New Leaf
WA - ??? (maybe Welcome amiibo)
NH - New Horizons
FILM - ???
HHD - Happy Home Designer
PC - Pocket Camp
