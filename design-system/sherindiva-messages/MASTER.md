# Sherindiva Messages — Design system

Direction: an editorial portfolio inspired by iOS Messages. Content comes from the supplied portfolio PDF. UI UX Pro Max's verified second search supports a spacious hero, features, and CTA progression, monochrome neutrals with blue accents, and reduced-motion-safe interactions. The user's explicit iMessage direction overrides the suggested Swiss styling and web-font pairing.

- System font stack: SF Pro / -apple-system / BlinkMacSystemFont / Segoe UI.
- Canvas #f7f8fa; text #17191e; muted #636974; blue #0866e9; incoming bubble #eceef1.
- Floating navigation: translucent white, static backdrop blur, fine border, soft shadow.
- Layout: 1180px max width, 24px gutters, 96–120px section gaps. Hero splits editorial heading and interactive conversation.
- Motion: CSS opacity/transform for entry, press and reveal. Three.js glossy message objects for pointer response. Pause control and reduced-motion support. Avoid animating blur or layout.
- Content: real project screenshots, portrait, role and metrics from PDF. Retain dummy-data disclosures and distinguish financial projections from achieved results.
- Interaction: quick replies are curated portfolio navigation, not a live chatbot. Native dialog for project details; keyboard focus, Escape, click-outside dismissal. Contact via actual email and LinkedIn.

## Portrait hero revision
User reference replaces the split hero with a centered heading and transparent portrait. Four floating message bubbles represent verified skills: software engineering, financial operations, project management, and creative strategy. Use iMessage blue #007aff, incoming gray #e9e9eb, and white with a pale blue halo. Keep the conversation below the portrait. Skill bubbles link to relevant sections, animate only transform, and honor pause/reduced-motion settings.
