# eInk Board public pages

Prepared for review. These pages are not deployed by this change.

## Intended URLs

The existing Astro site configuration declares `https://ihnotic.com` as the site origin.

| OAuth branding field | Intended public URL after deployment |
| --- | --- |
| Application home page | https://ihnotic.com/eink-board/ |
| Privacy Policy | https://ihnotic.com/eink-board/privacy/ |
| Terms of Service | https://ihnotic.com/eink-board/terms/ |
| Support contact | ihnotic@gmail.com |

The static files live in `public/eink-board/`. Astro copies them unchanged into the built site, so these pages require no JavaScript, account access, external fonts, analytics, or application runtime. They have their own scoped stylesheet and cross-links; the explorer's primary navigation is unchanged. The sample agenda is explicitly fictional.

## Review and publishing prerequisites

- This feature branch shares the existing committed Astro foundation from PR #4. The review PR targets `development` and must remain blocked until that prerequisite lands. Existing uncommitted explorer work is not part of this change.
- Review the public text, especially the broad Google permission versus selected-calendar retrieval, local unencrypted files, retention, and the distinction between local Disconnect and remote revocation.
- Approve and merge through the repository's normal workflow, then authorize deployment separately. This change does not merge, deploy, or change OAuth settings.
- Confirm the production hostname and its ownership verification. The current Wrangler configuration names a static-assets Worker but does not bind a custom domain in the repository; `site` metadata alone does not configure DNS or routing.
- After deployment, verify the exact HTTPS URLs above without authentication, including trailing-slash routing, CSS, mobile layout, and links. Only then use them in the Google OAuth branding settings.
- Public pages do not establish Google verification, guarantee approval, or guarantee refresh-token lifetime.

## Current hosting observation

On October 16, 2026, a normal certificate-verifying request to `https://ihnotic.com/` failed with `curl: (60) SSL certificate problem: self signed certificate`. The site could not be fetched through the web tool either. DNS resolved the apex to an address with Route 53 nameservers. No insecure TLS retry, DNS change, or deployment was attempted.

The current hostname cannot be used for OAuth branding until valid public HTTPS hosting is arranged. This is a separate prerequisite from merging PR #4. The next deployment task is to confirm ownership and the intended host, authorize the domain/route and certificate configuration, deploy the approved static assets, and verify all three public URLs before entering them into OAuth branding.

## Copy sources and limits

The access and storage descriptions were checked against the local application's Calendar connection, source/cache, highlight-store, and controller implementations on October 16, 2026. Disconnect clears local tokens and selection, but does not remotely revoke Google's grant or delete all cache files. Old snapshots stop being eligible for display when the connection identity changes; they may remain on disk until replaced or deleted. The application uses file permissions but does not itself encrypt its local data. The board receives rendered images rather than Google credentials. The current display firmware uses TLS without server-certificate verification; the public policy states this trusted-local-network limitation explicitly.

Reference material checked for the wording:

- [Google Calendar API scopes](https://developers.google.com/workspace/calendar/api/auth)
- [Google API Services User Data Policy](https://developers.google.com/terms/api-services-user-data-policy)
- [Google OAuth 2.0 policies](https://developers.google.com/identity/protocols/oauth2/policies)
- [Managing third-party Google Account connections](https://support.google.com/accounts/answer/13533235)

These are reviewable descriptions and personal-use terms, not a certification or legal assessment. Any future change to data use, storage, hosting, or sharing needs a corresponding policy review.
