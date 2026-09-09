# Yong Chen funding tracker

[Open the funding tracker](https://howardchanth.github.io/yong_funding_tracker/)

A small, read-only funding dashboard for Yong Chen and PennCIL. It includes ranked research opportunities, official sponsor links, eligibility and budget conditions, date distinctions, and changes since the previous review. The interface follows the paper, navy and teal design of the Ividence funding dashboard.

## Source of record

The maintained Excel workbook, `Yong_Funding_Tracker.xlsx`, is the database. A local exporter reads its Opportunities, Details, Changes and Guide sheets and writes `data/funding.json`. The JSON includes the workbook SHA-256 checksum so a published version can be checked against the actual workbook. Research staging JSON is not used directly by the webpage.

Only public opportunity fields are exported. Owner, Decision, Internal due and User notes are deliberately omitted. The workbook and local research archive are not stored in this public repository.

## Updates

The existing local Codex task runs every other Tuesday at 9:00 a.m. America/New_York. It checks official sponsor evidence, updates the workbook and ranking, exports the public dataset, commits changes here, and verifies the live GitHub Pages dataset. Local scheduled work requires the computer and Codex app to be running. The site displays the research review date and warns when its snapshot is more than 14 days old.

GitHub Pages publishes the root of the `main` branch. No build step, credentials, paid service, or backend is needed for visitors. Serve this directory over HTTP to preview it; opening index.html directly will not allow the data fetch in most browsers.

Scores are prioritization judgments, not funding probabilities. Open and upcoming calls are ranked separately. An initial baseline is not a claim that all calls are new. The tracker does not represent submitted or pending applications.
