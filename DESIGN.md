# Solar Nusantara - Design & Architecture

## Core Tech Stack
- **Framework**: [Astro 5](https://astro.build/)
- **Styling**: [UnoCSS](https://unocss.dev/) (High-performance atomic CSS)
- **Animations**: [GSAP](https://gsap.com/) & [Swiper](https://swiperjs.com/)
- **Type Safety**: TypeScript

## Project Structure

```text
src/
├── assets/             # Static assets (images, icons, etc.)
│   ├── images/         # Optimized images
│   └── icons/          # SVG icons
├── components/         # Reusable Astro components
│   ├── ui/             # Atomic components (buttons, cards)
│   ├── navigation/     # Header, Footer, NavDropdown
│   └── sections/       # Large page sections (Hero, News, etc.)
├── content/            # Markdown/MDX content collections
│   ├── berita/         # News articles
│   ├── layanan/        # Service descriptions
│   └── produk/         # Product details
├── data/               # Static data (navigation, config)
├── layouts/            # Global page layouts
└── pages/              # Routing (minimal logic, mostly using collections)
```

## Navigation Hierarchy

The navigation is managed via `src/data/navLinks.ts` and rendered recursively. 

### Principles:
1. **Recursion**: Support infinite nesting levels (though 3 levels is the UX limit).
2. **Persistence**: The menu stays functional and accessible.
3. **Responsiveness**: 
   - **Desktop**: Multi-level hover dropdowns with clear visual indicators.
   - **Mobile**: Accordion-style navigation with breadcrumb-like depth.

## Content Management (Proposed Improvement)

Currently, the project uses a mix of static `.md` files in `src/pages` and dynamic routing. To clean this up:

1. **Move Assets**: Page-specific images should move to `src/assets/images/pages/[category]/`.
2. **Content Collections**: Migrate informational Markdown files from `src/pages` to `src/content`. 
   - This allows for better validation, schema enforcement, and cleaner routing.
3. **Template-based Rendering**: Use a single dynamic route (e.g., `src/pages/[...slug].astro`) to render content from collections based on the navigation hierarchy.

## Design System

### Colors
- **Primary**: Blue-600 (Action, Focus)
- **Text**: Gray-700 (Body), Gray-900 (Headings)
- **Background**: White (Primary), Gray-50 (Secondary)

### Components
- **Navbar**: Sticky, scrolls into a compact pill shape.
- **Hero**: GSAP-powered transitions for high impact.
- **Cards**: Consistent shadow and hover lift effects.

---

*Last Updated: May 2026*
