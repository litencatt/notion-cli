## @litencatt/notion-cli

Notion CLI tool written by TypeScript.

## Usage

```sh-session
$ export NOTION_TOKEN=secret_xxx...

$ npm install -g @litencatt/notion-cli

$ notion-cli COMMAND
running command...

$ notion-cli (--version)
@litencatt/notion-cli/0.9.0 linux-arm64 node-v19.8.1

$ notion-cli --help [COMMAND]
USAGE
  $ notion-cli COMMAND
...
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
