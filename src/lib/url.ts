// Internal links go through this helper: until the launch, the site is also built under the base
// path of its github.io preview (docs/technical-choices.md, Deployment), and a link written
// without the base would lead to a 404 there.
import { routes } from "./i18n";

/** The path of a page of the site, with the base: `href(routes.legal.en)`. */
export const href = (path: string) =>
  `${import.meta.env.BASE_URL.replace(/\/$/, "")}${path}`;

const homes: string[] = Object.values(routes.home);

/**
 * The `aria-current` value of a navigation link: `page` on the page itself, `true` on a page
 * inside its section, nothing elsewhere. A home page is the section of no page, in any language.
 */
export const currentOf = (link: string, current: string) => {
  if (current === href(link)) return "page";
  if (!homes.includes(link) && current.startsWith(href(link))) return "true";
  return undefined;
};
