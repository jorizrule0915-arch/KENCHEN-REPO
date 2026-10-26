import type React from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowUpRight,
  FolderOpen,
  User,
  Robot,
  Medal,
  Stack,
  Quotes,
  FunnelSimple,
  ShareNetwork,
  PaintBrush,
  FilmSlate,
  Headset,
  GraduationCap,
  ImageSquare,
} from '@/components/slab'
import { TOOLKIT } from './ProjectPanels'
import { profile } from '@/data/profile'

/**
 * Home's showcase: one card per rail view, each an index of what that view
 * holds, each built from content the portfolio already ships. Every card is
 * a link. Nothing here invents a fact - the funnels, the tools, the clients
 * and the credentials are the same records the views render in full.
 *
 * Motion is transform-only on a clipped inner track, so a card never adds
 * height and Home stays a single viewport.
 */

const PROJECT_SHOTS = [
  { label: 'Social Media', Icon: ShareNetwork, bg: '#2563EB' },
  { label: 'Thumbnails', Icon: ImageSquare, bg: '#FF7A1A' },
  { label: 'Graphics', Icon: PaintBrush, bg: '#7C3AED' },
  { label: 'Short Videos', Icon: FilmSlate, bg: '#EC4899' },
]

const OFFERS = [
  { Icon: ShareNetwork, title: 'Social Media Management', note: 'Posts, scheduling, engagement' },
  { Icon: PaintBrush, title: 'Graphic Design', note: 'Ads, thumbnails, brand assets' },
  { Icon: FilmSlate, title: 'Video Editing', note: 'Reels, Shorts, YouTube' },
  { Icon: FunnelSimple, title: 'Funnels & Automation', note: 'GoHighLevel, email/SMS flows' },
  { Icon: Headset, title: 'Admin Support', note: 'Email, research, lead gen' },
] as const

const CLIENTS = [
  { name: 'Daycare with Deb', role: 'Funnels, automation & design · 2025', work: 'Funnels · Email flows · Video' },
  { name: 'Virtual Rocket Agency', role: 'Graphics, video & social · 2025', work: 'Ads · Logos · Chatbots' },
  { name: 'Nextgenpeople Company', role: 'Social media & video · 2024', work: 'YouTube · Canva · Zoho' },
]

// Three photos of you, fanned. Small copies are fine - the fan shows them under 100px.
const PHOTOS = [profile.avatarSrc, '/photo-2.webp', '/photo-3.webp']

const AI_BUILDS = TOOLKIT.flatMap((g) => g.tools).map((name) => ({ id: name, name }))

function CardHead({
  Icon,
  title,
  desc,
}: {
  Icon: typeof FolderOpen
  title: string
  desc: string
}) {
  return (
    <header className="bento__head">
      <span className="bento__label">
        <span className="bento__icon">
          <Icon size={20} weight="fill" aria-hidden="true" />
        </span>
        <h3 className="bento__title">{title}</h3>
      </span>
      <p className="bento__desc">{desc}</p>
      <ArrowUpRight size={15} weight="bold" aria-hidden="true" className="bento__arrow" />
    </header>
  )
}

export default function HomeBento() {
  const half = Math.ceil(AI_BUILDS.length / 2)
  const toolRows = [AI_BUILDS.slice(0, half), AI_BUILDS.slice(half)]

  return (
    <nav className="bento" aria-label="Explore the portfolio">
      {/* Projects: the funnel thumbnails drift upward on a looped track. */}
      <Link to="/projects" className="bento__card bento__card--projects">
        <CardHead Icon={FolderOpen} title="Projects" desc="Social posts, thumbnails, graphics and short videos." />
        <div className="bento__media bento__reel" aria-hidden="true">
          <div className="bento__reel-track">
            {[...PROJECT_SHOTS, ...PROJECT_SHOTS].map(({ label, Icon, bg }, i) => (
              <span key={i} className="bento__shot kshot" style={{ background: bg }}>
                <Icon size={26} weight="duotone" />
                <b>{label}</b>
              </span>
            ))}
          </div>
        </div>
      </Link>

      {/* About: a fanned stack of photos. */}
      <Link to="/about" className="bento__card bento__card--about">
        <CardHead Icon={User} title="About" desc="Kenchen, a VA in Butuan City, Philippines." />
        <div className="bento__media bento__fan" aria-hidden="true">
          {PHOTOS.map((src, i) => (
            <span key={src} className="bento__photo" style={{ ['--i' as string]: i }}>
              <img src={src} alt="" loading="lazy" decoding="async" />
            </span>
          ))}
        </div>
      </Link>

      {/* AI builds: the systems from the Projects tree, two chip rows
          scrolling against each other. */}
      <Link to="/projects" className="bento__card bento__card--ai">
        <CardHead Icon={Robot} title="Toolkit" desc="GoHighLevel, Canva, CapCut and more." />
        <div className="bento__media bento__chips" aria-hidden="true">
          {toolRows.map((row, r) => (
            <div key={r} className="bento__chip-row" data-dir={r ? 'right' : 'left'}>
              <div className="bento__chip-track">
                {[...row, ...row].map((n, i) => (
                  <span key={`${n.id}-${i}`} className="bento__chip">
                    {n.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Link>

      {/* Credentials: the badge that matters, on its plate. */}
      <Link to="/about" className="bento__card bento__card--creds">
        <CardHead Icon={Medal} title="Education" desc="BEEd, Caraga Institute of Technology, 2019–2023." />
        <div className="bento__media bento__badge" aria-hidden="true">
          <span className="bento__badge-ring">
            <GraduationCap size={52} weight="duotone" />
          </span>
          <span className="bento__badge-tag">
            <GraduationCap size={14} weight="fill" />
            Bachelor of Elementary Education
          </span>
        </div>
      </Link>

      {/* Services: the five offers as a compact index. */}
      <Link to="/services" className="bento__card bento__card--services">
        <CardHead Icon={Stack} title="Services" desc="Five ways I help US business owners." />
        <ul className="bento__media bento__offers" role="list">
          {OFFERS.map(({ Icon, title, note }, i) => (
            <li key={title} className="bento__offer" style={{ '--i': i } as React.CSSProperties}>
              <span className="bento__offer-tile">
                <Icon size={15} weight="duotone" aria-hidden="true" />
              </span>
              <span className="bento__offer-text">
                <span className="bento__offer-title">{title}</span>
                <span className="bento__offer-note">{note}</span>
              </span>
              <span className="bento__offer-num" aria-hidden="true">
                0{i + 1}
              </span>
            </li>
          ))}
        </ul>
      </Link>

      {/* Testimonials: client cards drifting up a clipped column. */}
      <Link to="/projects" className="bento__card bento__card--quotes">
        <CardHead Icon={Quotes} title="Clients" desc="US and PH teams I have worked with." />
        <div className="bento__media bento__reviews" aria-hidden="true">
          <div className="bento__reviews-track">
            {[...CLIENTS, ...CLIENTS].map((c, i) => (
              <span key={i} className="bento__review">
                <span className="bento__review-top">
                  <Quotes size={14} weight="fill" />
                  <b>{c.name}</b>
                </span>
                <span className="bento__review-role">{c.role}</span>
                <span className="bento__review-work">{c.work}</span>
              </span>
            ))}
          </div>
        </div>
      </Link>
    </nav>
  )
}
