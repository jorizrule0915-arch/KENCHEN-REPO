import type { CSSProperties } from 'react'
import { MagnetStraight, Timer, Trophy, CheckCircle } from '@/components/slab'
import type { Icon } from '@/components/slab'
import Autopilot, { TOOLS } from '@/components/Autopilot'

/**
 * ServicesGrid - the Services view on one glass sheet.
 *
 * Three bands, top to bottom: your three-step method (on a dark plate so it
 * is the first thing the eye lands on), the five services as cards that carry
 * the marks of what each one is built with, and the live automation demo
 * scaled into whatever height is left. Same object language as Home and
 * Projects: the glass, the bento card, plated marks, orange for the index
 * and the accent.
 *
 * Every string below is a PLACEHOLDER. Replace it, or hand this file to your
 * AI assistant and tell it what to put in each spot.
 */

/* ---------- The method ---------- */

type Stage = {
  index: string
  label: string
  body: string
  Icon: Icon
  chips: string[]
}

const STAGES: Stage[] = [
  {
    index: '01',
    label: 'Learn the brand',
    body: 'A short call and your assets, so every post and page sounds like you.',
    Icon: MagnetStraight,
    chips: ['Brand kit', 'Audience', 'Goals', 'Access'],
  },
  {
    index: '02',
    label: 'Create and schedule',
    body: 'Designs, edits and funnels built in your tools, then queued on a calendar.',
    Icon: Timer,
    chips: ['Canva', 'CapCut', 'GoHighLevel'],
  },
  {
    index: '03',
    label: 'Track and improve',
    body: 'Engagement and results reviewed so the next batch does better.',
    Icon: Trophy,
    chips: ['Analytics', 'Reports', 'Tweaks'],
  },
]

/* ---------- The services ---------- */

const GHL = '/icons/gohighlevel.png'
const I = (n: string) => `/icons/ai/${n}.svg`
const GWS = '/icons/googleworkspace.svg'

type Service = {
  index: string
  title: string
  description: string
  chip: string
  logos: string[]
  bullets: string[]
}

const SERVICES: Service[] = [
  {
    index: '01',
    title: 'Social Media Management',
    description: 'Your pages kept active, on brand and on schedule.',
    chip: 'FB · IG · TikTok',
    logos: [I('facebook'), I('instagram'), I('tiktok')],
    bullets: ['Content calendars and post scheduling', 'Engagement, boosting and analytics', 'Carousels and static posts'],
  },
  {
    index: '02',
    title: 'Graphic Design',
    description: 'Scroll-stopping visuals for ads, posts and products.',
    chip: 'Canva · Photoshop',
    logos: [I('shopify'), I('googledrive')],
    bullets: ['Ad creatives and thumbnails', 'Logos and brand assets', 'T-shirt designs and product mockups'],
  },
  {
    index: '03',
    title: 'Video Editing',
    description: 'Short and long-form edits ready for every platform.',
    chip: 'CapCut · VEED',
    logos: [I('youtube'), I('tiktok'), I('instagram')],
    bullets: ['Reels, Shorts and TikToks', 'YouTube long-form edits', 'Video ads with consistent branding'],
  },
  {
    index: '04',
    title: 'Funnels & Automation',
    description: 'Pages and follow-ups that turn visitors into leads.',
    chip: 'GoHighLevel',
    logos: [GHL, I('wix'), I('wordpress')],
    bullets: ['Sales funnels and course pages', 'Email and SMS workflows', 'CRM setup and chatbot flows'],
  },
  {
    index: '05',
    title: 'Admin Support',
    description: 'The busywork handled so you can run the business.',
    chip: 'Workspace · Asana',
    logos: [GWS, I('asana'), I('trello')],
    bullets: ['Inbox and calendar management', 'Research and data entry', 'Lead gathering'],
  },
]

/** The tool marks, stacked horizontally on white tiles (same as Projects). */
function Marks({ logos }: { logos: string[] }) {
  return (
    <span className="bento__logos" aria-hidden="true">
      {logos.map((src) => (
        <span key={src} className="bento__logo">
          <img src={src} alt="" width={22} height={22} decoding="async" />
        </span>
      ))}
    </span>
  )
}

