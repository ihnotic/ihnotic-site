# Minimal Workers deployment and DNS plan

Prepared October 16, 2026. This change prepares the site; it does not merge, deploy, change DNS, or publish the Google app.

## Prepared target

- Worker: `ihnotic-site`, Cloudflare Workers Static Assets.
- Custom domain: `ihnotic.com` (all paths).
- Assets: only `public/`, containing the root placeholder, three eInk Board pages, and CSS.
- No Worker script, runtime secrets, database, analytics, or application build.
- `workers.dev` and version preview URLs disabled; this plan publishes only the specified custom domain.
- Directory index routes use trailing slashes; missing routes return 404.

## Current evidence and missing access

Public DNS on October 16 shows apex and `www` A records pointing to `34.219.146.73`, with authoritative TTL 300. Normal HTTPS verification at the apex fails with curl error 60 (self-signed certificate).

Current authoritative nameservers:

```text
ns-1208.awsdns-23.org
ns-1800.awsdns-33.co.uk
ns-455.awsdns-56.com
ns-690.awsdns-22.net
```

Bounded queries returned no apex MX, TXT, AAAA, or CAA records and no parent DS record. These queries are **not a full zone inventory** and do not establish the absence of subdomain mail, verification, or delegated records. Export the authoritative Route 53 zone before changing delegation.

Cloudflare dashboard access was confirmed in the intended personal account. Its unfiltered Domains overview contains no domains, so `ihnotic.com` must be added and has no assigned Cloudflare nameservers available yet. The Workers & Pages inventory has no existing `ihnotic-site` application, so the prepared name does not collide with an observed deployment. Wrangler CLI authentication remains pending. Registrar access and a complete Route 53 record export must also be confirmed before cutover. Do not guess account IDs, nameservers, certificate-validation records, or Google verification values. A Cloudflare DNS scan alone is insufficient.

## PR and release order

1. Review and merge the minimal-site feature PR into `development`; require green Repo Policy and Static Site checks.
2. Open the release PR from `development` to `main`. Verify it contains only the minimal site; merge after review and tag the release `release-YYYY-MM-DD` using the release date in America/Los_Angeles, with a numeric suffix if needed.
3. Close PR #11 as superseded after the pages land. Leave the explorer PR #4 open; it is not a deployment prerequisite.
4. Deploy the reviewed release commit on `main`, from a clean checkout. Do not deploy from the explorer branch or a dirty working directory.

## DNS and hosting change set

This uses Cloudflare's full-zone setup. Changing delegation affects every hostname in the zone, even though the Worker binds only the apex. Domain registration can stay with the current registrar.

| Item | Current | Planned |
| --- | --- | --- |
| Registrar nameserver delegation | Four Route 53 servers above | Exact nameservers assigned to this zone by Cloudflare, once confirmed |
| Apex web hosting | A record `34.219.146.73` | Cloudflare-managed Workers Custom Domain for `ihnotic.com` |
| `www` | A record `34.219.146.73` | Preserve as DNS-only during this scoped cutover; it is not a Google branding URL |
| Other DNS records | Full export pending | Preserve values, TTLs, and delegation semantics from the full export |
| Google ownership TXT | None observed at apex | Add only the exact value supplied by Search Console if needed |

Do not point a Route 53 CNAME at a `workers.dev` hostname. The prepared custom-domain configuration requires an active Cloudflare zone, and Cloudflare manages its routing DNS and certificate.

After deployment and DNS authorization:

