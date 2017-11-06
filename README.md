## Start-up Code Resource for deployd

[![Current Version](https://img.shields.io/npm/v/dpd-startup.svg?style=flat-square)](https://www.npmjs.org/package/dpd-startup)

This is a custom [deployd](https://www.npmjs.org/package/deployd) resource type that allows you to define a script that will be run on startup.

It is useful for setting up Pub/sub job processors, to schedule things that should be run regularly, to ensure that mongodb indexes are created, etc.

### Installation

`npm install dpd-startup --save`

or

`yarn add dpd-startup`

See [Installing Modules](http://docs.deployd.com/docs/using-modules/installing-modules.md) for details.

### Usage

Use [dpd-dashboard](https://www.npmjs.org/package/dpd-startup) to add a **Start-up Module**. The name doesn't matter and you can have as many as you need.

You can write your startup code inside the `Index` event. The code will be run on startup. You will have access to the `dpd` object like in any other event script.

#### Important note:

The code will also be re-run every time you save the script if you're using [dpd-dashboard](https://www.npmjs.org/package/dpd-startup). 

So, make sure your startup logic is valid for this purpose. Otherwise, restart your project manually every time, or do not edit the script using `dpd-dashboard`.