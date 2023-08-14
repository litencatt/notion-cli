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

* [`notion-cli help`](docs/help.md) - Display help for notion-cli.

<!-- commandsstop -->

## API Support status

### Authentication

- [ ] Create a token

### Blocks

- [ ] Append block children
- [x] Retrieve a block
- [x] Retrieve block children
- [ ] Update a block
- [x] Delete a block

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

- [x] List all users
- [x] Retrive a user
- [x] Retrieve your token's bot user

### Comments

- [ ] Create comment
- [ ] Retrieve comments

### Search

- [ ] Search by title
