<div align="center">
  <h1>inquirer-select-with-banner</h1>
  <p>
    <a alt="NPM Version"><img src="https://img.shields.io/npm/v/inquirer-select-with-banner?style=social&logo=npm" /></a>
    <a alt="NPM Downloads"><img src="https://img.shields.io/npm/dw/inquirer-select-with-banner?style=social&logo=npm" /></a>
    <a alt="NPM Last Update"><img src="https://img.shields.io/npm/last-update/inquirer-select-with-banner?style=social&logo=npm" /></a>
  </p>
    <p>
    <a alt="Libraries.io dependency status for GitHub repo"><img src="https://img.shields.io/librariesio/github/wannabewayno/inquirer-select-with-banner?style=plastic" /></a>
    <a alt="GitHub Issues or Pull Requests"><img src="https://img.shields.io/github/issues/wannabewayno/inquirer-select-with-banner?style=plastic&logo=github" /></a>
  </p>
</div>

An [Inquirer.js](https://github.com/SBoudrias/Inquirer.js) select prompt that displays a dynamic banner above the choices, updating as the user navigates through options.

![Screen recording](./screen-recording.gif)

Inspired by [inquirer-select-with-state](https://github.com/patik/inquirer-select-with-state), the core difference being that the banner function is given what the user is currently hovering on, allowing for context aware information to be shown.

## Installation

```bash
npm install inquirer-select-with-banner
```

## Usage

```js
import { select } from 'inquirer-select-with-banner';

const answer = await select({
  message: 'Choose your weapon',
  choices: [
    { value: 'axe', name: 'Battle Axe' },
    { value: 'sword', name: 'Sword' },
    { value: 'bow', name: 'Bow and Arrow' }
  ],
  banner: (choice) => `Selected: ${choice.name}` // <- Controls the banner. return `string` to display, `undefined` or '' to clear, `null` to preserve the previous banner 
});
```

### banner
The return value of the banner function should be a string that controls what the banner displays.
If you want the banner to not update, you can pass `null` to have it reuse the previous selection's banner.
