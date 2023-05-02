# notion-cli-ts

Notion CLI tool written by TypeScript.

<!-- toc -->
* [notion-cli-ts](#notion-cli-ts)
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->

# Usage

<!-- usage -->
```sh-session
$ npm install -g @litencatt/notion-cli
$ notion-cli COMMAND
running command...
$ notion-cli (--version)
@litencatt/notion-cli/0.4.2 linux-arm64 node-v19.8.1
$ notion-cli --help [COMMAND]
USAGE
  $ notion-cli COMMAND
...
```
<!-- usagestop -->

# Commands

<!-- commands -->
* [`notion-cli block BLOCK_ID`](#notion-cli-block-block_id)
* [`notion-cli db`](#notion-cli-db)
* [`notion-cli help [COMMANDS]`](#notion-cli-help-commands)
* [`notion-cli page`](#notion-cli-page)
* [`notion-cli plugins`](#notion-cli-plugins)
* [`notion-cli plugins:install PLUGIN...`](#notion-cli-pluginsinstall-plugin)
* [`notion-cli plugins:inspect PLUGIN...`](#notion-cli-pluginsinspect-plugin)
* [`notion-cli plugins:install PLUGIN...`](#notion-cli-pluginsinstall-plugin-1)
* [`notion-cli plugins:link PLUGIN`](#notion-cli-pluginslink-plugin)
* [`notion-cli plugins:uninstall PLUGIN...`](#notion-cli-pluginsuninstall-plugin)
* [`notion-cli plugins:uninstall PLUGIN...`](#notion-cli-pluginsuninstall-plugin-1)
* [`notion-cli plugins:uninstall PLUGIN...`](#notion-cli-pluginsuninstall-plugin-2)
* [`notion-cli plugins update`](#notion-cli-plugins-update)
* [`notion-cli user`](#notion-cli-user)

## `notion-cli block BLOCK_ID`

describe the command here

```
USAGE
  $ notion-cli block BLOCK_ID [-r] [-u] [-d] [-c] [-a]

FLAGS
  -a, --appendChildren
  -c, --retrieveChildren
  -d, --delete
  -r, --retrieve
  -u, --update

DESCRIPTION
  describe the command here

EXAMPLES
  $ notion-cli block
```

_See code: [dist/commands/block.ts](https://github.com/litencatt/notion-cli-ts/blob/v0.4.2/dist/commands/block.ts)_

## `notion-cli db`

describe the command here

```
USAGE
  $ notion-cli db [-q -d <value>] [-f <value>] [-c --page_id <value>] [-u ] [-r ] [-p <value>] [-P]

FLAGS
  -P, --onlyValue
  -c, --create
  -d, --database_id=<value>
  -f, --filter=<value>
  -p, --propertyList=<value>
  -q, --query
  -r, --retrieve
  -u, --update
  --page_id=<value>

DESCRIPTION
  describe the command here

EXAMPLES
  $ notion-cli db
```

_See code: [dist/commands/db.ts](https://github.com/litencatt/notion-cli-ts/blob/v0.4.2/dist/commands/db.ts)_

## `notion-cli help [COMMANDS]`

Display help for notion-cli.

```
USAGE
  $ notion-cli help [COMMANDS] [-n]

ARGUMENTS
  COMMANDS  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for notion-cli.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v5.2.9/src/commands/help.ts)_

## `notion-cli page`

describe the command here

```
USAGE
  $ notion-cli page [-r -p <value>] [-c] [-u ] [--retrieve_property] [--parent_page_id <value>]
    [--property_id <value>] [-d <value>] [-f <value>]

FLAGS
  -c, --create
  -d, --database_id=<value>
  -f, --file_path=<value>
  -p, --page_id=<value>
  -r, --retrieve
  -u, --update
  --parent_page_id=<value>
  --property_id=<value>
  --retrieve_property

DESCRIPTION
  describe the command here

EXAMPLES
  $ notion-cli page
```

_See code: [dist/commands/page.ts](https://github.com/litencatt/notion-cli-ts/blob/v0.4.2/dist/commands/page.ts)_

## `notion-cli plugins`

List installed plugins.

```
USAGE
  $ notion-cli plugins [--core]

FLAGS
  --core  Show core plugins.

DESCRIPTION
  List installed plugins.

EXAMPLES
  $ notion-cli plugins
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v2.4.7/src/commands/plugins/index.ts)_

## `notion-cli plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ notion-cli plugins:install PLUGIN...

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
  $ notion-cli plugins add

EXAMPLES
  $ notion-cli plugins:install myplugin 

  $ notion-cli plugins:install https://github.com/someuser/someplugin

  $ notion-cli plugins:install someuser/someplugin
```

## `notion-cli plugins:inspect PLUGIN...`

Displays installation properties of a plugin.

```
USAGE
  $ notion-cli plugins:inspect PLUGIN...

ARGUMENTS
  PLUGIN  [default: .] Plugin to inspect.

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Displays installation properties of a plugin.

EXAMPLES
  $ notion-cli plugins:inspect myplugin
```

## `notion-cli plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ notion-cli plugins:install PLUGIN...

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
  $ notion-cli plugins add

EXAMPLES
  $ notion-cli plugins:install myplugin 

  $ notion-cli plugins:install https://github.com/someuser/someplugin

  $ notion-cli plugins:install someuser/someplugin
```

## `notion-cli plugins:link PLUGIN`

Links a plugin into the CLI for development.

```
USAGE
  $ notion-cli plugins:link PLUGIN

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
  $ notion-cli plugins:link myplugin
```

## `notion-cli plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ notion-cli plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ notion-cli plugins unlink
  $ notion-cli plugins remove
```

## `notion-cli plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ notion-cli plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ notion-cli plugins unlink
  $ notion-cli plugins remove
```

## `notion-cli plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ notion-cli plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ notion-cli plugins unlink
  $ notion-cli plugins remove
```

## `notion-cli plugins update`

Update installed plugins.

```
USAGE
  $ notion-cli plugins update [-h] [-v]

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Update installed plugins.
```

## `notion-cli user`

describe the command here

```
USAGE
  $ notion-cli user [-r --user_id <value>] [-l] [-b]

FLAGS
  -b, --bot
  -l, --list
  -r, --retrieve
  --user_id=<value>

DESCRIPTION
  describe the command here

EXAMPLES
  $ notion-cli user
```

_See code: [dist/commands/user.ts](https://github.com/litencatt/notion-cli-ts/blob/v0.4.2/dist/commands/user.ts)_
<!-- commandsstop -->
