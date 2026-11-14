# exile-market.sylent.tools

The official download page of [Exile Market](https://github.com/sylent-dev/rust-exile-market), a desktop price checker for Path of Exile 2 items. A static site built with [Astro](https://astro.build/) and hosted on GitHub Pages.

The expected behavior is in [specs.md](specs.md), the progress in [roadmap.md](roadmap.md) and the way of working in [process.md](process.md).

This product isn't affiliated with or endorsed by Grinding Gear Games in any way.

## Requirements

- Node.js 24 or later (see `.nvmrc`), npm
- Python 3, for the skills (wireframes and mock-up server)
- Firefox, for the headless screenshots of the mock-up

## Development

```sh
npm run dev            # http://localhost:4321
npm run check          # format, lint, build, links and addresses, width on a phone
npm run brand:images   # favicon and preview card, from src/assets/brand/
```

Every command is described in [docs/technical-choices.md](docs/technical-choices.md#commands).

## Deployment

Every merge into `main` deploys the site to GitHub Pages (`.github/workflows/deploy.yml`). Until the launch, the site is built for its `github.io` address from the `SITE_URL` and `BASE_PATH` variables; at the launch, the custom domain is set in the Pages settings and the two variables are deleted (see [process.md](process.md#launch)).

## License

[MIT](LICENSE)
