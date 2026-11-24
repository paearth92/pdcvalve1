# PDC portal imports and ERP intake

## Operational spreadsheet imports

Staff with integration management permissions can open `/admin/imports`, save a source, and map its first-row headers to the portal fields. A source can use UTF-8 CSV or XLSX. Enter the worksheet name if it is not the first sheet.

- Map the customer account number, sales order number, and the source record's UTC update timestamp. Keep identifiers and timestamps as text. Use a timestamp such as `2026-11-24T15:00:00Z` derived from the approved source's own modification record, not the upload time.
- Map at least one of production status, estimated ship date, or estimated delivery date. The supported statuses are Confirmed, In Production, Production Completed, and Ready to Ship. Use ISO dates (`YYYY-MM-DD`) or date-only Excel cells for estimates.
- Use 500 or fewer data rows, up to 64 columns, and a file under 768 KiB. Replace formulas with values. Leading zeroes are significant. Blank optional cells leave their fields untouched.
- Check the account and order match and each proposed change in the preview. Apply the reviewed batch within 24 hours using the same staff account. Until then, the import makes no customer data changes.
- Inspect job history and open conflicts. Correct the file and stage it again, or have an employee with order permissions correct the record with a reason. Recording a review resolution does not apply the rejected values.

An account number and sales order number must match one active account and an existing order. These imports never create commercial records or change financial, shipment, or customer identity fields. They can move a production status forward but cannot publish shipment or delivery statuses. An existing forecast must match the first import before the source can own it. Each accepted field retains its source and source timestamp. A different source, a stale revision, changed values at the same timestamp, a protected override, or an intervening portal/ERP correction requires review. Exact replays are no-ops. All changes apply together or roll back together. An unexpected database failure leaves a retryable job. Staff can retry it without uploading the file again if the source and preview are still current.

The portal retains normalized fields and batch history for staff troubleshooting. It does not retain the uploaded file. Source changes and conflict resolutions appear in audit history. Import jobs do not send customer emails.

### Scheduled spreadsheet fallback

After one manually reviewed batch applies successfully, a staff member can approve scheduling for that exact mapping. Changing the mapping requires another reviewed import before scheduling can be enabled. The worker can read an approved file on a machine PDC controls, including an approved shared folder mounted on that machine. Use an atomic file replacement in the upstream export process so the worker reads a completed file.

Schedule the Node 22 command through PDC's approved job runner:

```text
node scripts/portal-import.mjs <path-to-approved-export.csv-or-xlsx>
```

Create a dedicated confirmed Auth user with the `integration_operator` role. Use the worker's secret store for `PORTAL_IMPORT_USER_EMAIL` and `PORTAL_IMPORT_USER_PASSWORD`. Set `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`, and `PORTAL_IMPORT_SOURCE_ID` (the selected source's UUID from its Imports page URL). The worker uses normal authenticated policies, not a service-role key. It retries transient read and apply failures with backoff. A staging request is not automatically repeated after an ambiguous network response. Check the job history and use the worker's nonzero exit status for operational alerting.

The worker is implemented. Its schedule, credential, and file location must be provided by PDC. The discovery search did not establish the authoritative PDC workbook or its actual columns.

## Sage assessment and normalized order exports

