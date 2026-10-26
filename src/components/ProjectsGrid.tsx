import { Fragment, useCallback, useEffect, useRef, useState, type ComponentType, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { ArrowUpRight, X, CursorClick, ShareNetwork, ImageSquare, PaintBrush, FilmSlate, Toolbox, Baby, Rocket, UsersThree } from '@/components/slab'
import { SMMPanel, ThumbsPanel, GraphicsPanel, ReelsPanel, ClientOnePanel, ClientTwoPanel, ClientThreePanel, ToolkitWindow, TOOLKIT } from './ProjectPanels'
import { useIsPhone } from '@/hooks/useMediaQuery'

/**
 * Projects, as one viewport in Home's bento language: a glass panel of six
 * cards, each previewing its own body of work with a live inner track, each
 * opening the work itself in a near-fullscreen dialog (see ProjectPanels for
 * the first three; the rest are the sections the long page used to stack).
 *
 * The dialog is a portal at z 8000, under the funnel preview (9000) so the
 * barrel's own "open this page" dialog can still stack on top of it.
 */
type Project = {
  id: string
  index: string
  title: string
  desc: string
  Icon: ComponentType<{ size?: number }>
  eyebrow: string
  Section: ComponentType
  span?: 2
  /** Open Builds style: a small orange kicker above the title. */
  kicker?: string
  /** Real marks of what the work was built in; replaces the icon tile. */
  logos?: string[]
  Preview: ComponentType
  /** Phone filter bucket. */
  cat: Cat
}

type Cat = 'work' | 'video' | 'clients' | 'tools'
const FILTERS: { key: Cat | 'all'; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'work', label: 'Design' },
  { key: 'video', label: 'Video' },
  { key: 'clients', label: 'Clients' },
  { key: 'tools', label: 'Tools' },
]

const GHL = '/icons/gohighlevel.png'

const D = 'Live Google Drive folder. Open the card to browse every file.'

const BUILDS: Project[] = [
  { id: 'deb', cat: 'clients', index: '03', kicker: '2025 · US', title: 'Daycare with Deb', desc: 'Funnels, email automation, course pages, social content and short-form video.', Icon: () => <Baby size={20} weight="duotone" />, logos: [GHL], eyebrow: 'Client', Section: ClientOnePanel, Preview: () => null },
  { id: 'vra', cat: 'clients', index: '04', kicker: '2025 · PH / US', title: 'Virtual Rocket Agency', desc: 'Ads, logos, chatbot flows and social management for Muraway Moving, Call Care and Pro. Gen Guys.', Icon: () => <Rocket size={20} weight="duotone" />, eyebrow: 'Client', Section: ClientTwoPanel, Preview: () => null },
  { id: 'ngp', cat: 'clients', index: '05', kicker: '2024 · US', title: 'Nextgenpeople Company', desc: 'YouTube and short-form editing, Canva posts, Zoho scheduling and product mockups.', Icon: () => <UsersThree size={20} weight="duotone" />, eyebrow: 'Client', Section: ClientThreePanel, Preview: () => null },
]

/* ---------- Previews ---------- */

const HUES = ['#2563EB', '#FF7A1A', '#7C3AED', '#0EA5E9', '#EC4899', '#16A34A', '#F59E0B', '#0891B2', '#EF4444', '#8B5CF6']

function tiles(n: number, Glyph: ComponentType<{ size?: number; weight?: 'duotone' }>, cls = '', offset = 0) {
  return function Preview() {
    return (
      <div className={`bento__media kdrive ${cls}`} aria-hidden="true">
        {Array.from({ length: n }, (_, i) => (
          <span key={i} className="kdrive__tile" style={{ background: HUES[(i + offset) % HUES.length] }}>
            <Glyph size={22} weight="duotone" />
          </span>
        ))}
      </div>
    )
  }
}

function ToolsPreview() {
  return (
    <div className="bento__media kchips" aria-hidden="true">
      {TOOLKIT.flatMap((g) => g.tools).slice(0, 14).map((t) => (
        <span key={t}>{t}</span>
      ))}
    </div>
  )
}

const PROJECTS: Project[] = [
  { id: 'smm', cat: 'work', index: '01', title: 'Social Media Management', desc: 'Posts, carousels and content calendars made and scheduled for US brands. ' + D, Icon: ShareNetwork, eyebrow: 'Social Media', Section: SMMPanel, span: 2, Preview: tiles(5, ShareNetwork, 'kdrive--wide') },
  { id: 'plan', cat: 'work', index: '02', title: 'Thumbnails', desc: 'YouTube and video thumbnails built to earn the click.', Icon: ImageSquare, eyebrow: 'Thumbnails', Section: ThumbsPanel, Preview: tiles(3, ImageSquare, '', 3) },
  { id: 'graphics', cat: 'work', index: '06', title: 'Graphics', desc: 'Ads, logos, brand assets and AI-assisted visuals.', Icon: PaintBrush, eyebrow: 'Graphics', Section: GraphicsPanel, Preview: tiles(3, PaintBrush, '', 6) },
  { id: 'reels', cat: 'video', index: '07', title: 'Short Videos', desc: 'Reels, Shorts and TikToks edited in CapCut, Opus Clip and VEED.', Icon: FilmSlate, eyebrow: 'Short Reels', Section: ReelsPanel, Preview: tiles(3, FilmSlate, 'kdrive--reel', 1) },
  { id: 'tools', cat: 'tools', index: '08', title: 'Toolkit', desc: 'The platforms I work in every day, from GoHighLevel funnels to Canva and CapCut.', Icon: Toolbox, eyebrow: 'Toolkit', Section: ToolkitWindow, span: 2, Preview: ToolsPreview },
]

