# Fediwall — populus.social development notice

We love that Fediwall is open source. **This is populus.social's
development version of Fediwall.** We make this repository available to
you in line with the AGPL and our upstream-first development philosophy.

- **Source code and build instructions:** branch [`populus`](../../tree/populus)
- **Unmodified upstream mirror:** branch `upstream-main`, tracking
  [defnull/fediwall](https://github.com/defnull/fediwall)
- **Current deployed release:** tag `populus-2026.07.16`

## Populus Modifications

Development happens on the `populus` branch, released under
`populus-YYYY.MM.DD[-N]`-style tags. Here's what changed and when:

* **2026-06-21** — Added `showFooter` config option to independently toggle
  the footer's visibility (`abd1cd1`, `387b587`; a field-name bug in the
  related `showInfobar` option was fixed 2026-07-01, `8669710`).
* **2026-06-21** — Added `textLines` config to truncate long posts behind a
  "Read more" toggle (`dfc3235`).
* **2026-06-21** — Added `maxPosts` config to cap the wall to its top N
  posts (`81da811`, `2c84275`).
* **2026-06-21** — Fixed masonry relayout when expanding/collapsing a post
  (`a8397f0`, `ee20f58`).
* **2026-07-01** — Added `allowConfig` to structurally disable the settings
  dialog (`967de83`).
* **2026-07-16** — Forced `target="_blank" rel="noopener noreferrer"` on
  post-content links (mentions/hashtags/URLs) so clicking one opens a new
  tab instead of navigating away from the wall (`a54333a`).

Full history for these changes is on the `populus` branch of this
repository.

Licensed AGPL-3.0 — see [LICENSE](LICENSE).

*Notice created 2026-07-05.*
