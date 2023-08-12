## @litencatt/notion-cli

Notion CLI tool written by TypeScript.

## Quick Start
Retrieves a page object using the ID specified.
```sh-session
$ export NOTION_TOKEN=secret_xxx...
$ notion-cli page retrieve xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
```

Using docker image:
```sh-session
$ docker run --rm -e NOTION_TOKEN=secret_xxx... ghcr.io/litencatt/notion-cli page retrieve  xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
```

## Install
npm:
```
$ npm install -g @litencatt/notion-cli
```

docker:
```
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
