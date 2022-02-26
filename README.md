oclif-hello-world
=================

oclif example Hello World CLI

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/oclif-hello-world.svg)](https://npmjs.org/package/oclif-hello-world)
[![CircleCI](https://circleci.com/gh/oclif/hello-world/tree/main.svg?style=shield)](https://circleci.com/gh/oclif/hello-world/tree/main)
[![Downloads/week](https://img.shields.io/npm/dw/oclif-hello-world.svg)](https://npmjs.org/package/oclif-hello-world)
[![License](https://img.shields.io/npm/l/oclif-hello-world.svg)](https://github.com/oclif/hello-world/blob/main/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g notion-cli-ts
$ notion-cli-ts COMMAND
running command...
$ notion-cli-ts (--version)
notion-cli-ts/0.0.0 darwin-x64 node-v14.17.3
$ notion-cli-ts --help [COMMAND]
USAGE
  $ notion-cli-ts COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`notion-cli-ts hello PERSON`](#notion-cli-ts-hello-person)
* [`notion-cli-ts hello world`](#notion-cli-ts-hello-world)
* [`notion-cli-ts help [COMMAND]`](#notion-cli-ts-help-command)
* [`notion-cli-ts plugins`](#notion-cli-ts-plugins)
* [`notion-cli-ts plugins:inspect PLUGIN...`](#notion-cli-ts-pluginsinspect-plugin)
* [`notion-cli-ts plugins:install PLUGIN...`](#notion-cli-ts-pluginsinstall-plugin)
* [`notion-cli-ts plugins:link PLUGIN`](#notion-cli-ts-pluginslink-plugin)
* [`notion-cli-ts plugins:uninstall PLUGIN...`](#notion-cli-ts-pluginsuninstall-plugin)
* [`notion-cli-ts plugins update`](#notion-cli-ts-plugins-update)

## `notion-cli-ts hello PERSON`

Say hello

```
USAGE
  $ notion-cli-ts hello [PERSON] -f <value>

ARGUMENTS
  PERSON  Person to say hello to

FLAGS
  -f, --from=<value>  (required) Whom is saying hello

DESCRIPTION
  Say hello

EXAMPLES
  $ oex hello friend --from oclif
  hello friend from oclif! (./src/commands/hello/index.ts)
```

_See code: [dist/commands/hello/index.ts](https://github.com/litencatt/notion-cli-ts/blob/v0.0.0/dist/commands/hello/index.ts)_

## `notion-cli-ts hello world`

Say hello world

```
USAGE
  $ notion-cli-ts hello world

DESCRIPTION
  Say hello world

EXAMPLES
  $ oex hello world
  hello world! (./src/commands/hello/world.ts)
```

## `notion-cli-ts help [COMMAND]`

Display help for notion-cli-ts.

```
USAGE
  $ notion-cli-ts help [COMMAND] [-n]

ARGUMENTS
  COMMAND  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for notion-cli-ts.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v5.1.10/src/commands/help.ts)_

## `notion-cli-ts plugins`

List installed plugins.

```
USAGE
  $ notion-cli-ts plugins [--core]

FLAGS
  --core  Show core plugins.

DESCRIPTION
  List installed plugins.

EXAMPLES
  $ notion-cli-ts plugins
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v2.0.11/src/commands/plugins/index.ts)_

## `notion-cli-ts plugins:inspect PLUGIN...`

Displays installation properties of a plugin.

```
USAGE
  $ notion-cli-ts plugins:inspect PLUGIN...

ARGUMENTS
  PLUGIN  [default: .] Plugin to inspect.

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Displays installation properties of a plugin.

EXAMPLES
  $ notion-cli-ts plugins:inspect myplugin
```

## `notion-cli-ts plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ notion-cli-ts plugins:install PLUGIN...

ARGUMENTS
  PLUGIN  Plugin to install.

FLAGS
  -f, --force    Run yarn install with force flag.
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Installs a plugin into the CLI.

  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in
  the CLI without the need to patch and update the whole CLI.

ALIASES
  $ notion-cli-ts plugins add

EXAMPLES
  $ notion-cli-ts plugins:install myplugin 

  $ notion-cli-ts plugins:install https://github.com/someuser/someplugin

  $ notion-cli-ts plugins:install someuser/someplugin
```

## `notion-cli-ts plugins:link PLUGIN`

Links a plugin into the CLI for development.

```
USAGE
  $ notion-cli-ts plugins:link PLUGIN

ARGUMENTS
  PATH  [default: .] path to plugin

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Links a plugin into the CLI for development.

  Installation of a linked plugin will override a user-installed or core plugin.

  e.g. If you have a user-installed or core plugin that has a 'hello' command, installing a linked plugin with a 'hello'
  command will override the user-installed or core plugin implementation. This is useful for development work.

EXAMPLES
  $ notion-cli-ts plugins:link myplugin
```

## `notion-cli-ts plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ notion-cli-ts plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ notion-cli-ts plugins unlink
  $ notion-cli-ts plugins remove
```

## `notion-cli-ts plugins update`

Update installed plugins.

```
USAGE
  $ notion-cli-ts plugins update [-h] [-v]

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Update installed plugins.
```
<!-- commandsstop -->
