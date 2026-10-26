import { ArrowLeft } from '@/components/slab'
import { useNavigate } from 'react-router-dom'
import { profile } from '@/data/profile'

/**
 * Terms of Service - PLACEHOLDER. Legal text has to fit YOUR business, so
 * none is supplied. Paste your own terms into the sections below.
 */
export default function ToS() {
  const navigate = useNavigate()

  return (
    <main className="legal-page" aria-label="Terms of Service">
      <div className="legal-page__card">
        <button
          className="legal-page__back"
          onClick={() => navigate('/')}
          aria-label="Back to home"
        >
          <ArrowLeft weight="bold" size={15} aria-hidden="true" />
          Back to home
        </button>

        <h1 className="legal-page__title">Terms of Service</h1>
        <p className="legal-page__updated">Last updated: October 27, 2026</p>

        <div className="legal-page__body">
          <h2>Using this site</h2>
          <p>You are welcome to browse this portfolio. Please do not copy the work samples without permission.</p>

          <h2>Work and payment</h2>
          <p>Each engagement is agreed in writing first: the tasks, the rate (hourly, per project or retainer) and the timeline. Work is delivered through your own tools or shared folders.</p>

          <h2>Ownership</h2>
          <p>Once paid for, client work belongs to the client. Samples shown here are displayed with that in mind, and I will remove any on request.</p>

          <h2>Liability</h2>
          <p>This site and its content are provided as is. My liability for any engagement is limited to the fees paid for it.</p>

          <h2>Contact</h2>
          <p>
            Questions about these terms: <a href={`mailto:${profile.email}`}>{profile.email}</a>
          </p>
        </div>
      </div>
    </main>
  )
}
