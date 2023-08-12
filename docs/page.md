`notion-cli page`
=================

Create a page

* [`notion-cli page create PARENTID`](#notion-cli-page-create-parentid)
* [`notion-cli page retrieve PAGEID`](#notion-cli-page-retrieve-pageid)
* [`notion-cli page retrieve property_item PAGEID PROPERTYID`](#notion-cli-page-retrieve-property_item-pageid-propertyid)
* [`notion-cli page update PAGEID`](#notion-cli-page-update-pageid)

## `notion-cli page create PARENTID`

Create a page

```
USAGE
  $ notion-cli page create PARENTID [-f <value>]

FLAGS
  -f, --filePath=<value>

DESCRIPTION
  Create a page

EXAMPLES
  $ notion-cli page create -f ./path/to/source.md -p <parent_page_id>
```

_See code: [dist/commands/page/create.ts](https://github.com/litencatt/notion-cli/blob/v0.10.0/dist/commands/page/create.ts)_

## `notion-cli page retrieve PAGEID`

Retrieve a page

```
USAGE
  $ notion-cli page retrieve PAGEID [-p <value>]

FLAGS
  -p, --filterProperties=<value>  Comma separated property id string

DESCRIPTION
  Retrieve a page

EXAMPLES
  $ notion-cli page retrieve

  $ notion-cli page retrieve -p title,Z%3ESr
```

_See code: [dist/commands/page/retrieve.ts](https://github.com/litencatt/notion-cli/blob/v0.10.0/dist/commands/page/retrieve.ts)_

## `notion-cli page retrieve property_item PAGEID PROPERTYID`

Retrieve a page property item

```
USAGE
  $ notion-cli page retrieve property_item PAGEID PROPERTYID

DESCRIPTION
  Retrieve a page property item

EXAMPLES
  $ notion-cli page retrieve property_item <page_id> <page_property_id>
```

_See code: [dist/commands/page/retrieve/property_item.ts](https://github.com/litencatt/notion-cli/blob/v0.10.0/dist/commands/page/retrieve/property_item.ts)_

## `notion-cli page update PAGEID`

Update a page

```
USAGE
  $ notion-cli page update PAGEID [-a] [-u]

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

_See code: [dist/commands/page/update.ts](https://github.com/litencatt/notion-cli/blob/v0.10.0/dist/commands/page/update.ts)_