/* ---------- The page ---------- */

export default function ServicesGrid() {
  return (
    <section className="pgrid sgrid" aria-labelledby="services-title">
      <header className="pgrid__head">
        <span className="pgrid__eyebrow">Services</span>
        <h1 className="pgrid__title" id="services-title">
          Social, design, video and funnels, handled.
        </h1>
        <p className="pgrid__lede">
          I support busy business owners with content and the systems behind it.
        </p>
      </header>

      <div className="home__glass sgrid__glass">
        {/* One dark plate, the headline on the left, the three stages wired
            in order on the right with a signal running them. */}
        <div className="sgrid__method" aria-labelledby="method-title">
          <div className="sgrid__method-copy">
            <span className="sgrid__method-eyebrow">How I work</span>
            <h2 className="sgrid__method-title" id="method-title">
              One. Two. Three.
              <br />
              <span>A simple routine that keeps you posting.</span>
            </h2>
            <p className="sgrid__method-sub">
              Clear steps mean fewer back-and-forths and content that ships on time.
            </p>
          </div>

          <ol className="sgrid__stages" role="list">
            {STAGES.map((s, i) => {
              const StageIcon = s.Icon
              return (
                <li key={s.index} className="sgrid__stage" style={{ '--i': i } as CSSProperties}>
                  <span className="sgrid__stage-ghost" aria-hidden="true">{s.index}</span>
                  <span className="sgrid__stage-icon" aria-hidden="true">
                    <StageIcon size={22} weight="duotone" />
                  </span>
                  <h3 className="sgrid__stage-label">{s.label}.</h3>
                  <p className="sgrid__stage-body">{s.body}</p>
                  <ul className="sgrid__stage-chips" role="list" aria-label={`${s.label} touches`}>
                    {s.chips.map((c) => (
                      <li key={c} className="sgrid__stage-chip">{c}</li>
                    ))}
                  </ul>
                </li>
              )
            })}
          </ol>
        </div>

        {/* Five cards, each carrying the marks of what it is built with. */}
        <div className="sgrid__offers">
          <div className="sgrid__offers-head">
            <h2 className="sgrid__offers-title">What I can take off your plate.</h2>
            <p className="sgrid__offers-sub">Mix and match, or hand me all five.</p>
          </div>
          <ul className="bento sgrid__services" role="list">
            {SERVICES.map((s) => (
              <li key={s.title} className="bento__card sgrid__service">
                <span className="bento__head">
                  <span className="sgrid__service-top">
                    <Marks logos={s.logos} />
                    <span className="sgrid__service-index" aria-hidden="true">{s.index} / 05</span>
                  </span>
                  <span className="bento__title">{s.title}</span>
                  <span className="bento__desc">{s.description}</span>
                </span>
                <span className="sgrid__chip" aria-hidden="true">{s.chip}</span>
                <ul className="sgrid__bullets" role="list">
                  {s.bullets.map((b) => (
                    <li key={b} className="sgrid__bullet">
                      <CheckCircle size={15} weight="duotone" aria-hidden="true" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>

        {/* The live workflow. Its caption and the tool chips sit in a header
            above the window, so the canvas gets the whole glass width. */}
        <div className="sgrid__flow">
          <header className="sgrid__flow-head">
            <div className="sgrid__flow-copy">
              <span className="sgrid__flow-eyebrow">Live automation</span>
              <h2 className="sgrid__flow-title">A follow-up flow, running on its own.</h2>
              <p className="sgrid__flow-sub">
                The kind of GoHighLevel workflow I build: a new lead gets tagged, welcomed and followed up without anyone lifting a finger.
              </p>
            </div>
            <ul className="sgrid__flow-tools" role="list" aria-label="Tools that power this flow">
              {TOOLS.map(({ Icon: ToolIcon, label }) => (
                <li key={label} className="sgrid__flow-tool">
                  <ToolIcon size={14} weight="duotone" aria-hidden="true" />
                  <span>{label}</span>
                </li>
              ))}
            </ul>
          </header>
          <div className="sgrid__flow-main">
            <Autopilot compact maxScale={1.08} />
          </div>
        </div>
      </div>
    </section>
  )
}
