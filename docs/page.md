`notion-cli page`
=================

Create a page

* [`notion-cli page c`](#notion-cli-page-c)
* [`notion-cli page create`](#notion-cli-page-create)
* [`notion-cli page r PAGE_ID`](#notion-cli-page-r-page_id)
* [`notion-cli page r pi PAGE_ID PROPERTY_ID`](#notion-cli-page-r-pi-page_id-property_id)
* [`notion-cli page retrieve PAGE_ID`](#notion-cli-page-retrieve-page_id)
* [`notion-cli page retrieve property_item PAGE_ID PROPERTY_ID`](#notion-cli-page-retrieve-property_item-page_id-property_id)
* [`notion-cli page u PAGE_ID`](#notion-cli-page-u-page_id)
* [`notion-cli page update PAGE_ID`](#notion-cli-page-update-page_id)

## `notion-cli page c`

Create a page

```
USAGE
  $ notion-cli page c [-p <value>] [-d <value>] [-f <value>] [--row] [--columns <value> | -x] [--sort
    <value>] [--filter <value>] [--output csv|json|yaml |  | [--csv | --no-truncate]] [--no-header | ]

FLAGS
  -d, --parent_db_id=<value>
  -f, --file_path=<value>       Path to a source markdown file
  -p, --parent_page_id=<value>
  -x, --extended                show extra columns
  --columns=<value>             only show provided columns (comma-separated)
  --csv                         output is csv format [alias: --output=csv]
  --filter=<value>              filter property by partial string matching, ex: name=foo
  --no-header                   hide table header from output
  --no-truncate                 do not truncate output to fit screen
  --output=<option>             output in a more machine friendly format
                                <options: csv|json|yaml>
  --row
  --sort=<value>                property to sort by (prepend '-' for descending)

DESCRIPTION
  Create a page

ALIASES
  $ notion-cli page c

EXAMPLES
  $ notion-cli page c -f ./path/to/source.md -p <parent_page_id>
```

## `notion-cli page create`

Create a page

```
USAGE
  $ notion-cli page create [-p <value>] [-d <value>] [-f <value>] [--row] [--columns <value> | -x] [--sort
    <value>] [--filter <value>] [--output csv|json|yaml |  | [--csv | --no-truncate]] [--no-header | ]

FLAGS
  -d, --parent_db_id=<value>
  -f, --file_path=<value>       Path to a source markdown file
  -p, --parent_page_id=<value>
  -x, --extended                show extra columns
  --columns=<value>             only show provided columns (comma-separated)
  --csv                         output is csv format [alias: --output=csv]
  --filter=<value>              filter property by partial string matching, ex: name=foo
  --no-header                   hide table header from output
  --no-truncate                 do not truncate output to fit screen
  --output=<option>             output in a more machine friendly format
                                <options: csv|json|yaml>
  --row
  --sort=<value>                property to sort by (prepend '-' for descending)

DESCRIPTION
  Create a page

ALIASES
  $ notion-cli page c

EXAMPLES
  $ notion-cli page create -f ./path/to/source.md -p <parent_page_id>
```



## `notion-cli page r PAGE_ID`

Retrieve a page

```
USAGE
  $ notion-cli page r PAGE_ID [-p <value>]

FLAGS
  -p, --filter_properties=<value>  Comma separated property id string

DESCRIPTION
  Retrieve a page

ALIASES
  $ notion-cli page r

EXAMPLES
  $ notion-cli page r

  $ notion-cli page r -p title,Z%3ESr
```

## `notion-cli page r pi PAGE_ID PROPERTY_ID`

Retrieve a page property item

```
USAGE
  $ notion-cli page r pi PAGE_ID PROPERTY_ID

DESCRIPTION
  Retrieve a page property item

ALIASES
  $ notion-cli page r pi

EXAMPLES
  $ notion-cli page r pi <page_id> <page_property_id>
```

## `notion-cli page retrieve PAGE_ID`

Retrieve a page

```
USAGE
  $ notion-cli page retrieve PAGE_ID [-p <value>]

FLAGS
  -p, --filter_properties=<value>  Comma separated property id string

DESCRIPTION
  Retrieve a page

ALIASES
  $ notion-cli page r

EXAMPLES
  $ notion-cli page retrieve

  $ notion-cli page retrieve -p title,Z%3ESr
```



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
  $ notion-cli page retrieve property_item <page_id> <page_property_id>
```



## `notion-cli page u PAGE_ID`

Update a page

```
USAGE
  $ notion-cli page u PAGE_ID [-a] [-u]

FLAGS
  -a, --archived
  -u, --un_archive

DESCRIPTION
  Update a page

ALIASES
  $ notion-cli page u

EXAMPLES
  $ notion-cli page u <page_id>

  $ notion-cli page u <page_id> -a

  $ notion-cli page u <page_id> -u
```

## `notion-cli page update PAGE_ID`

Update a page

```
USAGE
  $ notion-cli page update PAGE_ID [-a] [-u]

FLAGS
  -a, --archived
  -u, --un_archive

DESCRIPTION
  Update a page

ALIASES
  $ notion-cli page u

EXAMPLES
  $ notion-cli page update <page_id>

  $ notion-cli page update <page_id> -a

  $ notion-cli page update <page_id> -u
```


