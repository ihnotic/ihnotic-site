# eInk Board public pages

## Google branding URLs

| Field | URL |
| --- | --- |
| Application home page | https://ihnotic.com/eink-board/ |
| Privacy Policy | https://ihnotic.com/eink-board/privacy/ |
| Terms of Service | https://ihnotic.com/eink-board/terms/ |
| Authorized domain | `ihnotic.com` |

The root site is a placeholder. Use the app-specific homepage above for Google branding: it identifies eInk Board, explains its functionality and read-only Calendar access, and links to its Privacy Policy. An empty page would not meet Google's published homepage requirements.

## Integration

The three HTML files and shared CSS originated in commit `5fb5e49f6e50f55ae40fb086bd675044b3b13805` in PR #11. Public contact details were subsequently removed in issue #15. The pages have no dependency on Astro, React, Tailwind, or the explorer in PR #4. The minimal site branch starts from `development` and adds only the static assets and deployment tooling.

PR #11 currently includes PR #4 in its ancestry. Merge the minimal-site PR through `development` and then a `development` → `main` release PR. After the minimal site lands, close #11 as superseded rather than merging its explorer ancestry. Leave #4 open for the future site, and reconcile its package files, README, AGENTS.md, and Wrangler configuration before integrating it. Preserve these three routes during that work.

## Acceptance before Google publishing

- Follow [deployment.md](deployment.md) to activate the Cloudflare zone, bind the Worker, and validate HTTPS.
- Confirm all three URLs return the expected content without login, challenges, or certificate warnings. Check the shared stylesheet, navigation, and desktop/narrow layout.
- Verify domain ownership in Search Console with an account that is an owner or editor of the Google Cloud project. Use the exact verification value Google supplies; do not invent or reuse a token from another property.
- Enter the three URLs and authorized domain in Google Auth Platform Branding. Confirm Google's actual publishing state afterward; website deployment alone does not prove approval or guarantee token lifetime.

## Content provenance

The page text was checked against the local connection, cache, highlights, controller, and firmware implementations on October 16, 2026. Google permissions cover accessible calendars broadly; the app fetches events only from the selected calendar. Tokens and cached events stay on the Mac, and the display receives rendered images. Local Disconnect is distinct from Google's grant revocation and does not erase every cache, backup, or displayed image. The current display firmware does not validate the server certificate; the Privacy Policy discloses this trusted-LAN limitation.

The static site has no account connection, analytics, external fonts, or scripts. Illustration events are explicitly fictional. Future changes to the application's handling of user data require corresponding policy updates.

## References

- [Google OAuth branding requirements](https://support.google.com/cloud/answer/15549049?hl=en-uk)
- [Google Calendar API scopes](https://developers.google.com/workspace/calendar/api/auth)
- [Google API Services User Data Policy](https://developers.google.com/terms/api-services-user-data-policy)
- [Google OAuth policies](https://developers.google.com/identity/protocols/oauth2/policies)
