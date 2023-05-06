`notion-cli block`
==================



* [`notion-cli block`](#notion-cli-block)
* [`notion-cli block append BLOCK_ID`](#notion-cli-block-append-block_id)
* [`notion-cli block delete BLOCK_ID`](#notion-cli-block-delete-block_id)
* [`notion-cli block retrieve BLOCK_ID`](#notion-cli-block-retrieve-block_id)
* [`notion-cli block retrieve children BLOCK_ID`](#notion-cli-block-retrieve-children-block_id)
* [`notion-cli block update BLOCK_ID`](#notion-cli-block-update-block_id)

## `notion-cli block`

```
USAGE
  $ notion-cli block

EXAMPLES
  $ notion-cli block
```

_See code: [dist/commands/block/index.ts](https://github.com/litencatt/notion-cli-ts/blob/v0.8.0/dist/commands/block/index.ts)_

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
