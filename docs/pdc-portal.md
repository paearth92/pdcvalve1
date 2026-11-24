# PDC customer and admin portals

The portals live in `paearth92/pdcvalve1`. The `pdc/customer-admin-portal` branch starts from the Vercel website’s `main` branch. Existing public URLs and marketing metadata are retained by the `app/(site)` route group.

## Architecture

| Area | Implementation |
| --- | --- |
| Customer | `/portal`, with sign-in, account dashboard, orders, estimates, shipments, invoices, notifications, and profile |
| Staff | `/admin`, with role-based access to customers, orders, shipments, finance, imports, and audits |
| Auth | Supabase email/password Auth, secure session cookies, controlled access, password recovery, and one-time invitations |
| Authorization | Server-side route and action checks plus PostgreSQL RLS. Company memberships control customer access and financial visibility. Staff permissions are assigned separately by role. |
| Records | Supabase migrations under `supabase/migrations/`. Quotes, sales orders, invoices, shipments, and events are distinct records. Composite foreign keys prevent cross-company associations. |
| Fulfillment | Shipment lines reconcile with order lines within a transaction. Pending and cancelled shipments are excluded from dispatched quantities. Order status and shipment reconciliation are separate. |
| Finance | Invoices and payments come from authorized source data. Balances are aggregated from the source’s outstanding invoice amounts by currency. |
| Documents | Private PDF bucket and authorization at download time. The customer’s record and visibility permissions determine whether the server can issue a short-lived download link. |
| Imports | Staged source mapping, validation, transactional apply, durable job history, and review of overlaps. See the [integration guide](portal-integrations.md) for supported formats and authority rules. |

## Local QA

Run `npm ci`, then `npm run typecheck`, `npm run test:portal:db`, `npm run test:portal:imports`, `npm run test:portal:e2e`, and `npm run build`.

The database suite runs in an isolated PostgreSQL engine with minimal test versions of the Supabase Auth and Storage tables. It exercises SQL permissions, constraints, and reconciliation. It does not exercise the hosted Auth or Storage services.

For the authenticated browser suite, run the Supabase CLI’s local stack with Docker. Use only the disposable project's URL and keys from `supabase status`. Set `PORTAL_QA_SUPABASE=true` and a test recovery secret, then run the same browser suite. Authenticated tests reject Supabase URLs other than the local loopback endpoint. The GitHub QA workflow also runs this suite on a disposable stack with synthetic users and orders. Password recovery uses local Mailpit, where outbound mail is captured without actual delivery.

## Vercel preview and release

1. Push the feature branch to GitHub. The linked `pdcvalve1` Vercel project builds the branch as a Preview.
2. Provision an isolated Supabase project in the authorized PDC account. Apply the tracked migrations to that project, and verify the schema and RLS with synthetic users before configuring Vercel.
3. Set the environment below on Vercel under **Preview** only. Keep the preview and its Supabase project separate from production. Use Vercel deployment protection or staff-only synthetic fixtures for previews.
4. Disable Supabase self-sign-up and anonymous authentication. Require email verification, set a minimum password length of 12, and restrict Auth redirect URLs to the exact PDC origins. Configure the recovery template from `supabase/templates/recovery.html`. Keep delivery disabled until PDC approves the sender and verifies SMTP.
5. Create the first verified staff Auth user through the chosen Supabase project’s administrator. The account owner can assign it the `super_admin` role in the portal staff table using the verified Auth user UUID. Limit this role to application owners.
6. Verify customer and staff access, order and shipment reconciliation, document isolation, Audit History, and disabled outbound email. Review failures in the Imports screen and the hosting logs.
7. Obtain PDC approval before releasing to the production URL, changing DNS, setting up paid services, importing sensitive records, or enabling customer email.

| Variable | Scope |
| --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Project REST/Auth URL |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Publishable key for that project |
| `SUPABASE_SECRET_KEY` | Server only. Used for invitation activation and document storage operations. |
| `PORTAL_SITE_URL` | Exact origin of the Vercel preview or production site. No path or trailing slash. |
| `PORTAL_SESSION_SECRET` | Server only. At least 32 random characters. Used to bind authorized password recovery to its session. |
| `PORTAL_EMAIL_ENABLED` | Defaults to false. Enable only after verified SMTP and release authorization. |

Keep keys in the host’s environment settings. Never commit deployment credentials, use production customer data in previews, or send reset or invitation links over an unapproved channel. Security defaults grant no access to newly created customers until their memberships are provisioned.

## Operating the admin portal

- **Customers**. Find or create a company, inspect its customer access, and only grant finance visibility to contacts approved to see balances and documents. Use the invitation screen to issue or revoke access. Share the one-time activation link through PDC’s approved channel. Deactivating a membership immediately blocks company data access through RLS.
- **Orders**. Review source records, add internal or customer-visible notes, and supply a reason for operational corrections. Protect an authorized override when it should take priority over automatic imports.
- **Shipments**. Add or correct a shipment and its quantities by order line. Record actual carrier information and dates. Cancel invalid shipments to retain their history and remove their quantities from dispatched totals.
- **Finance**. Compare invoice state and balances to the authoritative source. The portal does not accept payments.
- **Imports**. Configure a trusted source and preview a file before applying it. Resolve review items against the source and restage corrected data. Failed jobs retain their history.
- **Audit history**. Filter records by the available categories and review actor, timestamps, before/after values, and reasons for changes. Access follows the staff role’s permissions.

See [Supabase local development](https://supabase.com/docs/guides/local-development), [Supabase Auth email configuration](https://supabase.com/docs/guides/auth/auth-smtp), and [Vercel environments](https://vercel.com/docs/deployments/environments).
