## @litencatt/notion-cli

Notion CLI tool written by TypeScript. And some commands can be executed in interactive mode.

## Quick Start

Retrieves a page object using the ID specified.

```sh
$ export NOTION_TOKEN=secret_xxx...
$ notion-cli page retrieve xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
```

Using docker image:

```sh
# -it flag is required to run interactive mode
$ docker run -it -e NOTION_TOKEN=secret_xxx... ghcr.io/litencatt/notion-cli page retrieve  xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
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

## API Support status

Endpoint | API | Support | ux.table | interactive mode
-- | -- | -- | -- | --
Authentication | Create a token |   |   |  
Blocks | Append  a block children | o |   |  
Blocks | Retrieve  a block | o |   |  
Blocks | Retrieve a block children | o |   |  
Blocks | Update a block |   |   |  
Blocks | Delete a block | o |   |  
Pages | Create a page | o | o |  
Pages | Retrieve a page | o | o |  
Pages | Update a page | o | o |  
Database | Create a database | o | o | o
Database | Retrieve a database | o | o | o
Database | Update a database | o | o | o
Database | Query a database | o | o | o
Users | List all users | o |   |  
Users | Retrieve a user | o |   |  
Users | Retrieve your token's bot user | o |   |  
Comments | Create a comment |   |   |  
Comments | Retrieve a comment |   |   |  
Search | Search by title | o | o |  
