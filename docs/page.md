`notion-cli page`
=================

Archive a page

* [`notion-cli page archive PAGE_ID`](#notion-cli-page-archive-page_id)
* [`notion-cli page create [PARENT_ID]`](#notion-cli-page-create-parent_id)
* [`notion-cli page retrieve PAGE_ID`](#notion-cli-page-retrieve-page_id)
* [`notion-cli page retrieve property_item PAGE_ID PROPERTY_ID`](#notion-cli-page-retrieve-property_item-page_id-property_id)
* [`notion-cli page update PAGE_ID`](#notion-cli-page-update-page_id)

## `notion-cli page archive PAGE_ID`

Archive a page

```
USAGE
  $ notion-cli page archive PAGE_ID

DESCRIPTION
  Archive a page

EXAMPLES
  $ notion-cli page archive
```

## `notion-cli page create [PARENT_ID]`

Create a page

```
USAGE
  $ notion-cli page create [PARENT_ID] [-f <value>] [-t <value>]

FLAGS
  -f, --file_path=<value>   path/to/***.md
  -t, --title_name=<value>  title property name(default: Name)

DESCRIPTION
  Create a page

EXAMPLES
  $ notion-cli page create 84ea0d76-51aa-4615-95e4-1fb8db40072c -f path/to/file.md

  $ notion-cli page create 84ea0d76-51aa-4615-95e4-1fb8db40072c -f path/to/file.md -t Title
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
