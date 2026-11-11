# Jon's website review revisions

**Review dates:** November 10–11, 2026

**Repository:** `paearth92/pdcvalve1`

**Starting point:** `origin/main` at `94d6b680142b0946001c804ae437ca909a3e490b`

## Home page and navigation

- Removed the unsupported “300+ casting patterns” claim from the home page and header menu.
- Reworded the Oil & Gas feature card to describe process, combustion, and auxiliary-system flow control.
- Removed the ISO trust chip from the home-page hero while retaining the certification on the Quality & Compliance content.
- Adjusted industry-card drag handling so a normal click opens the selected industry page.

## Product pages and finder

- Expanded the Damper and Control Valves family page to list all seven series: Econotrol 09, Medium Duty 01, Excel 40, Flanged 39, Reduced Port 15, Combustion 22, and Thread End 07.
- Added the three reviewed Econotrol benefits and a Cv Values engineering table sourced from the published Series 09 data.
- Expanded the Medium Duty and Excel application lists and added the requested Product Finder application tags for those products.
- Updated the pneumatic actuator travel-stop wording to the reviewed 5-degree adjustment at both end positions.
- Replaced synthetic Flanged Series 39 gallery art with the provided front-with-lever and side-with-lever photographs.
- Added a request-to-Sales route for applicable IOM manuals where no manual file is present in the site assets; existing brochure downloads remain available.

## Company, contact, industry, and resources pages

- Reworked the About and Manufacturing pages around PDC's history, Sales-first application support, manual machining, assembly, and inspection, and removed the unsupported casting-pattern claim.
- Revised the Contact page to route general product and quotation inquiries through Sales, with Engineering support when additional technical review is needed.
- Updated Air Management and Petrochemical page copy, application cards, challenges, and product-solution sections to match the review notes.
- Updated the Manuals resources page with a Sales contact path and an Additional Documentation section.

## Request-for-quote form layout

- Expanded the form into a clearer multi-step layout with customer, application, product, operating-condition, connection, and project-detail fields.
- Added conditional shaft configuration details and included the expanded fields in the review step.
- Kept the completion screen neutral (“Request Details Ready”) with Sales contact options. It does not claim that an email was sent or show a “not submitted” warning. Email delivery configuration is deferred for a later pass as requested.

## EconoTrol history check

The reviewed `main` branch still contained the approved EconoTrol image and existing product specifications; no revert of those items was found. This pass adds the missing requested benefit copy and Cv Values table without changing the approved product cutout.

## Verification and deployment

- `npm run build` passed: TypeScript validation completed and all 52 static pages were generated.
- The build reports existing Browserslist data and Tailwind arbitrary-class ambiguity warnings; neither prevented compilation.
- No separate test suite was run.
- Production deployment status is reported separately once the Vercel publish is verified.
