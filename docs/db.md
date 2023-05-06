`notion-cli db`
===============



* [`notion-cli db`](#notion-cli-db)
* [`notion-cli db create PAGE_ID`](#notion-cli-db-create-page_id)
* [`notion-cli db query DATABASE_ID`](#notion-cli-db-query-database_id)
* [`notion-cli db retrieve DATABASEID`](#notion-cli-db-retrieve-databaseid)
* [`notion-cli db update DATABASEID`](#notion-cli-db-update-databaseid)

## `notion-cli db`

```
USAGE
  $ notion-cli db [-d <value>] [-f <value>] [-u <value>]

FLAGS
  -d, --database_id=<value>
  -f, --filter_json_path=<value>
  -u, --update_json_path=<value>

EXAMPLES
  $ notion-cli db

  $ notion-cli db -d 84ea0d76-51aa-4615-95e4-1fb8db40072c

  $ notion-cli db -d 84ea0d76-51aa-4615-95e4-1fb8db40072c -f path/to/filter.json

  $ notion-cli db -d 84ea0d76-51aa-4615-95e4-1fb8db40072c -f path/to/filter.json -u path/to/update.json
```

_See code: [dist/commands/db/index.ts](https://github.com/litencatt/notion-cli-ts/blob/v0.8.0/dist/commands/db/index.ts)_

## `notion-cli db create PAGE_ID`

Create a database

```
USAGE
  $ notion-cli db create PAGE_ID

DESCRIPTION
  Create a database

EXAMPLES
  $ notion-cli db create f929e92f257c4d8bb9d0c176ce24814d
```

## `notion-cli db query DATABASE_ID`

Query a database

```
USAGE
  $ notion-cli db query DATABASE_ID [-f <value>]

FLAGS
  -f, --filter=<value>  JSON stringified filter string

DESCRIPTION
  Query a database

EXAMPLES
  $ notion-cli db query f929e92f257c4d8bb9d0c176ce24814d

  $ notion-cli db query f929e92f257c4d8bb9d0c176ce24814d -f "{"property":"Number","number":{"equals":2}}"
```

## `notion-cli db retrieve DATABASEID`

Retrieve a database

```
USAGE
  $ notion-cli db retrieve DATABASEID [-p <value>] [-P]

FLAGS
  -P, --onlyValue
  -p, --propertyList=<value>

DESCRIPTION
  Retrieve a database

EXAMPLES
  $ notion-cli db retrieve f929e92f257c4d8bb9d0c176ce24814d
```

## `notion-cli db update DATABASEID`

Update a database

```
USAGE
  $ notion-cli db update DATABASEID

DESCRIPTION
  Update a database

EXAMPLES
  $ notion-cli db update f929e92f257c4d8bb9d0c176ce24814d
```
