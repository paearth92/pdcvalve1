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
- Updated the pneumatic actuator travel-stop wording to the reviewed ±5° adjustment at both end positions.
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

## Jon's second-pass edits (November 11, 2026)

- Replaced the “10 product lines” claims with “Integrated Actuation Packages” in the company and home capability summaries.
- Added Jon's four supplied product-family renders to the homepage catalog cards and scaled them to reduce top and bottom whitespace within the image frames.
- Removed the crossed-out 16-inch actuated Medium Duty render from the Medium Duty product-page gallery; retained the 4-inch black valve image.
- Revised Excel Series 40 and Flanged Series 39 application lists to match Jon's review notes.
- Added the Excel Series 40 brochure description and the requested Excel Series 40 IOM entry and description. No IOM PDF is present in the repository, so that row is informational and remains non-downloadable until an approved file is supplied.
- Removed CAD wording from the product Technical Downloads blurb.
- Updated the PDCQ and PDCS feature copy, consolidated Thread End Series 07 features to the four reviewed items, and corrected pneumatic travel stops to ±5°.
- Changed the Resources category cards to a 2×2 grid, removed the Certifications card, and removed document counts from all cards.
- Included the completed mobile bottom-navigation layout from the companion chat, including its refreshed glass treatment and active-tab state.

## Jon's follow-up edits (November 12, 2026)

- Replaced the Pneumatic Actuators family-card render with Jon's supplied PNG, which keeps all three actuator models inside the frame.
- Changed the Engineering Support fact strip to “Integrated Actuation Packages” and replaced the configuration, technical-support, and supported-technologies sections with Jon's supplied copy and lists.
- Updated the PDCS Visual Position Indicator description to “Standard visual indication of actuator position.”
- Confirmed the “10 product lines” wording had already been replaced with “Integrated Actuation Packages” in the previous pass.
- Created a separate photorealistic Damper & Control Valves lineup concept for review. It is not part of the website or deployment until approved.

## Verification and deployment

- `npm run build` passed after combining the review revisions, bottom-navigation work, and image-frame adjustment: TypeScript validation completed and all 52 static pages were generated.
- November 12 follow-up: `npm run build` passed after the content and actuator-family image updates; all 52 static pages were generated.
- The build reports existing Browserslist data and Tailwind arbitrary-class ambiguity warnings; neither prevented compilation.
- No separate test suite was run.
- Live verification of the November 11 production build found that only three Damper and Control Valve series were listed. This corrective merge preserves the November 11 main-branch updates and restores the curated seven-series family list.
