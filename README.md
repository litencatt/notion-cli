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
* [`notion-cli plugins`](docs/plugins.md) - List installed plugins.
* [`notion-cli user`](docs/user.md) - List all users

<!-- commandsstop -->

## API Support status

### Authentication

- [ ] Create a token

### Blocks

- [ ] Append block children
- [ ] Retrieve a block
- [ ] Retrieve block children
- [ ] Update a block
- [ ] Delete a block

### Pages

- [x] Create a page
- [x] Retrieve a page
- [x] Retrieve a page property item
- [x] Update page properties

### Databases

- [x] Create a database
- [x] Query a database
- [x] Retrieve a database
- [x] Update database properties

### Users

- [ ] List all users
- [ ] Retrive a user
- [ ] Retrieve your token's bot user

### Comments

- [ ] Create comment
- [ ] Retrieve comments

### Search

- [ ] Search by title
