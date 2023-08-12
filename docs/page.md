`notion-cli page`
=================

Create a page

* [`notion-cli page create PARENT_ID`](#notion-cli-page-create-parent_id)
* [`notion-cli page retrieve PAGE_ID`](#notion-cli-page-retrieve-page_id)
* [`notion-cli page retrieve property_item PAGE_ID PROPERTY_ID`](#notion-cli-page-retrieve-property_item-page_id-property_id)
* [`notion-cli page update PAGE_ID`](#notion-cli-page-update-page_id)

## `notion-cli page create PARENT_ID`

Create a page

```
USAGE
  $ notion-cli page create PARENT_ID [-f <value>]

FLAGS
  -f, --file_path=<value>  Path to a source markdown file

DESCRIPTION
  Create a page

EXAMPLES
  $ notion-cli page create -f ./path/to/source.md -p <parent_page_id>
```

_See code: [src/commands/page/create.ts](https://github.com/litencatt/notion-cli/blob/v0.10.1/src/commands/page/create.ts)_

## `notion-cli page retrieve PAGE_ID`

Retrieve a page

```
USAGE
  $ notion-cli page retrieve PAGE_ID [-p <value>]

FLAGS
  -p, --filter_properties=<value>  Comma separated property id string

DESCRIPTION
  Retrieve a page

EXAMPLES
  $ notion-cli page retrieve

  $ notion-cli page retrieve -p title,Z%3ESr
```

_See code: [src/commands/page/retrieve.ts](https://github.com/litencatt/notion-cli/blob/v0.10.1/src/commands/page/retrieve.ts)_

## `notion-cli page retrieve property_item PAGE_ID PROPERTY_ID`

Retrieve a page property item

```
USAGE
  $ notion-cli page retrieve property_item PAGE_ID PROPERTY_ID

DESCRIPTION
  Retrieve a page property item

EXAMPLES
  $ notion-cli page retrieve property_item <page_id> <page_property_id>
```

_See code: [src/commands/page/retrieve/property_item.ts](https://github.com/litencatt/notion-cli/blob/v0.10.1/src/commands/page/retrieve/property_item.ts)_

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

EXAMPLES
  $ notion-cli page update <page_id>

  $ notion-cli page update <page_id> -a

  $ notion-cli page update <page_id> -u
```

_See code: [src/commands/page/update.ts](https://github.com/litencatt/notion-cli/blob/v0.10.1/src/commands/page/update.ts)_
