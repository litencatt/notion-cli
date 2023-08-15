## notion-cli

This is a Notion CLI tool written by TypeScript. And some commands can be executed in interactive mode.

## Features

* Support for multiple output formats including csv and JSON
* Support interactive mode for CRUD operation.


## Quick Start

Retrieves a page object using the ID specified.<br>

```sh
$ export NOTION_TOKEN=secret_xxx...
$ notion-cli page retrieve <PAGE_ID>
```

Using docker image:

```sh
$ docker run -e NOTION_TOKEN=secret_xxx... ghcr.io/litencatt/notion-cli page retrieve <PAGE_ID>

# -it flag is required to run interactive mode using docker
$ docker run -it -e NOTION_TOKEN=secret_xxx... ghcr.io/litencatt/notion-cli db retrieve
```
#### How to create a `NOTION_TOKEN`: https://developers.notion.com/docs/create-a-notion-integration

### Multiple output formats

#### default: table
```sh
$ notion-cli page retireve c77dbaf240174ea1ac1e93a87269f3ea
 Title      Object Id                                   Url
 ────────── ────── ──────────────────────────────────── ─────────────────────────────────────────────────────────────────
 Page title page   c77dbaf2-4017-4ea1-ac1e-93a87269f3ea https://www.notion.so/Page-title-c77dbaf240174ea1ac1e93a87269f3ea
```
#### csv
```
$ notion-cli page retrieve c77dbaf240174ea1ac1e93a87269f3ea --output csv
Title,Object,Id,Url
Page title,page,c77dbaf2-4017-4ea1-ac1e-93a87269f3ea,https://www.notion.so/Page-title-c77dbaf240174ea1ac1e93a87269f3ea
```

#### JSON
```
$ notion-cli page retrieve c77dbaf240174ea1ac1e93a87269f3ea --output json
[
  {
    "title": "Page title",
    "object": "page",
    "id": "c77dbaf2-4017-4ea1-ac1e-93a87269f3ea",
    "url": "https://www.notion.so/Page-title-c77dbaf240174ea1ac1e93a87269f3ea"
  }
]
```

### yaml
```
$ notion-cli page retrieve c77dbaf240174ea1ac1e93a87269f3ea --output yaml
- title: Page title
  object: page
  id: c77dbaf2-4017-4ea1-ac1e-93a87269f3ea
  url: 'https://www.notion.so/Page-title-c77dbaf240174ea1ac1e93a87269f3ea'
```

### Interactive mode

In some commands, start interactive mode when execute without args.

```sh
$ notion-cli db retrieve
? Select a database ›
❯   database 1
    database 2
    ...
```

## Install

npm:

```sh
$ npm install -g @litencatt/notion-cli
```

docker:

```sh
$ docker pull ghcr.io/litencatt/notion-cli
```

## Commands
<!-- commands -->
# Command Topics

* [`notion-cli block`](docs/block.md) - Append block children
* [`notion-cli db`](docs/db.md) - Create a database
* [`notion-cli help`](docs/help.md) - Display help for notion-cli.
* [`notion-cli page`](docs/page.md) - Create a page
* [`notion-cli search`](docs/search.md) - Search by title
* [`notion-cli user`](docs/user.md) - List all users

<!-- commandsstop -->

## Supported API and functions

Endpoint | API | Support | ux.table | interactive mode
-- | -- | -- | -- | --
Authentication | Create a token |   |   |  
Blocks | Append  a block children |  |   |  
Blocks | Retrieve  a block | o |   |  
Blocks | Retrieve a block children | o |   |  
Blocks | Update a block |   |   |  
Blocks | Delete a block | o |   |  
Pages | Create a page | o | o |  
Pages | Retrieve a page | o | o |  
Pages | Update a page |  |  |  
Database | Create a database | o | o | o
Database | Retrieve a database | o | o | o
Database | Update a database | o | o | o
Database | Query a database | o | o | o
Users | List all users | o | o |  
Users | Retrieve a user | o | o |  
Users | Retrieve your token's bot user | o | o |  
Comments | Create a comment |   |   |  
Comments | Retrieve a comment |   |   |  
Search | Search by title | o | o |
