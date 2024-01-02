`notion-cli page`
=================

Create a page

* [`notion-cli page create`](#notion-cli-page-create)
* [`notion-cli page retrieve PAGE_ID`](#notion-cli-page-retrieve-page_id)
* [`notion-cli page retrieve property_item PAGE_ID PROPERTY_ID`](#notion-cli-page-retrieve-property_item-page_id-property_id)
* [`notion-cli page update PAGE_ID`](#notion-cli-page-update-page_id)

## `notion-cli page create`

Create a page

```
USAGE
  $ notion-cli page create [-p <value>] [-d <value>] [-f <value>] [-r] [--columns <value> | -x] [--sort <value>]
    [--filter <value>] [--output csv|json|yaml |  | [--csv | --no-truncate]] [--no-header | ]

FLAGS
  -d, --parent_db_id=<value>
  -f, --file_path=<value>       Path to a source markdown file
  -p, --parent_page_id=<value>
  -r, --raw                     output raw json
  -x, --extended                show extra columns
  --columns=<value>             only show provided columns (comma-separated)
  --csv                         output is csv format [alias: --output=csv]
  --filter=<value>              filter property by partial string matching, ex: name=foo
  --no-header                   hide table header from output
  --no-truncate                 do not truncate output to fit screen
  --output=<option>             output in a more machine friendly format
                                <options: csv|json|yaml>
  --sort=<value>                property to sort by (prepend '-' for descending)

DESCRIPTION
  Create a page

ALIASES
  $ notion-cli page c

EXAMPLES
  Create a page via interactive mode

    $ notion-cli page create

  Create a page with a specific parent_page_id

    $ notion-cli page create -p PARENT_PAGE_ID

  Create a page with a specific parent_db_id

    $ notion-cli page create -d PARENT_DB_ID

  Create a page with a specific source markdown file and parent_page_id

    $ notion-cli page create -f ./path/to/source.md -p PARENT_PAGE_ID

  Create a page with a specific source markdown file and parent_db_id

    $ notion-cli page create -f ./path/to/source.md -d PARENT_DB_ID

  Create a page with a specific source markdown file and output raw json with parent_page_id

    $ notion-cli page create -f ./path/to/source.md -p PARENT_PAGE_ID -r
```

_See code: [src/commands/page/create.ts](https://github.com/litencatt/notion-cli/blob/v0.14.4/src/commands/page/create.ts)_

## `notion-cli page retrieve PAGE_ID`

Retrieve a page

```
USAGE
  $ notion-cli page retrieve PAGE_ID [-p <value>] [-r] [-m] [--columns <value> | -x] [--sort <value>] [--filter
    <value>] [--output csv|json|yaml |  | [--csv | --no-truncate]] [--no-header | ]

FLAGS
  -m, --markdown                   output markdown
  -p, --filter_properties=<value>  Comma separated property id string
  -r, --raw                        output raw json
  -x, --extended                   show extra columns
  --columns=<value>                only show provided columns (comma-separated)
  --csv                            output is csv format [alias: --output=csv]
  --filter=<value>                 filter property by partial string matching, ex: name=foo
  --no-header                      hide table header from output
  --no-truncate                    do not truncate output to fit screen
  --output=<option>                output in a more machine friendly format
                                   <options: csv|json|yaml>
  --sort=<value>                   property to sort by (prepend '-' for descending)

DESCRIPTION
  Retrieve a page

ALIASES
  $ notion-cli page r

EXAMPLES
  Retrieve a page and output table

    $ notion-cli page retrieve PAGE_ID

  Retrieve a page and output raw json

    $ notion-cli page retrieve PAGE_ID -r

  Retrieve a page and output markdown

    $ notion-cli page retrieve PAGE_ID -m

  Retrieve a page with filter properties

    $ notion-cli page retrieve PAGE_ID -p title,Z%3ESr

  Retrieve a page with filter properties and output raw json

    $ notion-cli page retrieve PAGE_ID -p title,Z%3ESr -r
```

_See code: [src/commands/page/retrieve.ts](https://github.com/litencatt/notion-cli/blob/v0.14.4/src/commands/page/retrieve.ts)_

## `notion-cli page retrieve property_item PAGE_ID PROPERTY_ID`

Retrieve a page property item

```
USAGE
  $ notion-cli page retrieve property_item PAGE_ID PROPERTY_ID

DESCRIPTION
  Retrieve a page property item

ALIASES
  $ notion-cli page r pi

EXAMPLES
  Retrieve a page property item

    $ notion-cli page retrieve:property_item PAGE_ID PROPERTY_ID

  Retrieve a page property item and output raw json

    $ notion-cli page retrieve:property_item PAGE_ID PROPERTY_ID -r
```

_See code: [src/commands/page/retrieve/property_item.ts](https://github.com/litencatt/notion-cli/blob/v0.14.4/src/commands/page/retrieve/property_item.ts)_

## `notion-cli page update PAGE_ID`

Update a page

```
USAGE
  $ notion-cli page update PAGE_ID [-a] [-u] [-r] [--columns <value> | -x] [--sort <value>] [--filter <value>]
    [--output csv|json|yaml |  | [--csv | --no-truncate]] [--no-header | ]

FLAGS
  -a, --archived
  -r, --raw          output raw json
  -u, --un_archive
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
  Update a page

ALIASES
  $ notion-cli page u

EXAMPLES
  Update a page and output table

    $ notion-cli page update PAGE_ID

  Update a page and output raw json

    $ notion-cli page update PAGE_ID -r

  Update a page and archive

    $ notion-cli page update PAGE_ID -a

  Update a page and un archive

    $ notion-cli page update PAGE_ID -u

  Update a page and archive and output raw json

    $ notion-cli page update PAGE_ID -a -r

  Update a page and un archive and output raw json

    $ notion-cli page update PAGE_ID -u -r
```

_See code: [src/commands/page/update.ts](https://github.com/litencatt/notion-cli/blob/v0.14.4/src/commands/page/update.ts)_
