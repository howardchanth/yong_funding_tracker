---
name: Yong funding tracker
description: A paper-and-navy research ledger for comparing funding opportunities and their evidence.
colors:
  ink: "#0b1f29"
  navy: "#102f4a"
  paper: "#f5f3ec"
  wash: "#eef3f1"
  line: "#d6e0dd"
  teal: "#007a6c"
  teal-pale: "#d5f3eb"
  lime: "#d8f36f"
  muted: "#45606a"
  danger: "#a13535"
  warning: "#87590f"
  surface: "#ffffff"
  control-line: "#aabdb7"
  open-bg: "#e0f1e5"
  open-text: "#126845"
  upcoming-bg: "#e4eff7"
  upcoming-text: "#285d7c"
  watch-bg: "#fff1d7"
  closed-bg: "#fae5e1"
typography:
  display:
    fontFamily: "Georgia, serif"
    fontSize: "clamp(36px, 4.1vw, 56px)"
    fontWeight: 400
    lineHeight: 1.08
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "Avenir Next, Segoe UI, sans-serif"
    fontSize: "23px"
    fontWeight: 650
    lineHeight: 1.25
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Avenir Next, Segoe UI, sans-serif"
    fontSize: "16px"
    fontWeight: 650
    lineHeight: 1.4
  body:
    fontFamily: "Avenir Next, Segoe UI, sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Avenir Next, Segoe UI, sans-serif"
    fontSize: "12px"
    fontWeight: 600
rounded:
  control: "7px"
  panel: "14px"
  mobile-panel: "12px"
  notice: "9px"
  status: "5px"
spacing:
  compact: "12px"
  control: "14px"
  inset: "18px"
  section: "20px"
  roomy: "24px"
  panel: "30px"
components:
  button-primary:
    backgroundColor: "{colors.lime}"
    textColor: "{colors.navy}"
    rounded: "{rounded.control}"
    padding: "10px 14px"
  button-quiet:
    backgroundColor: "transparent"
    textColor: "{colors.navy}"
    rounded: "{rounded.control}"
    padding: "10px 14px"
  input:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "9px 12px"
  status-open:
    backgroundColor: "{colors.open-bg}"
    textColor: "{colors.open-text}"
    rounded: "{rounded.status}"
    padding: "4px 8px"
  status-upcoming:
    backgroundColor: "{colors.upcoming-bg}"
    textColor: "{colors.upcoming-text}"
    rounded: "{rounded.status}"
    padding: "4px 8px"
  status-watch:
    backgroundColor: "{colors.watch-bg}"
    textColor: "{colors.warning}"
    rounded: "{rounded.status}"
    padding: "4px 8px"
  status-closed:
    backgroundColor: "{colors.closed-bg}"
    textColor: "{colors.danger}"
    rounded: "{rounded.status}"
    padding: "4px 8px"
  opportunity-title:
    textColor: "{colors.navy}"
    typography: "{typography.title}"
    backgroundColor: "transparent"
  overview:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.panel}"
    padding: "22px 8px"
  evidence:
    backgroundColor: "{colors.wash}"
    padding: "26px 30px"
---

# Design System: Yong funding tracker

## Overview

**Creative North Star: "The research ledger"**

The research ledger translates the established Ividence paper, navy, and teal identity into a compact workspace for comparing opportunities. Editorial Georgia headings give the page its character; the Avenir Next / Segoe UI interface carries the dense evidence and controls.

White records and pale wash panels sit on warm paper. Thin dividers organize the information, while navy anchors the page and teal marks links. Information expands in place so the shortlist remains the point of reference.

**Key Characteristics:**

- Warm paper with navy structure and restrained teal links.
- Compact records with progressively disclosed evidence.
- Tabular numbers for ranks, dates, counts, and scores.
- Stacked mobile records with full-width evidence.

## Colors

A warm neutral ground supports cool navy structure, clear teal links, and sparing lime accents.

### Primary

- **Navy:** masthead, footer, editorial headings, opportunity titles, scores, and summary counts.
- **Teal:** links, focus outlines, ranking weights, and rank movement text.
- **Pale teal:** rank badge surface.

### Secondary

- **Lime:** primary action surfaces, text selection, and the masthead symbol.
- **Availability colors:** green for open, blue for upcoming, amber for watch, and red for closed. Their pale backgrounds accompany explicit written labels; green, amber, and red text also distinguish changes.

### Neutral

- **Paper:** page canvas.
- **Surface:** white records, controls, and summary panel.
- **Wash:** toolbar, expanded evidence, and baseline notice.
- **Ink:** primary reading text.
- **Muted:** secondary descriptions, labels, explanatory notes, and metadata.
- **Line / control line:** thin surface dividers and stronger input boundaries.

**The Evidence in Place Rule.** Keep expanded evidence attached to its opportunity and visually subordinate through the wash surface.

## Typography

**Display Font:** Georgia, with serif fallback.  
**Body Font:** Avenir Next, then Segoe UI, then sans-serif.

**Character:** The serif is an editorial accent above a practical sans-serif information system. Numbers use tabular figures where comparisons or alignment matter.

### Hierarchy

