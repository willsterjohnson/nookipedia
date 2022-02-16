# Nookipedia

An unofficial JavaScript driver for the [Nookipedia API](https://api.nookipedia.com/).

[Installation](#installation) | [Quick Start](#quick-start) | [Docs](#docs) | [License](#license)

## Installation

[To Top](#nookipedia)

To install the package, run;

```sh
npm install --save @willsterjohnson/nookipedia
```

It's important you install the package `@willsterjohnson/nookipedia` **NOT** `nookipedia`, as the `nookipedia` library is deprecated and not affiliated with this project.

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

const nk = new Nookipedia(process.env["NOOKIPEDIA_TOKEN"] as string) as const;
```

To use this library's types, you will have to reference the `Nookipedia` namespace.

```ts
/// <reference types="@willsterjohnson/nookipedia/types" />

let villagers: Nookipedia.Villager.Schema[] = await nk.villagers();
```

### Error Checking and Type Safety

[To Docs](#docs) | [To Top](#nookipedia)

To check that the API didn't respond with and error, and (for TypeScript users) to remove the error type from the response, use the `checkErrors` method.

The generic type is optional, however it may be useful for type safety, enforcing a specific type is returned rather than allowing any valid schema which isn't an endpoint error.

```ts
const errorCheckedAllVillagers = await nk.checkErrors<Array<Nookipedia.Villager.Schema>>(nk.villagers());
const errorCheckedFishByName = await nk.checkErrors<Nookipedia.Fish.Schema>(nk.fish({ fish: "Cherry Salmon" }));
const errorCheckedBugNamesOnly = await nk.checkErrors<Array<Nookipedia.Common.SchemaExcludeDetails>>(
  nk.bugs({ excludedetails: true }),
);
```

Note that only the `nk.checkErrors` method needs to be awaited, the endpoint method passed in will be awaited automatically.

If there is an error, the `nk.checkErrors` method will throw an error with the API error info as it's message. For your application, you may want to wrap this in a `try`/`catch` block.

### Villagers

[To Docs](#docs) | [To Top](#nookipedia)

To make queries to the [Villagers endpoint](https://api.nookipedia.com/doc#/paths/~1villagers/get), use the `villagers` method.

The generic type is optional, however it may be useful for type safety, enforcing a specific type is returned rather than allowing any valid schema. Note that the return type will be `Promise<ExpectedType | EndpointError>`, so error checking may be necessary.

```ts
const allVillagers = await nk.villagers<Array<Nookipedia.Villager.Schema>>();
const villagerByName = await nk.villagers<Array<Nookipedia.Villager.Schema>>({ name: "Ribbot" });
const villagerNamesOnly = await nk.villagers<Array<Nookipedia.Common.SchemaExcludeDetails>>({ excludedetails: true });
const villagerExtraDetails = await nk.villagers<Array<Nookipedia.Villager.SchemaNHDetails>>({ nhdetails: true });
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

The generic type is optional, however it may be useful for type safety, enforcing a specific type is returned rather than allowing any valid schema. Note that the return type will be `Promise<ExpectedType | EndpointError>`, so error checking may be necessary.

```ts
const allFish = await nk.fish<Array<Nookipedia.Fish.Schema>>();
const fishByName = await nk.fish<Nookipedia.Fish.Schema>({ fish: "Cherry Salmon" });
const fishNamesOnly = await nk.fish<Array<Nookipedia.Common.SchemaExcludeDetails>>({ excludedetails: true });
```

For a full list of paramaters, see either the TypeScript definition file or the official API docs.

### Bugs

[To Docs](#docs) | [To Top](#nookipedia)

o make queries to the Bugs endpoints ([all](https://api.nookipedia.com/doc#/paths/~1nh~1bugs/get), [single](https://api.nookipedia.com/doc#/paths/~1nh~1bugs~1{bug}/get)), use the `fish` method.

The generic type is optional, however it may be useful for type safety, enforcing a specific type is returned rather than allowing any valid schema. Note that the return type will be `Promise<ExpectedType | EndpointError>`, so error checking may be necessary.

```ts
const allBugs = await nk.bugs<Array<Nookipedia.Bug.Schema>>();
const bugByName = await nk.bugs<Nookipedia.Bug.Schema>({ bug: "Grasshopper" });
const bugNamesOnly = await nk.bugs<Array<Nookipedia.Common.SchemaExcludeDetails>>({ excludedetails: true });
```

For a full list of paramaters, see either the TypeScript definition file or the official API docs.

## License

[To Top](#nookipedia)

This project is licensed under the [MIT license](./LICENSE.md).
