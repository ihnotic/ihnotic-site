# ihnotic.com Design Philosophy

## Purpose

This document defines the job of each major display area in the `ihnotic.com` Knowledge Graph Explorer mockup.

The site should not behave like a dashboard, IDE, or card collage. It should behave like a technical publication surface with persistent topic navigation and structured context. The center of the page is the primary reading surface. Everything else exists to support orientation, navigation, and cross-reference.

## Governing Principles

### Read first

The center of the layout should feel closer to a technical essay or research note than a workspace full of competing panels. The user should be able to land on one artifact and read it without decoding a control surface first.

### One job per area

Each display area should have one dominant responsibility. If an area starts performing two or three jobs, it becomes visual noise.

### Navigation is not content

The left rail should expose topic structure, not repeat article summaries or pitch the concept of the site. It is a map of topic areas, not a hero section.

### Context must earn its footprint

The right pane is allowed only if it provides persistent context that would be awkward or distracting inside the article flow. If it duplicates the center pane, it should be removed.

### State without fragmentation

The site can be stateful, but it should not feel fragmented into multiple apps or routes. Selection changes should update the reading surface and supporting context without turning the layout into a pane manager.

### Tone

Use precise technical language, dates, counts, labels, and terms. Avoid decorative adjectives and avoid UI copy that describes the design itself.

## Visual Hierarchy

The page should read in this order:

1. Center reading pane
2. Left topic rail
3. Right context pane, if retained
4. Top bar
5. Chronology strip

If the eye does not settle on the center pane first, the composition is wrong.

## Main Display Areas

### 1. Top Bar

**Primary goal**

Provide identity, orientation, and a thin layer of system state.

**What it should do**

- Confirm the site identity immediately.
- Stay thin enough that it does not become a header section.
- Hold minimal global state, such as route model or focus mode, if needed.
- Remain visually stable across topic changes.

**What it should not do**

- It should not become a second navigation system.
- It should not contain dense metadata, pills, or status strips.
- It should not compete with the center pane for attention.

**Design implication**

The top bar should feel like a quiet instrument label, not a hero.

### 2. Left Topic Rail

**Primary goal**

Act as the main topic navigation for the site.

**What it should do**

- Present the four major content domains clearly.
- Show which topic is active.
- Let the user switch topic areas without losing the sense of being on one page.
- Expose lightweight quantitative cues such as counts.
- Use the active topic color as a restrained but obvious state cue.

**What it should not do**

- It should not contain long descriptions under every item.
- It should not include thesis copy, manifesto copy, or hero-style framing.
- It should not try to summarize the currently selected article.
- It should not feel like a filter panel.

**Design implication**

The left rail should read as a table of contents for domains, not as a content block. Labels should be short, counts should be secondary, and the active item should be visible at a glance.

### 3. Center Reading Pane

**Primary goal**

Serve as the main reading surface for the currently selected artifact.

**What it should do**

- Behave like a technical blog or research note more than a dashboard.
- Hold the main title, introductory context, and the article body.
- Use metrics only when they sharpen the article, not as a KPI wall.
- Allow related artifacts to appear as references or a restrained adjacent list.
- Support long-form technical writing without feeling cramped.

**What it should not do**

- It should not fragment the active artifact into many equal-weight cards.
- It should not behave like a map viewport with layered floating panels.
- It should not repeat the same metadata already shown in the right pane.
- It should not feel like a dashboard center column.

**Design implication**

This is the most important area in the system. It should be mostly text, with strong typographic hierarchy, comfortable reading width, and a small number of supporting structures. If the page feels pane-driven instead of article-driven, the center pane has failed.

### 4. Right Context Pane

**Primary goal**

Provide optional persistent metadata while the user reads.

**What it should do**

- Surface facts that are useful to keep visible while reading.
- Show compact structured data such as metrics, active lane, or linked references.
- Stay scannable and quiet.
- Collapse gracefully or become optional at smaller widths.

**What it should not do**

- It should not carry the primary narrative.
- It should not duplicate the center pane headline, summary, and body in full.
- It should not become another independently interesting destination.
- It should not force the center pane narrower than a comfortable reading width.

**Decision rule**

Keep the right pane only if it solves a real persistence problem. Remove it if:

- the same information can sit inline near the top of the article,
- it repeats information already visible in the center pane,
- or it makes the page feel like three equal columns of activity.

**Current position**

The right pane is unresolved. Its existence is optional, not foundational.

### 5. Chronology Strip

**Primary goal**

Provide temporal orientation without becoming a second content surface.

**What it should do**

- Show how the current artifact sits in time.
- Offer low-emphasis cross-reference to adjacent milestones.
- Stay compact and easy to ignore when the user is focused on reading.

**What it should not do**

- It should not become a full timeline component with its own interaction model.
- It should not look like another dashboard row.
- It should not compete with the article body.

**Design implication**

This should feel like a footer annotation or supporting rail, not a content module of equal weight.

### 6. Background and Glow System

**Primary goal**

Provide atmosphere, topic identity, and soft orientation.

**What it should do**

- Use corner glows and subtle gradients to reinforce topic color language.
- Support the active topic state without overwhelming text legibility.
- Make the page feel engineered rather than flat.

**What it should not do**

- It should not create false panels.
- It should not be stronger than the typography.
- It should not turn the page into an illustration.

**Design implication**

Background treatment should support structure, not replace it.

## Area Relationships

### Left to center

The left rail chooses the domain. The center pane explains the selected artifact within that domain.

### Center to right

The center holds the narrative. The right pane, if present, holds only the facts worth pinning in view.

### Center to chronology

The center explains the current artifact. The chronology strip positions it in time.

## Anti-Goals

The design should explicitly avoid the following:

- Three equally loud columns.
- A dashboard made of many similarly weighted cards.
- Floating map-like layers in the primary reading area.
- Duplicated summaries across left, center, and right.
- Hero copy in the navigation rail.
- A right pane that exists only because layouts often have one.

## Practical Design Tests

Use these tests when evaluating future iterations:

### Top bar test

If removing the top bar improves the page dramatically, it is too heavy.

### Left rail test

If the left rail reads like content instead of navigation, it is doing too much.

### Center pane test

If the user cannot imagine reading 800 to 1500 words in the center pane, it is not article-first enough.

### Right pane test

If the right pane can disappear without loss of clarity, it should probably disappear.

### Timeline test

If the chronology strip draws attention before the article body, it is too strong.

## Immediate Direction

Based on the current mockup notes, the near-term direction should be:

- keep the top bar thin,
- keep the left rail as topic navigation only,
- push the center pane toward a text-first article surface,
- treat the right pane as provisional,
- and keep background glow expressive but peripheral.
