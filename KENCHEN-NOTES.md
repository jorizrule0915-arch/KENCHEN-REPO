# Kenchen Sual portfolio

Built from brewed-ops/portfolio-template.

Run: `npm install`, then `npm run dev` (http://localhost:5173). Deploy the `dist/` folder from `npm run build` to Netlify, Vercel or Cloudflare Pages.

## Projects (live Google Drive folders)
Each Projects card opens the Drive folder embedded in the page, with an "Open in Drive" button.
The folders must stay shared as "Anyone with the link" for the embed to show.
- Social Media Management: 10eXU7OMeowo3gxw0jER6wxPkh83L5LBb
- Thumbnails: 1fE0ZKXjglbtPii8QeoRo_MNcypAlZqau
- Graphics: 1gzud_S5v4eJT8f_2_9dgbDD1kX3A1mqj
- Short Videos: 18L03rNwLU13ANv2_qGC3gAcdwRttXGRd
Change them in `src/components/ProjectPanels.tsx` (DRIVE).

## Hidden pages
Showcase (a product page) and Testimonials (video testimonials) were taken out of the menu since there is no product or testimonial video yet.
To bring Testimonials back, add the videos to `public/testimonials/`, fill `src/components/TestimonialsGrid.tsx`, and re-add the route in `src/main.tsx` and the link in `src/components/Rail.tsx`.
