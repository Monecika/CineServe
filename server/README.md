# Web Advanced backend template

Starting point for the backend of module 2.1 Web Advanced (Saxion, Bachelor ICT).

It is a small Express API on top of SQLite, using Sequelize as the ORM, with
Swagger documentation, ESLint and Vitest already wired up. One example resource
(`/examples`) is included so you can see every layer working together. Replace it
with your own resources.

## Requirements

- Node.js 22.18 or newer (24.12+ also works). ESLint 10 and Vite 8 refuse to run
  on older versions.
- No database server: SQLite stores everything in a file under `db/`.

## Getting started

```bash
npm install
cp .env.example .env.dev     # then set NODE_ENV=dev in that file
npm run seed                 # fill the database with example data
npm run dev
```

The API runs on <http://localhost:3000>, the documentation on <http://localhost:3000/api-docs>.

## Commands

| Command | What it does |
| --- | --- |
| `npm run dev` | Starts the server with `.env.dev` and Node's `--watch`, so it restarts on every change. Use this while developing. |
| `npm start` | Starts the server with `.env.prod` and no watching. |
| `npm run seed` | Empties the development database and refills it with the data in `src/seed.js`. |
| `npm run lint` | Runs oxlint and ESLint over the project. Fix everything they report before handing in. |
| `npm run format` | Formats everything in `src/` with oxfmt. |
| `npm test` | Runs Vitest in watch mode: it keeps running and re-tests on every save. Press `q` to quit. |
| `npm run test:report` | Runs the tests once and writes an HTML report to `html/`. Open it with `npx vite preview --outDir html`. |

## Environment variables

Environment variables live in `.env.<environment>` files in the project root.
These files are not in version control: `.env.example` shows which variables
exist, and everyone makes their own copy.

| File | Used by |
| --- | --- |
| `.env.dev` | `npm run dev` and `npm run seed` |
| `.env.test` | Loaded automatically by Vitest (see `vitest.config.js`) |
| `.env.prod` | `npm start` |

| Variable | Values | Meaning |
| --- | --- | --- |
| `NODE_ENV` | `dev`, `test`, `prod` | Decides which database is used and how the schema is synchronised. |
| `PORT` | a port number | Port the server listens on. Defaults to 3000. |

Node loads these files through the `--env-file` flag in the npm scripts, so no
`dotenv` package is needed. Want different file names or a hierarchy of env
files? Change the scripts in `package.json`.

`NODE_ENV` has consequences beyond the file name:

- `dev`: uses `db/database.dev.sqlite` and synchronises the schema with `alter`,
  so a change to a model is applied to the existing tables.
- `test`: uses an in-memory database that disappears when the process ends.
- anything else: uses `db/database.<NODE_ENV>.sqlite` and only creates tables
  that do not exist yet.

## Seeding the database

`src/seed.js` is a second entry point next to `src/index.js`. Where `index.js`
starts an HTTP server, the seed script fills the database and exits. Both sit on
top of the same models.

```bash
npm run seed
```

