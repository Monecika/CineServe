# Web Advanced client template

Starting point for the frontend of module 2.1 Web Advanced (Saxion ACT, HBO-ICT).

Vue 3 with the Composition API, Vue Router, Pinia and Tailwind CSS, bundled by
Vite. It pairs with the backend template: the API it talks to runs separately.

## Requirements

Node.js 22.18 or newer (24.12+ also works). The `engines` field in
`package.json` enforces this.

## Getting started

```bash
npm install
npm run dev
```

The app runs on <http://localhost:5173>. Start the backend in its own terminal,
otherwise the Examples page stays empty.

## Commands

| Command | What it does |
| --- | --- |
| `npm run dev` | Starts the Vite dev server with hot reload. Use this while developing. |
| `npm run build` | Builds an optimised production bundle into `dist/`. |
| `npm run preview` | Serves the built `dist/` locally, so you can check the production build. |
| `npm run lint` | Runs oxlint and ESLint over the project, fixing what can be fixed automatically. |
| `npm run format` | Formats everything in `src/` with oxfmt. |

## Project structure

```
src/
  main.js               entry point: creates the app, registers Pinia and the router
  App.vue               root component, renders the active route
  router/
    index.js            all routes, including the 404 catch-all
  layouts/
    DefaultLayout.vue   page frame with the navigation bar
    CenteredLayout.vue  bare frame that centres its content
  views/                one component per route
  components/           reusable components used by views
  composables/          reusable reactive logic (useSomething functions)
  stores/               Pinia stores for state shared across views
  utils/                plain helper functions, no Vue involved
  assets/
    main.css            imports Tailwind
```

Anything under `src/` can be imported with the `@` alias: `import HomeView from
'@/views/HomeView.vue'` works from any depth.

### Views, layouts and components

- A **view** is a component that belongs to one route. It fetches what the page
  needs and arranges components.
- A **layout** is the frame around a view: navigation, footer, page width. Routes
  are nested inside a layout in `router/index.js`, so a layout renders its view
  through its own `<RouterView />`.
- A **component** is a reusable building block that does not know which page it
  is on. It receives data through props and reports back with emits.

A view that is growing past a screen or two is usually hiding components.

## Routing

Routes live in `src/router/index.js`. Three things there are worth copying when
you add your own:

- Routes are nested under a layout, so the layout is not repeated in every view.
- Views other than the first one are imported lazily
  (`component: () => import('@/views/ExamplesView.vue')`), so they end up in a
  separate bundle that is only downloaded when the route is visited.
- The last route is a catch-all (`/:pathMatch(.*)*`) that renders the 404 page.
  Keep it last: routes are matched in order.

The "Not existing page" link in the navigation bar is deliberate: it demonstrates
that the catch-all works. Remove it once you build your own navigation.

## Talking to the backend

The API address is configured in `.env` in the project root:

```
VITE_API_BASE_URL=http://localhost:3000
```

Only variables starting with `VITE_` are exposed to the browser, and you read
them through `import.meta.env`. Never put a secret in one: everything in
`import.meta.env` ends up in the bundle that visitors download.

Frontend and backend run on different ports, which makes every request a
cross-origin request. That works because the backend sends CORS headers. Getting
a CORS error in the browser console usually means the backend is not running, or
its CORS settings do not allow your address.

## Styling

Tailwind CSS 4 is loaded through the Vite plugin. There is no `tailwind.config.js`
in this version: `src/assets/main.css` imports Tailwind, and configuration (custom
colours, fonts) happens in that CSS file with `@theme`.

Write utility classes directly in the template. If a set of classes repeats, that
is a signal to extract a component, not to write custom CSS.

## State

Small state belongs in the component that uses it (`ref`, `computed`). Use a
Pinia store in `src/stores/` only for state that several views genuinely share,
such as the logged-in user or a shopping basket. `stores/counter.js` is the
example store that ships with the template; delete it once you have your own.

## Linting and formatting

Three tools, each with its own job:

- **oxlint** catches the bulk of the problems and is fast. Configured in
  `.oxlintrc.json`.
- **ESLint** adds the rules oxlint does not have, in particular the Vue-specific
  ones. Configured in `eslint.config.js`.
- **oxfmt** does the formatting (2 spaces, single quotes, no semicolons), with
  `.editorconfig` and `.oxfmtrc.json` as its settings.

`npm run lint` runs both linters with `--fix`, so it rewrites your files. Commit
before running it if you want to be able to see what changed.

The ESLint config switches off its own rules wherever oxlint already covers them.
A consequence: an `// eslint-disable-next-line` for such a rule counts as unused
and is removed by `--fix`. Prefix a deliberately unused parameter with an
underscore instead.