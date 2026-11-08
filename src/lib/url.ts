// Internal links go through this helper: until the launch, the site is also built under the base
// path of its github.io preview (docs/technical-choices.md, Deployment), and a link written
// without the base would lead to a 404 there.

/** The path of a page of the site, with the base: `href(routes.legal.en)`. */
export const href = (path: string) =>
  `${import.meta.env.BASE_URL.replace(/\/$/, "")}${path}`;
