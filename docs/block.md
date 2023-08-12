`notion-cli block`
==================

Append block children

* [`notion-cli block append BLOCK_ID`](#notion-cli-block-append-block_id)
* [`notion-cli block delete BLOCK_ID`](#notion-cli-block-delete-block_id)
* [`notion-cli block retrieve BLOCK_ID`](#notion-cli-block-retrieve-block_id)
* [`notion-cli block retrieve children BLOCK_ID`](#notion-cli-block-retrieve-children-block_id)
* [`notion-cli block update BLOCK_ID`](#notion-cli-block-update-block_id)

## `notion-cli block append BLOCK_ID`

Append block children

```
USAGE
  $ notion-cli block append BLOCK_ID [-n <value>] [-f]

FLAGS
  -f, --force
  -n, --name=<value>  name to print

DESCRIPTION
  Append block children

EXAMPLES
  $ notion-cli block append
```

_See code: [dist/commands/block/append.ts](https://github.com/litencatt/notion-cli/blob/v0.10.0/dist/commands/block/append.ts)_

## `notion-cli block delete BLOCK_ID`

Delete a block

```
USAGE
  $ notion-cli block delete BLOCK_ID [-n <value>] [-f]

FLAGS
  -f, --force
  -n, --name=<value>  name to print

DESCRIPTION
  Delete a block

EXAMPLES
  $ notion-cli block delete
```

_See code: [dist/commands/block/delete.ts](https://github.com/litencatt/notion-cli/blob/v0.10.0/dist/commands/block/delete.ts)_

## `notion-cli block retrieve BLOCK_ID`

Retrieve a block

```
USAGE
  $ notion-cli block retrieve BLOCK_ID [-n <value>] [-f]

FLAGS
  -f, --force
  -n, --name=<value>  name to print

DESCRIPTION
  Retrieve a block

EXAMPLES
  $ notion-cli block retrieve
```

_See code: [dist/commands/block/retrieve.ts](https://github.com/litencatt/notion-cli/blob/v0.10.0/dist/commands/block/retrieve.ts)_

## `notion-cli block retrieve children BLOCK_ID`

Retrieve block children

```
USAGE
  $ notion-cli block retrieve children BLOCK_ID [-n <value>] [-f]

FLAGS
  -f, --force
  -n, --name=<value>  name to print

DESCRIPTION
  Retrieve block children

EXAMPLES
  $ notion-cli block retrieve children
```

_See code: [dist/commands/block/retrieve/children.ts](https://github.com/litencatt/notion-cli/blob/v0.10.0/dist/commands/block/retrieve/children.ts)_

## `notion-cli block update BLOCK_ID`

Update a block

```
USAGE
  $ notion-cli block update BLOCK_ID [-n <value>] [-f]

FLAGS
  -f, --force
  -n, --name=<value>  name to print

DESCRIPTION
  Update a block

EXAMPLES
  $ notion-cli block update
```

_See code: [dist/commands/block/update.ts](https://github.com/litencatt/notion-cli/blob/v0.10.0/dist/commands/block/update.ts)_