/** The icon tile, or the real marks stacked horizontally in its place. */
function Marks({ p, size = 22 }: { p: Project; size?: number }) {
  if (!p.logos?.length) {
    return (
      <span className="bento__icon">
        <p.Icon size={size} />
      </span>
    )
  }
  return (
    <span className="bento__logos" aria-hidden="true">
      {p.logos.map((src) => (
        <span key={src} className="bento__logo">
          <img src={src} alt="" width={22} height={22} decoding="async" />
        </span>
      ))}
    </span>
  )
}

/* ---------- Dialog ----------
   A backdrop, a close button in the corner, and the work. No panel, no
   header: each Section brings its own window (or, for the strip, none). */
function ProjectModal({ project, onClose, children }: { project: Project; onClose: () => void; children: ReactNode }) {
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    requestAnimationFrame(() => closeRef.current?.focus())
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return createPortal(
    <div
      className="pmodal"
      role="dialog"
      aria-modal="true"
      aria-label={project.title}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <button ref={closeRef} type="button" className="pmodal__close" onClick={onClose} aria-label="Close">
        <X size={18} weight="bold" />
      </button>
      <div className="pmodal__stage">{children}</div>
    </div>,
    document.body,
  )
}

/* ---------- The page ---------- */

export default function ProjectsGrid() {
  const [open, setOpen] = useState<Project | null>(null)
  const phone = useIsPhone()
  const [cat, setCat] = useState<Cat | 'all'>('all')
  const keep = (p: Project) => !phone || cat === 'all' || p.cat === cat
  const projects = PROJECTS.filter(keep)
  const builds = BUILDS.filter(keep)
  const triggerRef = useRef<HTMLElement | null>(null)

  const show = useCallback((p: Project, el: HTMLElement) => {
    triggerRef.current = el
    setOpen(p)
  }, [])
  const close = useCallback(() => {
    setOpen(null)
    requestAnimationFrame(() => triggerRef.current?.focus())
  }, [])

  const stack = builds.length > 0 ? (
    <div className="bento__stack">

        {builds.map((b) => (

          <button

            key={b.id}

            type="button"

            className="bento__card bento__card--btn bento__card--build"

            onClick={(e) => show(b, e.currentTarget)}

            aria-haspopup="dialog"

          >

            <span className="bento__build-plate">

              {b.logos?.length ? <img src={b.logos[0]} alt="" width={22} height={22} /> : <b.Icon />}

            </span>

            <span className="bento__build-text">

              <span className="bento__kicker">{b.kicker}</span>

              <span className="bento__build-title">{b.title}</span>

              <span className="bento__build-desc">{b.desc}</span>

            </span>

            <span className="bento__build-arrow">

              <ArrowUpRight size={13} weight="bold" aria-hidden="true" />

            </span>

          </button>

        ))}

      </div>
  ) : null

  return (
    <section className="pgrid" aria-labelledby="projects-title">
      <header className="pgrid__head">
        <span className="pgrid__eyebrow">Projects</span>
        <h1 className="pgrid__title" id="projects-title">
          Content that keeps brands posting.
        </h1>
        <p className="pgrid__lede">Social media, thumbnails, graphics and short videos, straight from my Drive. Open a card to browse the files.</p>
      </header>

      {phone && (
        <div className="pfilter" role="group" aria-label="Filter projects">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              type="button"
              className="pfilter__btn"
              aria-pressed={cat === f.key}
              onClick={() => setCat(f.key)}
            >
              {f.label}
            </button>
          ))}
        </div>
      )}

      <div className="home__glass pgrid__glass">
        {/* Hung on the sheet's top edge so it reads as a tag on the container,
            not a seventh card. aria-hidden: the lede already says it. */}
        <span className="pgrid__hint" aria-hidden="true">
          <CursorClick size={14} weight="duotone" />
          Click a card to open it
        </span>
        <div className="bento bento--projects">
          {projects.map((p) => (
            <Fragment key={p.id}>
            <button
              type="button"
              className={`bento__card bento__card--btn${p.span === 2 ? ' bento__card--wide' : ''}`}
              data-id={p.id}
              onClick={(e) => show(p, e.currentTarget)}
              aria-haspopup="dialog"
            >
              <span className="bento__head">
                <Marks p={p} />
                <span className="bento__title">{p.title}</span>
                <span className="bento__desc">{p.desc}</span>
                <ArrowUpRight size={15} weight="bold" aria-hidden="true" className="bento__arrow" />
              </span>
              <p.Preview />
            </button>
            {p.id === 'plan' && stack}
            </Fragment>
          ))}
          {!projects.some((p) => p.id === 'plan') && stack}
        </div>
      </div>

      {open && (
        <ProjectModal project={open} onClose={close}>
          <open.Section />
        </ProjectModal>
      )}
    </section>
  )
}
