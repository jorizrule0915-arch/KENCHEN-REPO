/**
 * YOUR IDENTITY - start here.
 *
 * Everything that says who you are lives in this file: name, handle, photo,
 * socials, email and the Home headline. Every value below is a PLACEHOLDER.
 * Replace the text, or hand this file to your AI assistant and tell it what
 * to put in each field.
 *
 * Page-specific copy (projects, services, testimonials, FAQs) lives in the
 * other files in src/data/ and at the top of each view component.
 */

import { Briefcase, UsersThree, Clock, type Icon } from '@/components/slab'

export type SocialLink = {
  label: string
  href: string
  iconPath: string
}

/** A proof fact on the phone's Home: a glyph, a short value, a caption. */
export type Stat = { value: string; label: string; Icon: Icon }

export type Profile = {
  name: string
  /** First name, used in "Hi, I'm ___." on About. */
  firstName: string
  handle: string
  /** Short role line under the handle on phones. */
  role: string
  /** Square image. An SVG, WebP or PNG with a transparent background looks best. */
  avatarSrc: string
  /** Tooltip / screen-reader label on the verified tick next to your name. */
  verifiedLabel: string
  email: string
  location: string
  /** Three short proof facts shown on phones under the Home lede. */
  stats: Stat[]
  displayName: { line1: string; line2: string }
  hero: {
    body: string
    portraitSrc: string
    portraitAlt: string
  }
  socials: SocialLink[]
}
export const profile: Profile = {
  name: 'Kenchen Sual',
  firstName: 'Kenchen',
  handle: '@kenchensual',
  role: 'Social Media & Virtual Assistant',
  avatarSrc: '/avatar.webp',
  verifiedLabel: 'Virtual Assistant since 2024',
  email: 'kenchensual@gmail.com',
  location: 'Butuan City, Philippines (GMT+8)',
  stats: [
    { value: '2+ yrs', label: 'Remote VA work', Icon: Briefcase },
    { value: '6+', label: 'US & PH clients', Icon: UsersThree },
    { value: 'GMT+8', label: 'Flexible for US hours', Icon: Clock },
  ],
  displayName: { line1: 'Content that converts.', line2: 'Systems that run.' },
  hero: {
    body: 'Social media, graphics, video and GoHighLevel funnels for busy US business owners.',
    portraitSrc: '/portrait.webp',
    portraitAlt: 'Kenchen Sual in a light blue shirt, arms crossed',
  },
  socials: [
    { label: 'WhatsApp +63 945 138 9232', href: 'https://wa.me/639451389232', iconPath: '/icons/whatsapp.svg' },
    { label: 'Telegram @kenchensual', href: 'https://t.me/kenchensual', iconPath: '/icons/telegram.svg' },
    { label: 'Email kenchensual@gmail.com', href: 'mailto:kenchensual@gmail.com', iconPath: '/icons/mail.svg' },
  ],
}