- **Display:** the responsive Georgia page heading; its fluid size is recorded in the frontmatter.
- **Headline:** sans-serif section headings. The methodology introduction returns to Georgia at (32px), becoming (29px) on mobile.
- **Title:** underlined opportunity disclosure titles. Detail headings use (18px), reducing to (16px) on mobile.
- **Body:** common supporting prose at (14px); introduction copy uses (16px), evidence prose (13px). Paragraphs cap at (72ch); record concepts cap at (65ch).
- **Label:** control labels at (12px). Status and table labels use (11px); secondary score denominators use (10px). These small sizes serve compact metadata, not primary reading text.

**The Editorial Accent Rule.** Use Georgia for editorial headings; use the interface sans stack for controls, records, labels, and data.

## Layout

The main page is centered with a maximum width of (1400px) and horizontal padding of (32px). The introduction pairs editorial copy with a review stamp. The summary is a four-column band. The desktop funding surface joins its wash toolbar to a white six-column table, with a wide opportunity column and compact numeric columns.

The repeated spacing vocabulary is compact and varied rather than a strict mathematical scale. Controls use modest insets; records have (21px 18px) cell padding; evidence expands with more room. Larger vertical gaps and full-width rules separate the changes and methodology sections.

At (1080px) and below, the toolbar wraps and search occupies its own full row. At (760px) and below, the page inset becomes (20px), the masthead navigation moves beneath the brand, the summary becomes two columns, and each opportunity becomes a white stacked record. Title and concept span the record; date and score share one row, with availability and change beneath. Rank sits at the upper right. The table header is hidden.

Mobile evidence retains the full record width, with a single-column detail grid and stacked footer. Changes and methodology also become single-column sections. At (1600px) and above, the introductory top spacing increases.

## Elevation & Depth

The built system uses no box shadows. Depth comes from navy framing, white records, wash evidence panels, and single-pixel dividers. Expanded evidence stays visually attached to its originating row.

**The Divider First Rule.** Separate records and sections with thin strokes and surface tones rather than shadows.

## Shapes

Controls have modest rounded corners; panels are more softly rounded. Desktop toolbar and table corners form one enclosing surface. Mobile opportunity records have their own panel corners, and evidence has rounded lower corners. Status labels are compact rounded rectangles, while rank badges use a slightly larger corner radius of (6px).

Use the existing inline SVG vocabulary for search, the masthead chart, and external-link arrows. The symbols use thin strokes and inherit their contextual color.

## Components

### Buttons

Primary actions use lime with navy text and darken on hover. Quiet actions use a transparent surface with the stronger control border and a pale green hover fill. Both keep their compact padding and control radius. Quiet actions have a minimum height of (43px). Disabled buttons show reduced opacity and a waiting cursor.

All keyboard-focusable controls use the shared teal outline of (3px) with a (3px) offset. Opportunity titles are underlined, borderless disclosure buttons; hovering changes the title to teal without filling its background.

### Inputs / Fields

White search and native select controls use the stronger neutral border, control radius, and a minimum height of (43px). Labels remain visible above controls. Search reserves room for its inline SVG; placeholder text uses muted ink. The toolbar wraps without compressing search into a narrow fragment.

### Navigation

The navy masthead carries light text links in a horizontal group. Links underline on hover and retain the shared keyboard focus treatment. On mobile the links sit below the brand. In-page navigation uses smooth scrolling unless reduced motion is requested.

### Chips

Availability tags use pale semantic backgrounds with darker matching text and written status. They are descriptive labels, not filter buttons. Rank badges use pale teal and tabular numbers; unranked records show a muted dash with an accessible label.

### Cards / Containers

The overview is a single white panel with internal dividers, not four independent floating cards. Notices use pale surfaces and modest rounded corners. The baseline panel describes the first comparison point without giving existing opportunities a new-call visual treatment.

### Opportunity and evidence

The opportunity title toggles an attached evidence region and reports its expanded state. Focus returns to the title after opening or closing. The detail region carries an official call link, labeled assessment sections, requirements, dates, score factors, verification limits, and review metadata. Desktop evidence is a two-column grid; mobile evidence is full width and one column.

Disclosure uses a brief (220ms) clipped reveal with a decelerating curve. Reduced motion removes this animation. Ranking and review metadata remain text, supporting comparison without decorative charts.

### Loading, empty, and change states

Loading and failure messages appear in the notice surface; a failed load offers a primary retry action. An empty filtered result offers a clear-filter action. Change records use thin horizontal dividers and explicit previous/current values, while the first review displays a baseline explanation.

## Do's and Don'ts

### Do:

- **Do** keep opportunity titles operable as disclosure buttons with visible focus and expanded state.
- **Do** pair every availability color with its written status.
- **Do** preserve tabular numerals for aligned ranks, dates, scores, and summary counts.
- **Do** keep mobile evidence full width and stack its sections into one column.
- **Do** label the initial comparison as a baseline and preserve the distinction between official evidence and research assessments.
- **Do** disable disclosure animation and smooth scrolling when reduced motion is requested.

### Don't:

- **Don't** use status color alone to convey availability or change.
- **Don't** turn every record into a floating card on desktop; keep the compact, divided table.
- **Don't** replace the established SVG symbols with text glyph icons.
- **Don't** apply the editorial heading face to controls or dense evidence.

