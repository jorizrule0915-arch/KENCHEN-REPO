import { ArrowLeft } from '@/components/slab'
import { useNavigate } from 'react-router-dom'
import { profile } from '@/data/profile'

/**
 * Privacy Policy - PLACEHOLDER. Legal text has to describe YOUR site and what
 * it collects, so none is supplied. Write it (or have a lawyer or a policy
 * generator write it) and paste it into the sections below.
 */
export default function Privacy() {
  const navigate = useNavigate()

  return (
    <main className="legal-page" aria-label="Privacy Policy">
      <div className="legal-page__card">
        <button
          className="legal-page__back"
          onClick={() => navigate('/')}
          aria-label="Back to home"
        >
          <ArrowLeft weight="bold" size={15} aria-hidden="true" />
          Back to home
        </button>

        <h1 className="legal-page__title">Privacy Policy</h1>
        <p className="legal-page__updated">Last updated: October 27, 2026</p>

        <div className="legal-page__body">
          <h2>Who this covers</h2>
          <p>This site is run by Kenchen Sual, a virtual assistant based in Butuan City, Philippines. It covers this portfolio site only.</p>

          <h2>What is collected</h2>
          <p>The contact form opens your own email app, so only what you choose to send reaches me: usually your name, email and message. This site runs no tracking analytics.</p>

          <h2>How it is used</h2>
          <p>I use your message only to reply and discuss your project. I do not sell or share it.</p>

          <h2>How long it is kept</h2>
          <p>Emails stay in my inbox while we are in touch. Ask any time and I will delete them.</p>

          <h2>Contact</h2>
          <p>
            Questions about this policy: <a href={`mailto:${profile.email}`}>{profile.email}</a>
          </p>
        </div>
      </div>
    </main>
  )
}
