`notion-cli block`
==================

Append block children

* [`notion-cli block append BLOCK_ID CHILDREN [AFTER]`](#notion-cli-block-append-block_id-children-after)
* [`notion-cli block delete BLOCK_ID`](#notion-cli-block-delete-block_id)
* [`notion-cli block retrieve BLOCK_ID`](#notion-cli-block-retrieve-block_id)
* [`notion-cli block retrieve children BLOCK_ID`](#notion-cli-block-retrieve-children-block_id)
* [`notion-cli block update BLOCK_ID`](#notion-cli-block-update-block_id)

## `notion-cli block append BLOCK_ID CHILDREN [AFTER]`

Append block children

```
USAGE
  $ notion-cli block append BLOCK_ID CHILDREN [AFTER] [-r] [--columns <value> | -x] [--sort <value>] [--filter
    <value>] [--output csv|json|yaml |  | [--csv | --no-truncate]] [--no-header | ]

FLAGS
  -r, --raw          output raw json
  -x, --extended     show extra columns
  --columns=<value>  only show provided columns (comma-separated)
  --csv              output is csv format [alias: --output=csv]
  --filter=<value>   filter property by partial string matching, ex: name=foo
  --no-header        hide table header from output
  --no-truncate      do not truncate output to fit screen
  --output=<option>  output in a more machine friendly format
                     <options: csv|json|yaml>
  --sort=<value>     property to sort by (prepend '-' for descending)

DESCRIPTION
  Append block children

ALIASES
  $ notion-cli block a

EXAMPLES
  Append block children

    $ notion-cli block append BLOCK_ID -c \
      '[{"object":"block","type":"paragraph","paragraph":{"text":[{"type":"text","text":{"content":"Hello \
      world!"}}]}}]'

  Append block children after a block

    $ notion-cli block append BLOCK_ID -c \
      '[{"object":"block","type":"paragraph","paragraph":{"text":[{"type":"text","text":{"content":"Hello \
      world!"}}]}}]' -a BLOCK_ID

  Append block children and output raw json

    $ notion-cli block append BLOCK_ID -c \
      '[{"object":"block","type":"paragraph","paragraph":{"text":[{"type":"text","text":{"content":"Hello \
      world!"}}]}}]' -r
```



## `notion-cli block delete BLOCK_ID`

Delete a block

```
USAGE
  $ notion-cli block delete BLOCK_ID [-r] [--columns <value> | -x] [--sort <value>] [--filter <value>] [--output
    csv|json|yaml |  | [--csv | --no-truncate]] [--no-header | ]

FLAGS
  -r, --raw          output raw json
  -x, --extended     show extra columns
  --columns=<value>  only show provided columns (comma-separated)
  --csv              output is csv format [alias: --output=csv]
  --filter=<value>   filter property by partial string matching, ex: name=foo
  --no-header        hide table header from output
  --no-truncate      do not truncate output to fit screen
  --output=<option>  output in a more machine friendly format
                     <options: csv|json|yaml>
  --sort=<value>     property to sort by (prepend '-' for descending)

DESCRIPTION
  Delete a block

ALIASES
  $ notion-cli block d

EXAMPLES
  Delete a block

    $ notion-cli block delete BLOCK_ID

  Delete a block and output raw json

    $ notion-cli block delete BLOCK_ID -r
```



## `notion-cli block retrieve BLOCK_ID`

Retrieve a block

```
USAGE
  $ notion-cli block retrieve BLOCK_ID [-r] [--columns <value> | -x] [--sort <value>] [--filter <value>] [--output
    csv|json|yaml |  | [--csv | --no-truncate]] [--no-header | ]

FLAGS
  -r, --raw          output raw json
  -x, --extended     show extra columns
  --columns=<value>  only show provided columns (comma-separated)
  --csv              output is csv format [alias: --output=csv]
  --filter=<value>   filter property by partial string matching, ex: name=foo
  --no-header        hide table header from output
  --no-truncate      do not truncate output to fit screen
  --output=<option>  output in a more machine friendly format
                     <options: csv|json|yaml>
  --sort=<value>     property to sort by (prepend '-' for descending)

DESCRIPTION
  Retrieve a block

ALIASES
  $ notion-cli block r

EXAMPLES
  Retrieve a block

    $ notion-cli block retrieve BLOCK_ID

  Retrieve a block and output raw json

    $ notion-cli block retrieve BLOCK_ID -r
```



## `notion-cli block retrieve children BLOCK_ID`

Retrieve block children

```
USAGE
  $ notion-cli block retrieve children BLOCK_ID [-r] [--columns <value> | -x] [--sort <value>] [--filter <value>] [--output
    csv|json|yaml |  | [--csv | --no-truncate]] [--no-header | ]

ARGUMENTS
  BLOCK_ID  block_id or page_id

FLAGS
  -r, --raw          output raw json
  -x, --extended     show extra columns
  --columns=<value>  only show provided columns (comma-separated)
  --csv              output is csv format [alias: --output=csv]
  --filter=<value>   filter property by partial string matching, ex: name=foo
  --no-header        hide table header from output
  --no-truncate      do not truncate output to fit screen
  --output=<option>  output in a more machine friendly format
                     <options: csv|json|yaml>
  --sort=<value>     property to sort by (prepend '-' for descending)

DESCRIPTION
  Retrieve block children

ALIASES
  $ notion-cli block r c

EXAMPLES
  Retrieve block children

    $ notion-cli block retrieve:children BLOCK_ID

  Retrieve block children and output raw json

    $ notion-cli block retrieve:children BLOCK_ID -r
```



## `notion-cli block update BLOCK_ID`

Update a block

```
USAGE
  $ notion-cli block update BLOCK_ID [-a] [-r] [--columns <value> | -x] [--sort <value>] [--filter <value>]
    [--output csv|json|yaml |  | [--csv | --no-truncate]] [--no-header | ]

FLAGS
  -a, --archived
  -r, --raw          output raw json
  -x, --extended     show extra columns
  --columns=<value>  only show provided columns (comma-separated)
  --csv              output is csv format [alias: --output=csv]
  --filter=<value>   filter property by partial string matching, ex: name=foo
  --no-header        hide table header from output
  --no-truncate      do not truncate output to fit screen
  --output=<option>  output in a more machine friendly format
                     <options: csv|json|yaml>
  --sort=<value>     property to sort by (prepend '-' for descending)

DESCRIPTION
  Update a block

ALIASES
  $ notion-cli block u

EXAMPLES
  Update a block and output table

    $ notion-cli block update BLOCK_ID

  Update a block and output raw json

    $ notion-cli block update BLOCK_ID -r
```


