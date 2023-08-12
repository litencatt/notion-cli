`notion-cli block`
==================

Append block children

* [`notion-cli block append BLOCKID`](#notion-cli-block-append-blockid)
* [`notion-cli block delete BLOCKID`](#notion-cli-block-delete-blockid)
* [`notion-cli block retrieve BLOCKID`](#notion-cli-block-retrieve-blockid)
* [`notion-cli block retrieve children BLOCKID`](#notion-cli-block-retrieve-children-blockid)
* [`notion-cli block update BLOCKID`](#notion-cli-block-update-blockid)

## `notion-cli block append BLOCKID`

Append block children

```
USAGE
  $ notion-cli block append BLOCKID [-n <value>] [-f]

FLAGS
  -f, --force
  -n, --name=<value>  name to print

DESCRIPTION
  Append block children

EXAMPLES
  $ notion-cli block append
```

_See code: [dist/commands/block/append.ts](https://github.com/litencatt/notion-cli/blob/v0.10.0/dist/commands/block/append.ts)_

## `notion-cli block delete BLOCKID`

Delete a block

```
USAGE
  $ notion-cli block delete BLOCKID [-n <value>] [-f]

FLAGS
  -f, --force
  -n, --name=<value>  name to print

DESCRIPTION
  Delete a block

EXAMPLES
  $ notion-cli block delete
```

_See code: [dist/commands/block/delete.ts](https://github.com/litencatt/notion-cli/blob/v0.10.0/dist/commands/block/delete.ts)_

## `notion-cli block retrieve BLOCKID`

Retrieve a block

```
USAGE
  $ notion-cli block retrieve BLOCKID [-n <value>] [-f]

FLAGS
  -f, --force
  -n, --name=<value>  name to print

DESCRIPTION
  Retrieve a block

EXAMPLES
  $ notion-cli block retrieve
```

_See code: [dist/commands/block/retrieve.ts](https://github.com/litencatt/notion-cli/blob/v0.10.0/dist/commands/block/retrieve.ts)_

## `notion-cli block retrieve children BLOCKID`

Retrieve block children

```
USAGE
  $ notion-cli block retrieve children BLOCKID [-n <value>] [-f]

FLAGS
  -f, --force
  -n, --name=<value>  name to print

DESCRIPTION
  Retrieve block children

EXAMPLES
  $ notion-cli block retrieve children
```

_See code: [dist/commands/block/retrieve/children.ts](https://github.com/litencatt/notion-cli/blob/v0.10.0/dist/commands/block/retrieve/children.ts)_

## `notion-cli block update BLOCKID`

Update a block

```
USAGE
  $ notion-cli block update BLOCKID [-n <value>] [-f]

FLAGS
  -f, --force
  -n, --name=<value>  name to print

DESCRIPTION
  Update a block

EXAMPLES
  $ notion-cli block update
```

_See code: [dist/commands/block/update.ts](https://github.com/litencatt/notion-cli/blob/v0.10.0/dist/commands/block/update.ts)_
