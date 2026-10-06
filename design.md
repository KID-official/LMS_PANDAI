# V.2 — Agent Builder Design Guide

## Objective

Apply the V.2 visual style to the existing agent builder.
Preserve its functionality, terminology, data, and workflows.

Use the reference's visual language—not its LMS content,
pricing annotations, or canvas decorations.

## Visual Direction

Light, compact, violet-accented workspace with:
- Near-white lavender canvas.
- White navigation, cards, and editor surfaces.
- Navy headings and dark-gray body text.
- Pale lavender inputs and grouped settings.
- Violet primary actions and active selection.
- Teal success states and red destructive actions.
- Small rounded rectangles and restrained shadows.

Avoid dark dashboard styling, oversized pill controls,
heavy borders, and decorative gradients across the editor.

## Color Tokens

| Token | Value | Usage |
| --- | --- | --- |
| background | #F9F9FF | Application canvas |
| surface | #FFFFFF | Navigation, cards, forms |
| surface-soft | #F0F3FF | Inputs and inset groups |
| surface-blue | #E7EEFF | Supporting panels |
| surface-info | #DFE8FF | Information chips |
| text-heading | #061B38 | Titles and important values |
| text-body | #494455 | Body text and ordinary icons |
| text-muted | #7A7486 | Secondary descriptions |
| primary | #7F54F8 | Primary buttons, active navigation |
| primary-ink | #6636DE | Links, accent labels, icons |
| primary-strong | #5010C8 | Strong violet emphasis |
| primary-soft | #E8DEFF | Violet chips and icon tiles |
| primary-on-soft | #20005F | Text on pale violet |
| on-primary | #FFFCFF | Text on filled violet |
| outline | #CAC3D8 | Subtle boundaries |
| success | #00685F | Success text and icons |
| success-fill | #008378 | Enabled toggles |
| success-soft | #89F5E7 | Success chips |
| success-on-soft | #00201D | Text on pale teal |
| info | #3A4BD4 | Informational accents |
| info-soft | #DFE0FF | Information containers |
| info-on-soft | #000A63 | Text on information containers |
| danger | #BA1A1A | Errors and destructive actions |
| danger-soft | #FFDAD6 | Error containers |
| danger-on-soft | #93000A | Text on error containers |
| warning | #B45309 | Warning emphasis |

These are proposed semantic names for observed V.2 colors,
not an existing published token library.

## Typography

Primary font: Plus Jakarta Sans.
Weights: 400, 500, 600, 700.

| Role | Size / Line Height | Weight |
| --- | --- | --- |
| Large title / metric | 30px / 38px | 700 |
| Editor page title | 22px / 28px | 700 |
| Section heading | 18px / 24px | 600 |
| Card title | 15px / 20px | 600–700 |
| Button / navigation | 13px / 18px | 600 |
| Body | 13px / 19px | 400 |
| Extended instructions | 13px / 21px | 400 |
| Compact metadata | 12px / 16px | 400–600 |
| Badge / eyebrow | 11px / 14px | 600–700 |

Use slightly negative letter spacing for large headings.
Use approximately 0.22px tracking for badges and 0.55px
for small uppercase section labels.

Use Liberation Mono, 12px / 16px, for identifiers and
structured values where needed.

## Desktop Layout

Observed reference dimensions:
- Reference viewport: 1280px wide—not a fixed app width.
- Application sidebar: 288px.
- Utility header: 64px in the Course Builder reference.
- Main horizontal inset: 24–28px.
- Sidebar outer padding: 16px.
- Editor list/form split: roughly one-third / two-thirds.
- Local editor column gap: 16px.
- Management card grid gap: approximately 24px.

Page structure:
1. Application navigation.
2. Utility header.
3. Breadcrumb or contextual eyebrow.
4. Page title, description, status, and actions.
5. Local item list and active editor.
6. Clearly separated save/reset action area.

## Agent Builder Adaptation

- Keep global navigation separate from the agent or step list.
- Put agent identity and status in the page header.
- Use existing Preview/Test and Save/Publish actions.
- Use the local list for agents, steps, or configuration sections.
- Use the larger column for the active editor.
- Group general settings, instructions, tools, knowledge,
  and output settings only where these features already exist.
