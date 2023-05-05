# @litencatt/notion-cli

Notion CLI tool written by TypeScript.

<!-- toc -->
* [@litencatt/notion-cli](#litencattnotion-cli)
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->

# Usage

```sh-session
$ export NOTION_TOKEN=secret_xxx...

$ npm install -g @litencatt/notion-cli

$ notion-cli COMMAND
running command...

$ notion-cli (--version)
@litencatt/notion-cli/0.4.3 linux-arm64 node-v19.8.1

$ notion-cli --help [COMMAND]
USAGE
  $ notion-cli COMMAND
...
```

# Commands

- [@litencatt/notion-cli](#litencattnotion-cli)
- [Usage](#usage)
- [Commands](#commands)
  - [`notion-cli block BLOCK_ID`](#notion-cli-block-block_id)
  - [`notion-cli db`](#notion-cli-db)
  - [`notion-cli help [COMMANDS]`](#notion-cli-help-commands)
  - [`notion-cli page`](#notion-cli-page)
  - [`notion-cli user`](#notion-cli-user)

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

_See code: [dist/commands/block.ts](https://github.com/litencatt/notion-cli-ts/blob/v0.4.3/dist/commands/block.ts)_

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

_See code: [dist/commands/db.ts](https://github.com/litencatt/notion-cli-ts/blob/v0.4.3/dist/commands/db.ts)_

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

_See code: [dist/commands/page.ts](https://github.com/litencatt/notion-cli-ts/blob/v0.4.3/dist/commands/page.ts)_

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

_See code: [dist/commands/user.ts](https://github.com/litencatt/notion-cli-ts/blob/v0.4.3/dist/commands/user.ts)_
