# notion-cli-ts

Notion CLI tool written by TypeScript.

<!-- toc -->

- [Usage](#usage)
- [Commands](#commands)
<!-- tocstop -->

# Usage

<!-- usage -->

```sh-session
$ npm install -g notion-cli-ts
$ notion-cli-ts COMMAND
running command...
$ notion-cli-ts (--version)
notion-cli-ts/0.1.0 darwin-x64 node-v17.0.1
$ notion-cli-ts --help [COMMAND]
USAGE
  $ notion-cli-ts COMMAND
...
```

<!-- usagestop -->

# Commands

<!-- commands -->

- [`notion-cli-ts help [COMMAND]`](#notion-cli-ts-help-command)
- [`notion-cli-ts db`](#notion-cli-ts-db)
- [`notion-cli-ts page`](#notion-cli-ts-page)
- [`notion-cli-ts block [BLOCK_ID]`](#notion-cli-ts-block-block_id)
- [`notion-cli-ts user`](#notion-cli-ts-user)

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

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v5.1.11/src/commands/help.ts)_

## `notion-cli-ts db`

describe the command here

```
USAGE
  $ notion-cli-ts db [-q -d <value>] [-f <value>] [-c --page_id <value>] [-u ] [-r ] [-p <value>] [-P]

FLAGS
  -c, --create
  -d, --database_id=<value>
  -f, --filter=<value>
  -q, --query
  -r, --retrieve
  -u, --update
  --page_id=<value>

DESCRIPTION
  describe the command here

EXAMPLES
  $ notion-cli-ts db
```

_See code: [dist/commands/db.ts](https://github.com/litencatt/notion-cli-ts/blob/v0.1.0/dist/commands/db.ts)_

## `notion-cli-ts page`

describe the command here

```
USAGE
  $ notion-cli-ts page [-r -p <value>] [-c] [-u ] [--retrieve_property] [--parent_page_id <value>]
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
  $ notion-cli-ts page
```

_See code: [dist/commands/page.ts](https://github.com/litencatt/notion-cli-ts/blob/v0.1.0/dist/commands/page.ts)_

## `notion-cli-ts block [BLOCK_ID]`

describe the command here

```
USAGE
  $ notion-cli-ts block [BLOCK_ID] [-r] [-u] [-d] [-c] [-a]

FLAGS
  -a, --appendChildren
  -c, --retrieveChildren
  -d, --delete
  -r, --retrieve
  -u, --update

DESCRIPTION
  describe the command here

EXAMPLES
  $ notion-cli-ts block
```

_See code: [dist/commands/block.ts](https://github.com/litencatt/notion-cli-ts/blob/v0.1.0/dist/commands/block.ts)_

## `notion-cli-ts user`

describe the command here

```
USAGE
  $ notion-cli-ts user [-r --user_id <value>] [-l] [-b]

FLAGS
  -b, --bot
  -l, --list
  -r, --retrieve
  --user_id=<value>

DESCRIPTION
  describe the command here

EXAMPLES
  $ notion-cli-ts user
```

_See code: [dist/commands/user.ts](https://github.com/litencatt/notion-cli-ts/blob/v0.1.0/dist/commands/user.ts)_

<!-- commandsstop -->