1. Export Route 53 records and record the current registrar delegation and DNSSEC/DS state in private deployment evidence. Retain Route 53 for rollback.
2. Select the intended Cloudflare account and add/reuse `ihnotic.com`. Review any existing Worker named `ihnotic-site` and its deployments/routes before replacing it. Stop if the name belongs to an unrelated application.
3. Import/reconcile every required DNS record into Cloudflare. Exclude old provider apex SOA/NS records; preserve intentional subdomain delegations. Keep mail and other non-proxied services DNS-only. Initially retain the apex and `www` A records as DNS-only until the Worker cutover. Compare the complete record sets before proceeding.
4. Recheck parent DS. If DNSSEC has been enabled since preparation, arrange the documented DNSSEC migration before nameserver changes; do not change delegation under an incompatible DS record. No DS was observed during preparation.
5. Replace the registrar's four Route 53 nameservers with the exact Cloudflare-assigned nameservers. This is a registrar delegation change, not merely an NS edit inside Route 53. Verify Cloudflare reports the zone **Active** and public resolution is healthy.
6. Authenticate Wrangler and verify the intended account with `npx wrangler whoami`. Set `CLOUDFLARE_ACCOUNT_ID` to that verified account in the deployment environment. No credentials or account-specific exports belong in this public repository. To keep authentication in Codex, use `npx wrangler login --browser=false` and open its displayed authorization URL in the Codex in-app browser.
7. Run the commands below against the approved release. The live deploy creates/replaces the apex Workers Custom Domain according to `wrangler.jsonc`. Review Wrangler's proposed DNS conflicts before accepting; replace only the old apex web record, preserving `www` and all other records. If an existing apex CNAME prevents custom-domain creation, resolve only that confirmed conflict during the authorized cutover.
8. Wait for the custom-domain certificate to become active, then run public acceptance below. Keep the paths publicly accessible without Cloudflare Access or interactive challenges. If CAA or validation records block issuance, use the exact requirements Cloudflare displays.
9. Complete Google ownership verification and Branding separately. Record deployment version, release commit/tag, nameservers, final URLs, and acceptance evidence.

```sh
npm ci
npm run deploy:dry-run
# Live change: only after release review and deployment/DNS authorization.
npx wrangler deploy
```

A successful dry run validates packaging/configuration only; it does not validate Cloudflare access, nameservers, certificate issuance, or Google approval.

## Public acceptance

Use ordinary certificate verification. Do not use `curl -k` or click through a TLS warning.

```sh
curl --fail --show-error --head https://ihnotic.com/
curl --fail --show-error --head https://ihnotic.com/eink-board/
curl --fail --show-error --head https://ihnotic.com/eink-board/privacy/
curl --fail --show-error --head https://ihnotic.com/eink-board/terms/
curl --fail --show-error --head https://ihnotic.com/eink-board/styles.css
curl --show-error --head https://ihnotic.com/missing-page-check
```

Expect 200 for the five real resources, `text/html` for pages, CSS content type for the stylesheet, and 404 for the missing route. Confirm no-slash app URLs redirect to the corresponding trailing-slash pages. Check the rendered root and all three app pages in Codex's browser at desktop and narrow widths, including navigation, visible headings, no horizontal overflow, and keyboard focus. Verify the live body/canonical URLs match the approved assets, with no login or unrelated redirect. Confirm Google's three branding fields use the app-specific URLs in [the publishing checklist](eink-board-public-pages.md).

## Rollback

For an asset regression with an earlier approved Worker version, use Cloudflare's deployment rollback to that recorded version, then recheck all routes. A first deployment has no earlier Worker version to roll back to.

For a first-deployment or custom-domain failure, remove only the new apex custom-domain binding and restore the saved apex A record in Cloudflare. Keep the imported zone and other records intact. This restores the previous web target; it also restores its known HTTPS failure and is not OAuth acceptance.

If the DNS migration itself is faulty, restore the four saved Route 53 nameservers at the registrar while retaining both zones until caches converge. Reconcile DS/DNSSEC with the restored provider if it changed. Nameserver rollback is not immediate; delegation caches can outlast the 300-second A-record TTL. Do not delete the old zone or cancel the old hosting during cutover.

## References

- [Workers Custom Domains](https://developers.cloudflare.com/workers/configuration/routing/custom-domains/)
- [Cloudflare full-zone setup and DNSSEC migration](https://developers.cloudflare.com/dns/zone-setups/full-setup/setup/)
- [Workers static asset HTML routing](https://developers.cloudflare.com/workers/static-assets/routing/advanced/html-handling/)
- [Google OAuth Branding](https://support.google.com/cloud/answer/15549049?hl=en-uk)
