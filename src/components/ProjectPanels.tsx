import { useEffect, useState, type ReactNode } from 'react'
import { Ticket, Robot, FlowArrow, type Icon } from '@/components/slab'
import { lazy, Suspense } from 'react'
import WorkflowSamples from './WorkflowSamples'
import AIStackGrid from './AIStackGrid'
import { AppsSection } from './Projects'
import { useFunnelModal } from './FunnelModal'
import { websiteFunnel } from '@/data/funnels'

const FunnelBarrel = lazy(() => import('./FunnelBarrel'))

/**
 * What the Projects dialogs show. Each panel is the work itself, on screen
 * the moment the dialog opens - no section chrome to read past and no second
 * dialog to click into.
 */

/** Only the strip of macOS windows, drifting on the backdrop. No window. */
export function AutomationsPanel() {
  return (
    <div className="ppanel ppanel--strip">
      <WorkflowSamples />
    </div>
  )
}

/** A plain mac window with a scrolling body, for the sections that are
 *  pages rather than frames. */
function SectionWindow({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="ppanel ppanel--window">
      <div className="ppanel__bar">
        <span className="ppanel__dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span className="ppanel__url">
          <span className="ppanel__url-host">{label}</span>
        </span>
      </div>
      <div className="ppanel__scroll">{children}</div>
    </div>
  )
}

/** Only the barrel, spinning on the backdrop. Its own page preview still
 *  stacks above (z 9000). */
export function BarrelPanel() {
  const { openFull, modal } = useFunnelModal()
  return (
    <div className="ppanel ppanel--barrel">
      <Suspense fallback={<div className="funnels__barrel-skeleton" aria-hidden="true" />}>
        <FunnelBarrel funnels={websiteFunnel} onOpen={openFull} />
      </Suspense>
      {modal}
    </div>
  )
}

/** The systems as a logo-first grid, in a scrolling window. */
export function AIWindow() {
  return (
    <SectionWindow label="Your systems">
      <AIStackGrid />
    </SectionWindow>
  )
}
export function AppsWindow() {
  return (
    <SectionWindow label="Your apps">
      <AppsSection />
    </SectionWindow>
  )
}

/** The plan document, full height, straight away. */
export function PlanPanel() {
  return (
    <div className="ppanel ppanel--frame">
      <FrameBar
        host="yourdomain.com"
        path="/sample-plan"
      />
      <LiveFrame src="/placeholders/sample-plan.html" title="Sample document" />
    </div>
  )
}

/** `src` is a local page framed in the panel; `path` is what the fake
 *  address bar shows. Point these at your own pages. */
type Build = { id: string; label: string; src: string; path: string; Icon: Icon }

const BUILDS: Build[] = [
  { id: 'ticketing', label: 'Featured Project One', src: '/placeholders/sample-plan.html?doc=1', path: '/featured-one', Icon: Ticket },
  { id: 'framework', label: 'Featured Project Two', src: '/placeholders/sample-plan.html?doc=2', path: '/featured-two', Icon: Robot },
  { id: 'workflow', label: 'Featured Project Three', src: '/placeholders/sample-plan.html?doc=3', path: '/featured-three', Icon: FlowArrow },
]

/** One build, framed, open on arrival. */
function BuildPanel({ build }: { build: Build }) {
  return (
    <div className="ppanel ppanel--frame">
      <FrameBar host="yourdomain.com" path={build.path} />
      <LiveFrame src={build.src} title={build.label} />
    </div>
  )
}
export const TicketingPanel = () => <BuildPanel build={BUILDS[0]} />
export const FrameworkPanel = () => <BuildPanel build={BUILDS[1]} />
export const WorkflowPanel = () => <BuildPanel build={BUILDS[2]} />

function FrameBar({ host, path }: { host: string; path: string }) {
  return (
    <div className="ppanel__bar">
      <span className="ppanel__dots" aria-hidden="true">
        <i />
        <i />
        <i />
      </span>
      <span className="ppanel__url">
        <span className="ppanel__url-host">{host}</span>
        <span className="ppanel__url-path">{path}</span>
      </span>
    </div>
  )
}

/** Matches `pmodal-panel` (420ms). Same-site frames share the portfolio's
 *  main thread, so loading one mid-animation stalled the open by 100ms+. */
const FRAME_DELAY_MS = 440

function LiveFrame({ src, title }: { src: string; title: string }) {
  const [ready, setReady] = useState(false)
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    const id = window.setTimeout(() => setMounted(true), FRAME_DELAY_MS)
    return () => window.clearTimeout(id)
  }, [])
  return (
    <div className="ppanel__stage">
      {!ready && <div className="ppanel__skeleton" aria-hidden="true" />}
      {mounted && <iframe
        className="ppanel__iframe"
        src={src}
        title={title}
        loading="eager"
        onLoad={() => setReady(true)}
        data-ready={ready ? 'true' : 'false'}
      />}
    </div>
  )
}

/* ---------- Kenchen's work: live Google Drive folders ---------- */

export type DriveFolder = { id: string; label: string; title: string }