Possible Sage 300 interfaces depend on the installed edition, version, environments, and modules. Sage documents a [Web API and SDK](https://help.sage300.com/en-us/2025/web/Content/GettingStarted/FAQ.htm), [Web Screens deployment prerequisites](https://help.sage300.com/en-us/2025/web/Content/Installation/InstallingWebScreens.htm), and [module-specific authorizations](https://help.sage300.com/en-us/2025/classic/Content/Operations/Order_Entry/Setup/OrderEntrySecurityAuthorizations.htm). Sage also documents [O/E exports](https://help.sage300.com/en-us/2024/classic/Content/Operations/Order_Entry/Transactions/AboutImportingAndExportingOrdersAndInvoices.htm), [A/R exports](https://help.sage300.com/en-us/2023/classic/Subsystems/AR/Content/ImportExport/Exporting_AR_Data.htm), and [Excel exports from Inquiry](https://help.sage300.com/en-us/2025/web/Content/SearchInquiry/AboutInquiryTool.htm).

No installed Sage product or endpoint was verified, and no Sage credentials or production data were accessed. There is no live Sage connector or real-time synchronization. The portal implements a provider-neutral, staged order and line item intake that an approved adapter or export workflow can use once PDC's system is identified. The staged path does not sync Sage customers, quotes, invoices, payments, balances, or shipments.

### Order intake operating steps

1. Review the authoritative source and sample export in an isolated environment. Document how the export identifies the source company, account, order, individual order lines, and source modification time. Confirm which posted/historical transactions remain available.
2. Verify the account crosswalk with PDC before associating its external account number with a portal organization. Only recognized active accounts can receive orders.
3. A super administrator approves the stable source key, exact mapping revision, and approval reference at `/admin/imports/erp`. Keep accounts from different Sage companies in distinct namespaces. Revoke a source by saving it as disabled under the same key.
4. Produce a normalized JSON batch using the approved adapter. Upload and preview it with an authorized integration account, then apply the staged batch using the same account. A change to source approval invalidates any unapplied batch.
5. Review any recorded exceptions. Missing or changed line identities, stale updates, customer mismatches, and quantity changes that contradict fulfillment are rejected for correction. The intake does not remove records based on absence from an export.

This envelope contains only test data and documents the portal's normalized contract. These field names are not Sage field names.

```json
{
  "source_key": "pdc-synthetic",
  "mapping_revision": "reviewed-v1",
  "orders": [{
    "external_id": "fixture-order-001",
    "account_number": "00987",
    "order_number": "FIXTURE-001",
    "customer_po": "TEST-PO",
    "order_date": "2026-10-30",
    "updated_at": "2026-10-30T15:00:00Z",
    "lines": [{
      "external_id": "fixture-line-01",
      "line_number": 1,
      "sku": "TEST-VALVE",
      "description": "Synthetic test valve",
      "quantity": "100.0000"
    }]
  }]
}
```

Batches support 1 to 100 orders and up to 100 lines per order within the 350 KiB upload limit. Send complete order line snapshots within incremental order batches, stable string IDs, UTC modification timestamps, and exact decimal quantities. Portal order status, forecasts, shipment quantities, and protected corrections retain their existing ownership. Apply is atomic and repeated identical exports do not create additional orders or lines.

### Required access to complete a live connection

- Sage product, edition, version/build, deployment model, enabled modules, and the internal owner who approves access.
- A secure staging endpoint or export location, a non-production service identity with read-only access, and documentation for the installed instance's supported interface. For a Web API, confirm routes and available records in that instance's API specification over the approved private network. For files, confirm the approved export template and secure delivery mechanism.
- Synthetic or redacted samples with field names, stable IDs, a timezone and modification-watermark definition, pagination behavior, and examples of corrections and historical records. Record the approved field ownership by entity.
- The authoritative spreadsheet owner, location, worksheet/headers, update cadence, and a redacted example. If it is a Google Sheet, verify whether an approved export can feed the worker or whether a separate grant is needed.

Keep Sage credentials on the approved network worker. Confirm the least privilege needed for reads. Sage's documented permissions vary by module and may include write verbs, so verify the account's actual restrictions and use a read-only integration surface. The source remains passive in production until PDC authorizes the mapping, credentials, and data destination.

## Verification

Run the synthetic parser suite with `node --test tests/portal-imports.test.mjs` and the database suite with `npm run test:portal:db`. The integration tests exercise real PostgreSQL behavior using an isolated PGlite database and Supabase role shims. Hosted Supabase, a deployed worker, and an actual Sage instance require separate verification after configuration.
