// FAQ content lives here (a plain, non-client module) so it can be consumed
// both by the interactive <Faq /> client component AND by the server-rendered
// FAQ page's FAQPage JSON-LD without crossing the client/server boundary.

export interface FaqItem {
  q: string;
  a: string;
}

export interface FaqCategory {
  category: string;
  items: FaqItem[];
}

export const CATEGORIZED_FAQ: FaqCategory[] = [
  {
    category: 'General',
    items: [
      { q: 'What is Orbit Guard?', a: 'Orbit Guard is the company behind Orbit — a simple piece of hardware that protects your cats, dogs, children and you from rolling office chairs.' },
      { q: 'What is an Orbit?', a: 'An Orbit is a small, donut-shaped guard with an opening in the center. You lift the chair, slip the chair wheel into the opening, and the Orbit will orbit around the chair wheel. As the chair rolls, the rounded shell pushes obstacles aside instead of letting the wheel ram into them — so it works as a  barrier between your chair and everything around it.' },
      { q: 'Will an Orbit fit my chair?', a: 'Orbit fits about 95% of office chairs — any caster with a stem between 7 and 11mm. That covers nearly every standard task chair, gaming chair, and rolling stool. Orbits are able to reduce in size by twisting the Orbit in half.' },
      { q: 'How do I install them?', a: 'Tip the chair on its side, then slip an Orbit (a full one or a single half) around each chair wheel so the wheel sits inside the orbit. Stand the chair back up and repeat for every wheel. The whole chair takes about 1 to 2 minutes.' },
      { q: 'Do they work on hardwood and carpet?', a: 'Yes — Orbit is built for both hardwood and carpet. On carpet we recommend using a single half and rolling the chair around first to make sure it tracks smoothly, since a full Orbit can occasionally flip or catch onto the chair base.' },
    ],
  },
  {
    category: 'Shipping & Support',
    items: [
      { q: 'When does Orbit ship?', a: 'We\'re live on Kickstarter. Backers ship first, this fall. Enter your email on the homepage and we\'ll notify you the moment orders open. You can also pick your colors and add them to your cart ahead of time.' },
      { q: 'What if they don\'t fit?', a: 'Return them within 60 days for a full refund — no questions asked.' },
      { q: 'How do I contact support?', a: 'Email us at hello@orbitguards.com and we\'ll get back to you within 2 to 3 business days.' },
    ],
  },
  {
    category: 'Product & Care',
    items: [
      { q: 'How does the stacking system work?', a: 'A full Orbit is 5cm tall and splits into two halves. Use half an Orbit for carpets or if the full Orbit is too large for you chair wheel or use full Orbit. This way Orbits are able to fit into various size chair wheels' },
      { q: 'Are they really pet-safe?', a: 'Yes. The rounded, fully closed shell leaves no gap for a tail, paw, or cable to get pinched. We tested every colorway with three very curious cats.' },
    ],
  },
];
