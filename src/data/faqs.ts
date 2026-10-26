export type QA = { q: string; a: string }

/**
 * The questions people ask before they email. One list, used by the FAQ
 * accordion on the Contact view (and the legacy long-scroll FAQ section).
 * Five questions, two or three sentences each: the accordion sits in a
 * fixed panel and more than that pushes the email row off the plate.
 */
export const FAQS: QA[] = [
  {
    q: 'What do you do?',
    a: 'Social media management, graphic design, short- and long-form video editing, GoHighLevel funnels and automations, and general admin support, mostly for US small businesses and agencies.',
  },
  {
    q: 'How fast can you start?',
    a: 'Small tasks like a post batch or a thumbnail can start within a day or two. Funnel builds and ongoing management start once we agree on scope, usually within the week. I can work US business hours.',
  },
  {
    q: 'How much do you charge?',
    a: 'Hourly, per project or a monthly retainer, whichever fits. Send me what you need and I will quote it based on volume and turnaround.',
  },
  {
    q: 'Where are you based?',
    a: 'Butuan City, Philippines (GMT+8). I have worked US hours for American clients and overlap easily with Australia and Asia.',
  },
  {
    q: 'What happens after I write?',
    a: 'I reply within 24 hours. Next is a short call or chat to learn your brand and goals, then I send a simple plan and start.',
  },
]
