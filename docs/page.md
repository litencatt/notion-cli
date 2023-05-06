`notion-cli page`
=================



* [`notion-cli page`](#notion-cli-page)
* [`notion-cli page archive [FILE]`](#notion-cli-page-archive-file)
* [`notion-cli page create [PARENT_ID]`](#notion-cli-page-create-parent_id)
* [`notion-cli page retrieve PAGE_ID`](#notion-cli-page-retrieve-page_id)
* [`notion-cli page retrieve property_item PAGE_ID PROPERTY_ID`](#notion-cli-page-retrieve-property_item-page_id-property_id)
* [`notion-cli page update PAGE_ID`](#notion-cli-page-update-page_id)

## `notion-cli page`

```
USAGE
  $ notion-cli page

EXAMPLES
  $ notion-cli page
```

_See code: [dist/commands/page/index.ts](https://github.com/litencatt/notion-cli-ts/blob/v0.9.0/dist/commands/page/index.ts)_

## `notion-cli page archive [FILE]`

Archive a page

```
USAGE
  $ notion-cli page archive [FILE] [-n <value>] [-f]

ARGUMENTS
  FILE  file to read

FLAGS
  -f, --force
  -n, --name=<value>  name to print

DESCRIPTION
  Archive a page

EXAMPLES
  $ notion-cli page archive
```

## `notion-cli page create [PARENT_ID]`

Create a page

```
USAGE
  $ notion-cli page create [PARENT_ID] [-f <value>]

FLAGS
  -f, --file_path=<value>

DESCRIPTION
  Create a page

EXAMPLES
  $ notion-cli page create
```

## `notion-cli page retrieve PAGE_ID`

Retrieve a page

```
USAGE
  $ notion-cli page retrieve PAGE_ID [-f <value>]

FLAGS
  -f, --file_path=<value>

DESCRIPTION
  Retrieve a page

EXAMPLES
  $ notion-cli page retrieve
```

## `notion-cli page retrieve property_item PAGE_ID PROPERTY_ID`

Retrieve a page property item

```
USAGE
  $ notion-cli page retrieve property_item PAGE_ID PROPERTY_ID

DESCRIPTION
  Retrieve a page property item

EXAMPLES
  $ notion-cli page retrieve property_item
```

## `notion-cli page update PAGE_ID`

Update a page

```
USAGE
  $ notion-cli page update PAGE_ID [-f <value>]

FLAGS
  -f, --file_path=<value>

DESCRIPTION
  Update a page

EXAMPLES
  $ notion-cli page update
```
