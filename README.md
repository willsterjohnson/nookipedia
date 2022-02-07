# Nookipedia

An unofficial JavaScript driver for the [Nookipedia API](https://api.nookipedia.com/).

## Installation

To install the package, run;

```sh
npm install --save @willsterjohnson/nookipedia
```

## Usage

The best practice for this library is to place your Nookipedia API token in a `.env` file, and to load it with the [`dotenv`](https://github.com/motdotla/dotenv) module.

```sh
# .env
NOOKIPEDIA_TOKEN=your-token-here
```

```js
// index.js
import dotenv from 'dotenv';
import Nookipedia from '@willsterjohnson/nookipedia';
dotenv.config();

const nookipedia = new Nookipedia(
  // pass in your API token to authenticate requests
  process.env.NOOKIPEDIA_TOKEN,
  // you may also specify an API version
  apiVersion: "1.5.0",
  // or change the base URL if you need to
  baseURL: "https://api.nookipedia.com/",
);

const everyVillager = await nookipedia.villagers();
const Ribbot = await nookipedia.villager({ name: 'Ribbot' });
```

## Addressing the Elephant in the Room...

...why on Earth am I using _svelteKit_ to build an API driver?

SvelteKit has a pretty nice `package` sub-command which is great for building an NPM package.
I'm just sticking to what I know, no bundlers or any of that nonsense.