Seeding is destructive on purpose: it drops every table, recreates them and
inserts the data from the script. You therefore always start from the same known
state, which is what makes a bug reproducible for someone else ("run `npm run
seed`, then open `/examples/2`"). The script refuses to run when `NODE_ENV` is
`prod`.

Add your own data by editing the `bulkCreate` call in `src/seed.js`. Once you
have several models, split the data into a `src/seeds/` folder with one file per
model, and be careful about the order: a record cannot reference a row that does
not exist yet.

## Testing

Tests live in `src/tests/` and use Vitest with supertest, which fires real HTTP
requests at the app without you having to start a server.

```bash
npm run test
npm run test:report      # once, with an HTML report
```

Three things are worth knowing about how the tests are set up:

- **The tests use an in-memory database.** `src/config/database.js` switches to
  `:memory:` when `NODE_ENV` is `test`. A test run can never touch your
  development data, leaves no files behind, and every test file gets its own
  database because Vitest runs files in parallel workers.
- **The tests import the app from `index.js`.** Supertest gives that app its own
  temporary server on a free port, so you do not have to start anything yourself.
  Importing `index.js` does run its `app.listen()` as well, so if you ever see an
  `EADDRINUSE` error while testing, something else is already using port 3000.
- **Every test starts from a clean database.** The `beforeEach` calls
  `sequelize.sync({ force: true })` and inserts its own fixtures. That resets the
  autoincrement counter too, so the first row is always id 1 and tests can rely
  on it. Never depend on data another test left behind.
  Write a test per behaviour, not per function: the happy path, plus what happens
  on invalid input (400) and on something that does not exist (404).

## Linting and formatting

Three tools, each with its own job:

- **oxlint** catches the bulk of the problems and is fast. Configured in
  `.oxlintrc.json`.
- **ESLint** adds the rules oxlint does not have, plus the shared rule set the
  client template uses, so both halves of the module enforce the same habits.
  Configured in `eslint.config.js`.
- **oxfmt** does the formatting (2 spaces, single quotes, no semicolons), with
  `.editorconfig` and `.oxfmtrc.json` as its settings.

`npm run lint` runs both linters in sequence and stops at the first one that
fails, so fix the oxlint output first.

The ESLint config switches off its own rules wherever oxlint already covers them.
A consequence: an `// eslint-disable-next-line` for such a rule counts as unused
and gets reported. That is why the unused `next` parameter of the error handler
in `index.js` is written as `_next` instead of being silenced with a comment.
The `// eslint-disable-next-line no-console` in `index.js` and `seed.js` does
stay, because `no-console` is one of our own rules and not an oxlint rule.

## Project structure

```
src/
  index.js                  entry point: builds the app, connects to the database, listens
  seed.js                   second entry point: fills the database
  swagger-config.js         reads the OpenAPI file and hands it to Swagger UI
  config/
    database.js             the Sequelize connection, one per environment
  middleware/               your own middleware (validation, authentication)
  routes/
    example-router.js       maps URLs onto controller functions
  controllers/
    example-controller.js   reads and validates the request, sends the response
  services/
    example-service.js      application logic, the only layer that uses models
  models/
    index.js                registry: imports models, declares associations
    example.js              one table
  docs/
    openapi.yaml            the API documentation Swagger UI serves
  tests/
    example.test.js         one test file per resource
db/                         the SQLite files (not in version control)
```

## The layers

A request travels through the application in one direction:

```
index.js -> middleware -> router -> controller -> service -> model -> database
```

Every layer has one job, and only ever calls the layer below it.

| Layer | Responsible for | Never contains |
| --- | --- | --- |
| `index.js` | Assembling and starting: which middleware, which routers, the error handler, connecting to the database and listening on a port. | Logic about a specific resource. |
| Middleware | Work that applies to many routes: parsing JSON, CORS, validation, authentication. | Anything specific to one endpoint. |
| Router | Mapping a URL and an HTTP method onto a controller function. | `req.body`, models, logic. |
| Controller | Reading the request, validating and converting user input, choosing the status code and the response. | Models, Sequelize queries, business rules. |
| Service | Application logic and every database call. | `req`, `res`, status codes, knowledge of HTTP. |
| Model | The definition of one table: columns, types, constraints. | Queries, logic. |

Two rules of thumb to check your own code:

- See `req` or `res` in a service? It belongs in the controller.
- See a model in a controller? It belongs in the service.
  The point of this split is not tidiness. A service that knows nothing about HTTP
  can be called from the seed script, from a scheduled job or from a test, and a
  controller that only translates between HTTP and a service is short enough to
  read in one go.

### Adding a new resource

Work bottom up, testing as you go:

1. `models/<name>.js` with the table definition: columns, types, constraints.
2. Import that model in `models/index.js`, and declare its relations to other
   models there as well (`hasMany`, `belongsTo`, and so on). Relations belong in
   this file and nowhere else: if two model files import each other to declare a
   relation, you get a circular import that fails at startup with a confusing
   error.
3. `services/<name>-service.js` with the functions that read and write data.
4. `controllers/<name>-controller.js` that validates input and calls the service.
5. `routes/<name>-router.js` that maps the URLs onto the controller.
6. Mount the router in `index.js`: `app.use('/<name>s', <name>Router);`
7. Describe the endpoints in `docs/openapi.yaml`.
8. Write tests in `tests/<name>.test.js`.

## API documentation

The documentation lives in `src/docs/openapi.yaml` and is served on `/api-docs`.
That file is the single source of truth: it is not generated from the code, so
you update it yourself when you add or change an endpoint.

Add a block under `paths` for every endpoint, and describe every object you send
or receive under `components/schemas` so you can reference it with `$ref` from
several places.

## Error handling

Throw an object with a `status` and a `message` anywhere in a controller or
service:

```js
throw { status: 404, message: `Example with id ${id} not found` };
```

The global error handler in `index.js` turns it into a JSON response of the shape
`{ "message": "..." }`. A failed model validation is translated into a 400 with
the offending fields; anything unexpected becomes a 500.

You do not need `try/catch` in your controllers: Express 5 forwards a rejected
promise to the error handler on its own.