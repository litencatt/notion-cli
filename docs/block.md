`notion-cli block`
==================

Append block children

* [`notion-cli block a BLOCK_ID CHILDREN [AFTER]`](#notion-cli-block-a-block_id-children-after)
* [`notion-cli block append BLOCK_ID CHILDREN [AFTER]`](#notion-cli-block-append-block_id-children-after)
* [`notion-cli block d BLOCK_ID`](#notion-cli-block-d-block_id)
* [`notion-cli block delete BLOCK_ID`](#notion-cli-block-delete-block_id)
* [`notion-cli block r BLOCK_ID`](#notion-cli-block-r-block_id)
* [`notion-cli block r c BLOCK_ID`](#notion-cli-block-r-c-block_id)
* [`notion-cli block retrieve BLOCK_ID`](#notion-cli-block-retrieve-block_id)
* [`notion-cli block retrieve children BLOCK_ID`](#notion-cli-block-retrieve-children-block_id)
* [`notion-cli block u BLOCK_ID`](#notion-cli-block-u-block_id)
* [`notion-cli block update BLOCK_ID`](#notion-cli-block-update-block_id)

## `notion-cli block a BLOCK_ID CHILDREN [AFTER]`

Append block children

```
USAGE
  $ notion-cli block a BLOCK_ID CHILDREN [AFTER]

DESCRIPTION
  Append block children

ALIASES
  $ notion-cli block a

EXAMPLES
  $ notion-cli block a BLOCK_ID CHILDREN AFTER
```

## `notion-cli block append BLOCK_ID CHILDREN [AFTER]`

Append block children

```
USAGE
  $ notion-cli block append BLOCK_ID CHILDREN [AFTER]

DESCRIPTION
  Append block children

ALIASES
  $ notion-cli block a

EXAMPLES
  $ notion-cli block append BLOCK_ID CHILDREN AFTER
```

_See code: [dist/commands/block/append.ts](https://github.com/litencatt/notion-cli/blob/v0.11.2/dist/commands/block/append.ts)_

## `notion-cli block d BLOCK_ID`

Delete a block

```
USAGE
  $ notion-cli block d BLOCK_ID

DESCRIPTION
  Delete a block

ALIASES
  $ notion-cli block d

EXAMPLES
  $ notion-cli block d
```

## `notion-cli block delete BLOCK_ID`

Delete a block

```
USAGE
  $ notion-cli block delete BLOCK_ID

DESCRIPTION
  Delete a block

ALIASES
  $ notion-cli block d

EXAMPLES
  $ notion-cli block delete
```

_See code: [dist/commands/block/delete.ts](https://github.com/litencatt/notion-cli/blob/v0.11.2/dist/commands/block/delete.ts)_

## `notion-cli block r BLOCK_ID`

Retrieve a block

```
USAGE
  $ notion-cli block r BLOCK_ID

DESCRIPTION
  Retrieve a block

ALIASES
  $ notion-cli block r

EXAMPLES
  $ notion-cli block r BLOCK_ID
```

## `notion-cli block r c BLOCK_ID`

Retrieve block children

```
USAGE
  $ notion-cli block r c BLOCK_ID

ARGUMENTS
  BLOCK_ID  block_id or page_id

DESCRIPTION
  Retrieve block children

ALIASES
  $ notion-cli block r c

EXAMPLES
  $ notion-cli block r c BLOCK_ID
```

## `notion-cli block retrieve BLOCK_ID`

Retrieve a block

```
USAGE
  $ notion-cli block retrieve BLOCK_ID

DESCRIPTION
  Retrieve a block

ALIASES
  $ notion-cli block r

EXAMPLES
  $ notion-cli block retrieve BLOCK_ID
```

_See code: [dist/commands/block/retrieve.ts](https://github.com/litencatt/notion-cli/blob/v0.11.2/dist/commands/block/retrieve.ts)_

## `notion-cli block retrieve children BLOCK_ID`

Retrieve block children

```
USAGE
  $ notion-cli block retrieve children BLOCK_ID

ARGUMENTS
  BLOCK_ID  block_id or page_id

DESCRIPTION
  Retrieve block children

ALIASES
  $ notion-cli block r c

EXAMPLES
  $ notion-cli block retrieve children BLOCK_ID
```

_See code: [dist/commands/block/retrieve/children.ts](https://github.com/litencatt/notion-cli/blob/v0.11.2/dist/commands/block/retrieve/children.ts)_

## `notion-cli block u BLOCK_ID`

Update a block

```
USAGE
  $ notion-cli block u BLOCK_ID [-a]

FLAGS
  -a, --archived

DESCRIPTION
  Update a block

ALIASES
  $ notion-cli block u

EXAMPLES
  $ notion-cli block u
```

## `notion-cli block update BLOCK_ID`

Update a block

```
USAGE
  $ notion-cli block update BLOCK_ID [-a]

FLAGS
  -a, --archived

DESCRIPTION
  Update a block

ALIASES
  $ notion-cli block u

EXAMPLES
  $ notion-cli block update
```

_See code: [dist/commands/block/update.ts](https://github.com/litencatt/notion-cli/blob/v0.11.2/dist/commands/block/update.ts)_
