import { useMemo } from 'react'

/**
 * ToolsMarquee
 *
 * Horizontally scrolling strip of brand logos + labels for the tools you work with.
 * The strip lives on the cream shader page, NOT inside a dark section.
 *
 * Implementation notes:
 * - The tools list is duplicated in JSX (`doubled`) so the CSS keyframe can translate
 *   by exactly -50% and produce a seamless loop. The halfway point lands on the seam
 *   between the two copies, so the reset at 100% is invisible.
 * - Icons come in two flavors:
 *     1. Single-color simple-icons SVGs (.svg) are rendered as CSS masks tinted
 *        via a per-item `--brand-color` custom property. This lets us ship one
 *        black-shape file per brand and paint it with the brand color.
 *     2. Multi-color brand marks (PNG or multi-color SVG - GoHighLevel,
 *        Lightspeed, Claude Code, VS Code, Google Workspace) are rendered as
 *        raw `<img>` tags because gradients/layered fills cannot be reduced to
 *        a single silhouette.
 *   The renderer picks the mode by whether a `color` is set: color -> mask,
 *   no color -> img.
 * - Brand colors live in the data layer below (not tokens.css) because they are
 *   external brand identifiers, not part of the site palette. They are passed to
 *   CSS via `--brand-color` custom properties so the component stylesheet stays
 *   free of inline hex values.
 * - Accessibility: the animated track is aria-hidden because its content is
 *   duplicated and moving. The real semantic list sits in an sr-only <ul> so
 *   screen readers get a clean, deduped enumeration of the tools.
 */

type Tool = {
  name: string
  iconPath: string
  /** When set, the SVG silhouette is tinted via CSS mask. Omit for multi-color marks. */
  color?: string
}

export const tools: Tool[] = [
  { name: 'GoHighLevel', iconPath: '/icons/gohighlevel.png' },
  { name: 'Wix', iconPath: '/icons/ai/wix.svg', color: '#0C6EFC' },
  { name: 'WordPress', iconPath: '/icons/ai/wordpress.svg', color: '#21759B' },
  { name: 'Elementor', iconPath: '/icons/ai/elementor.svg', color: '#92003B' },
  { name: 'Shopify', iconPath: '/icons/ai/shopify.svg', color: '#7AB55C' },
  { name: 'Facebook', iconPath: '/icons/ai/facebook.svg', color: '#0866FF' },
  { name: 'Instagram', iconPath: '/icons/ai/instagram.svg', color: '#E4405F' },
  { name: 'TikTok', iconPath: '/icons/ai/tiktok.svg', color: '#000000' },
  { name: 'YouTube', iconPath: '/icons/ai/youtube.svg', color: '#FF0000' },
  { name: 'Zoho', iconPath: '/icons/ai/zoho.svg', color: '#E42527' },
  { name: 'Asana', iconPath: '/icons/ai/asana.svg', color: '#F06A6A' },
  { name: 'Trello', iconPath: '/icons/ai/trello.svg', color: '#0052CC' },
  { name: 'Calendly', iconPath: '/icons/ai/calendly.svg', color: '#006BFF' },
  { name: 'Google Workspace', iconPath: '/icons/googleworkspace.svg' },
  { name: 'Slack', iconPath: '/icons/ai/slack-color.svg' },
]

export default function ToolsMarquee() {
  // Duplicate the list so the -50% translate lands on a seamless seam.
  // useMemo keeps the doubled array reference-stable across renders.
  const doubled = useMemo(() => [...tools, ...tools], [])

  return (
    <section className="tools-marquee" aria-label="Tools I work with" data-reveal>
      <div className="tools-marquee__track" aria-hidden="true">
        {doubled.map((tool, i) => {
          const useMask = tool.iconPath.endsWith('.svg') && !!tool.color
          return (
            <div key={`${tool.name}-${i}`} className="tools-marquee__item">
              {/* A plain box on desktop (display: contents); on phones it is
                  the rounded app-icon tile - a masked icon cannot carry its
                  own background, so the tile needs its own element. */}
              <span className="tools-marquee__tile">
                {useMask ? (
                  <span
                    className="tools-marquee__icon"
                    style={{
                      ['--icon-url' as string]: `url('${tool.iconPath}')`,
                      ['--brand-color' as string]: tool.color ?? 'var(--navy)',
                    }}
                  />
                ) : (
                  <img
                    className="tools-marquee__img"
                    src={tool.iconPath}
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    decoding="async"
                    width={20}
                    height={20}
                  />
                )}
              </span>
              <span className="tools-marquee__label">{tool.name}</span>
            </div>
          )
        })}
      </div>

      {/* Real semantic list for screen readers, dedupes the visual loop. */}
      <ul className="sr-only">
        {tools.map((t) => (
          <li key={t.name}>{t.name}</li>
        ))}
      </ul>
    </section>
  )
}