export const DRIVE: Record<'smm' | 'thumbs' | 'graphics' | 'reels', DriveFolder> = {
  smm: { id: '10eXU7OMeowo3gxw0jER6wxPkh83L5LBb', label: 'social-media-management', title: 'Social Media Management' },
  thumbs: { id: '1fE0ZKXjglbtPii8QeoRo_MNcypAlZqau', label: 'thumbnails', title: 'Thumbnails' },
  graphics: { id: '1gzud_S5v4eJT8f_2_9dgbDD1kX3A1mqj', label: 'graphics', title: 'Graphics' },
  reels: { id: '18L03rNwLU13ANv2_qGC3gAcdwRttXGRd', label: 'short-reels', title: 'Short Reels' },
}

export const driveUrl = (f: DriveFolder) => `https://drive.google.com/drive/folders/${f.id}?usp=sharing`

/** The folder itself, embedded live from Drive, with a way out to open it. */
function DrivePanel({ folder }: { folder: DriveFolder }) {
  return (
    <div className="ppanel ppanel--frame">
      <div className="ppanel__bar">
        <span className="ppanel__dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span className="ppanel__url">
          <span className="ppanel__url-host">drive.google.com</span>
          <span className="ppanel__url-path">/{folder.label}</span>
        </span>
        <a className="ppanel__open" href={driveUrl(folder)} target="_blank" rel="noopener noreferrer">
          Open in Drive ↗
        </a>
      </div>
      <LiveFrame src={`https://drive.google.com/embeddedfolderview?id=${folder.id}#grid`} title={folder.title} />
    </div>
  )
}
export const SMMPanel = () => <DrivePanel folder={DRIVE.smm} />
export const ThumbsPanel = () => <DrivePanel folder={DRIVE.thumbs} />
export const GraphicsPanel = () => <DrivePanel folder={DRIVE.graphics} />
export const ReelsPanel = () => <DrivePanel folder={DRIVE.reels} />

/* ---------- Client engagements, from the resume ---------- */

type Client = { name: string; where: string; year: string; role: string; work: string[] }

const CLIENTS: Client[] = [
  {
    name: 'Daycare with Deb',
    where: 'United States',
    year: '2025',
    role: 'Funnel, Automation & Graphic Design',
    work: [
      'Sales funnel design and optimization',
      'Email automation workflow development',
      'Converting course page creation',
      'Web design plus carousel and static social media content',
      'Short-form video editing with consistent branding',
    ],
  },
  {
    name: 'Virtual Rocket Agency',
    where: 'Philippines · clients Muraway Moving, Call Care, Pro. Gen Guys (US)',
    year: '2025',
    role: 'Graphics & Video Editing, Social Media Management',
    work: [
      'Post scheduling and content management',
      'Graphic and video ad editing',
      'Logo design and brand asset creation',
      'Flowchart-based chatbot question-and-answer sequences',
      'AI image generation and content strategy',
    ],
  },
  {
    name: 'Nextgenpeople Company',
    where: 'United States',
    year: '2024',
    role: 'Social Media Management, Graphic Design, Video Editing',
    work: [
      'Long- and short-form video editing for YouTube, Shorts, TikTok, Instagram, X and Facebook',
      'Canva-based social media post design',
      'Content scheduling and posting with Zoho',
      'Social boosting, engagement and analytics tracking',
      'Product mockups with Printify, Printful and Shopify, plus T-shirt designs in Photoshop and Illustrator',
    ],
  },
]

function ClientPanel({ c }: { c: Client }) {
  return (
    <SectionWindow label={c.name}>
      <article className="kclient">
        <span className="kclient__year">{c.year} · {c.where}</span>
        <h2 className="kclient__name">{c.name}</h2>
        <p className="kclient__role">{c.role}</p>
        <ul className="kclient__list">
          {c.work.map((w) => (
            <li key={w}>{w}</li>
          ))}
        </ul>
      </article>
    </SectionWindow>
  )
}
export const ClientOnePanel = () => <ClientPanel c={CLIENTS[0]} />
export const ClientTwoPanel = () => <ClientPanel c={CLIENTS[1]} />
export const ClientThreePanel = () => <ClientPanel c={CLIENTS[2]} />

/* ---------- Toolkit ---------- */

export const TOOLKIT: { group: string; tools: string[] }[] = [
  { group: 'Funnels & CRM', tools: ['GoHighLevel', 'Kartra', 'Wix', 'WordPress (Elementor)', 'PushPress', 'Kilo'] },
  { group: 'Design', tools: ['Canva', 'Photoshop', 'Illustrator'] },
  { group: 'Video', tools: ['CapCut', 'Opus Clip', 'VEED.io'] },
  { group: 'Ops & Scheduling', tools: ['Asana', 'Trello', 'Calendly', 'Zoho', 'Google Workspace'] },
  { group: 'Communication', tools: ['Slack', 'Skype', 'Discord'] },
  { group: 'E-commerce', tools: ['Shopify', 'Printify', 'Printful'] },
]

export function ToolkitWindow() {
  return (
    <SectionWindow label="Toolkit">
      <div className="ktools">
        {TOOLKIT.map((g) => (
          <section key={g.group} className="ktools__group">
            <h3>{g.group}</h3>
            <div className="ktools__chips">
              {g.tools.map((t) => (
                <span key={t} className="ktools__chip">{t}</span>
              ))}
            </div>
          </section>
        ))}
      </div>
    </SectionWindow>
  )
}
