import type { CSSProperties } from 'react'
import { ArrowUpRight, MapPin, GraduationCap, FileText } from '@/components/slab'
import { profile } from '@/data/profile'

/**
 * AboutGrid - the About view as a fixed viewport.
 *
 * One glass sheet, two columns: who you are on the left, the illustration
 * on the right. Sized to the panel, so nothing here scrolls.
 *
 * The left column is a ladder, not a paragraph block: one display statement,
 * one line of context, then the four things you do - each carrying the marks
 * of the tools it is built with. The tools are the proof, so they are the
 * visual. Swap the marks below for your own (any square SVG/PNG in public/).
 */

const ic = (n: string, name: string) => ({ src: `/icons/ai/${n}.svg`, name })
const GHL = { src: '/icons/gohighlevel.png', name: 'GoHighLevel' }
const GWS = { src: '/icons/googleworkspace.svg', name: 'Google Workspace' }

type Capability = {
  index: string
  title: string
  marks: { src: string; name: string }[]
}

const CAPABILITIES: Capability[] = [
  { index: '01', title: 'Social media management', marks: [ic('facebook', 'Facebook'), ic('instagram', 'Instagram'), ic('tiktok', 'TikTok')] },
  { index: '02', title: 'Graphics and video editing', marks: [ic('youtube', 'YouTube'), ic('shopify', 'Shopify'), ic('googledrive', 'Google Drive')] },
  { index: '03', title: 'Funnels and automation', marks: [GHL, ic('wix', 'Wix'), ic('wordpress', 'WordPress')] },
  { index: '04', title: 'Admin and research support', marks: [GWS, ic('asana', 'Asana'), ic('trello', 'Trello')] },
]

export default function AboutGrid() {
  return (
    <section className="pgrid agrid" aria-labelledby="about-title">
      <header className="pgrid__head">
        <span className="pgrid__eyebrow">About</span>
        <h1 className="pgrid__title" id="about-title">
          {`Hi, I’m ${profile.firstName}.`}
        </h1>
        <p className="pgrid__lede">
          A virtual assistant for social media, design, video and funnels.
        </p>
      </header>

      <div className="home__glass agrid__glass">
        <div className="agrid__copy">
          <p className="agrid__lead">
            I help business owners show up online, every day.
            <span> Content that looks good and systems that run quietly behind it.</span>
          </p>

          <p className="agrid__note">
            Since 2024 I have worked remotely with{' '}
            <strong>US and Philippine teams</strong>, from a daycare course business to a
            moving company and a marketing agency. I am organized, reliable and easy to
            reach, and I learn new tools fast.
          </p>

          <ul className="agrid__caps" role="list">
            {CAPABILITIES.map((c) => (
              <li key={c.index} className="agrid__cap">
                <span className="agrid__cap-marks">
                  {c.marks.map((m, i) => (
                    <span
                      key={m.name}
                      className="agrid__mark"
                      style={{ '--i': c.marks.length - i } as CSSProperties}
                    >
                      <img src={m.src} alt={m.name} loading="lazy" decoding="async" />
                    </span>
                  ))}
                </span>
                <span className="agrid__cap-title">{c.title}</span>
                <span className="agrid__cap-index" aria-hidden="true">
                  {c.index}
                </span>
              </li>
            ))}
          </ul>

          {/* One plate, two cells sharing a mark / title / meta anatomy. */}
          <div className="agrid__bar">
            <span className="agrid__cell">
              <span className="agrid__cell-mark">
                <GraduationCap size={18} weight="fill" aria-hidden="true" />
              </span>
              <span className="agrid__cell-copy">
                <span className="agrid__cell-title">Bachelor of Elementary Education</span>
                <span className="agrid__cell-meta">Caraga Institute of Technology · 2019–2023</span>
              </span>
            </span>

            <span className="agrid__cell">
              <span className="agrid__cell-mark">
                <MapPin size={16} weight="fill" aria-hidden="true" />
              </span>
              <span className="agrid__cell-copy">
                <span className="agrid__cell-title">{profile.location}</span>
                <span className="agrid__cell-meta">GMT+8 · open to US hours</span>
              </span>
            </span>

            <a className="agrid__cell agrid__cell--wide" href="/Kenchen-Sual-Resume.pdf" target="_blank" rel="noopener noreferrer">
              <span className="agrid__cell-mark">
                <FileText size={16} weight="fill" aria-hidden="true" />
              </span>
              <span className="agrid__cell-copy">
                <span className="agrid__cell-title">Download my resume</span>
                <span className="agrid__cell-meta">PDF · references on request</span>
              </span>
              <ArrowUpRight className="agrid__cell-go" size={15} weight="bold" aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="agrid__portrait">
          <img
            src="/portrait.webp"
            alt="Kenchen Sual in a light blue shirt, arms crossed"
            loading="eager"
            decoding="async"
            width={400}
            height={400}
          />
        </div>
      </div>
    </section>
  )
}