- Keep preview/test output in a distinct labeled surface.
- Do not squeeze the editor to accommodate a third panel.
- Separate destructive actions from saving.

Do not invent functionality to match the reference.

## Spacing

Base scale: 4, 8, 12, 16, 24, 28, 32px.

- Icon-label gap: 4–8px.
- Label/helper gap: 4–8px.
- Field-group gap: 12–16px.
- Card padding: 16–24px.
- Main form padding: 24px.
- Major section spacing: 24–32px.

## Corners and Elevation

Corner radii:
- 4px: inputs, compact chips, utility controls.
- 8px: primary buttons, cards, selected list items.
- 12px: supporting containers and icon tiles.
- 16px: occasional larger supporting surfaces.
- 20px: dialogs similar to the correction-dialog references.

Dominant radii: 4, 8, 12px.

Shadow values:
- Subtle: 0 1px 2px rgba(0,0,0,0.05).
- Shell: 0 1px 8px rgba(0,0,0,0.04).
- Raised: 0 2px 4px -2px rgba(0,0,0,0.10),
          0 4px 6px -1px rgba(0,0,0,0.10).

Keep editor cards opaque.
Use translucent white and background blur sparingly
for utility headers or sticky action surfaces.

## Components

### Buttons
- Primary: violet fill, near-white text, 8px radius.
- Observed primary heights: 34–40px.
- Recommended desktop default: 40px.
- Horizontal padding: 16px; prominent creation actions: 24px.
- Secondary: white or lavender fill, dark/violet text.
- Destructive: red text/icon on a quiet surface.
- One clear primary action per group.

### Navigation
- Active global item: violet fill, white text/icon.
- Inactive item: white surface, dark-gray text/icon.
- Selected local item: white card with violet emphasis.
- Include text labels for meaningful states.

### Forms
- Labels above fields.
- Common input height: 40px.
- Input radius: 4px.
- Inner horizontal padding: 12–16px.
- Lavender fields on white forms.
- White fields inside pale grouped panels.
- Show validation beside the relevant field.
- Use generous multiline instruction areas.

### Cards
- White working surface, 8px radius.
- Padding: 16–24px.
- Pale inset groups for related settings.
- Small violet icon plus short heading.
- Expanded editing card with concise collapsed summaries.
- Dashed violet boundaries only for add-new placeholders.

### Status
- Enabled/success: teal.
- Draft/inactive: subdued lavender/gray with explicit label.
- Error: red with pale-red supporting surface.
- Observed toggle size: approximately 44 × 24px.
- Progress: slim track with numeric/text summary.

## Responsive Recommendations

These are implementation recommendations, not verified
responsive behaviors from the desktop references.

- Collapse global navigation when space becomes limited.
- Stack the local list and editor on narrow layouts.
- Allow page actions to wrap.
- Keep long content contained and readable.
- Prevent sticky actions from covering content.
- Give touch controls at least 44 × 44px hit areas.
- Keep dense tables horizontally scrollable within their region.

## Accessibility and Interaction

- Normal text contrast: at least 4.5:1.
- Large text contrast: at least 3:1.
- Check muted text and bright violet/teal pairings.
- Prioritize accessibility over literal color matching.
- Provide visible keyboard focus.
- Label icon-only controls.
- Associate helper text and errors with fields.
- Do not communicate state through color alone.
- Preserve unsaved input during validation.
- Distinguish unsaved, saving, saved, and failed states.

Hover, focus, loading, and save behavior are requirements
for implementation—not interactions verified in Figma.

## Acceptance Checklist

- [ ] Existing functionality and terminology are preserved.
- [ ] Typography, palette, spacing, and density follow V.2.
- [ ] Global navigation and local selection are distinct.
- [ ] Repeated components use shared semantic tokens.
- [ ] Forms and long instructions remain readable.
- [ ] Primary, success, and destructive actions are consistent.
- [ ] No LMS content or pricing annotations were copied.
- [ ] Save actions do not obscure content.
- [ ] Responsive layouts and overflow are checked.
- [ ] Contrast, focus, labels, and keyboard access are checked.
