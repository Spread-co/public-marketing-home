export default {
  editor: {
    label: { en: 'Public Marketing Home' },
    icon: 'home',
    categories: ['marketing'],
    type: 'section',
  },
  properties: {
    // Supabase (for live alerts)
    supabaseUrl: {
      label: { en: 'Supabase URL' },
      type: 'Text',
      bindable: true,
      hidden: true,
      defaultValue: '',
    },
    supabaseAnonKey: {
      label: { en: 'Supabase Anon Key' },
      type: 'Text',
      bindable: true,
      hidden: true,
      defaultValue: '',
    },

    // Live alerts
    showLiveAlerts: {
      label: { en: 'Show Live Alert Banner' },
      type: 'OnOff',
      defaultValue: true,
    },

    // Hero
    heroEyebrow: {
      label: { en: 'Hero Eyebrow' },
      type: 'Text',
      bindable: true,
      defaultValue: 'Now delivering in select regions',
    },
    heroHeadline: {
      label: { en: 'Hero Headline' },
      type: 'Text',
      bindable: true,
      defaultValue: 'Farm-fresh produce, delivered weekly to your door',
    },
    heroSubheadline: {
      label: { en: 'Hero Subheadline' },
      type: 'Text',
      bindable: true,
      defaultValue: 'Skip the supermarket. Spread.co connects you directly with small-scale local farmers for genuinely fresh, seasonal produce every week.',
    },
    heroPrimaryLabel: {
      label: { en: 'Primary CTA Label' },
      type: 'Text',
      defaultValue: 'Check my area',
    },
    heroPrimaryUrl: {
      label: { en: 'Primary CTA URL' },
      type: 'Text',
      bindable: true,
      defaultValue: '/signin',
    },
    heroSecondaryLabel: {
      label: { en: 'Secondary CTA Label' },
      type: 'Text',
      defaultValue: 'Learn more',
    },
    heroSecondaryUrl: {
      label: { en: 'Secondary CTA URL' },
      type: 'Text',
      bindable: true,
      defaultValue: '/about',
    },
    heroImageUrl: {
      label: { en: 'Hero Image URL' },
      type: 'Text',
      bindable: true,
      defaultValue: '',
    },

    // Value props
    showValueProps: {
      label: { en: 'Show Value Propositions' },
      type: 'OnOff',
      defaultValue: true,
    },
    valuePropHeadline: {
      label: { en: 'Value Props Headline' },
      type: 'Text',
      bindable: true,
      defaultValue: 'Why Spread?',
    },
    valueProps: {
      label: { en: 'Value Props' },
      type: 'Array',
      bindable: true,
      defaultValue: [
        { icon: 'farm', title: 'Direct from farms', body: 'We partner with 40+ local growers. You get produce harvested within 48 hours of delivery.' },
        { icon: 'calendar', title: 'Weekly & reliable', body: 'Set up once and get fresh produce every week. Pause or skip anytime, no hassle.' },
        { icon: 'price', title: 'Fair prices', body: 'Farm-gate pricing means better quality for you, fairer returns for growers.' },
        { icon: 'eco', title: 'Low waste', body: 'Reusable crates, seasonal menus, and zero landfill for unsold produce.' },
      ],
      options: {
        item: {
          type: 'Object',
          defaultValue: { icon: 'farm', title: '', body: '' },
          options: {
            fields: [
              { key: 'icon',  label: { en: 'Icon (farm/calendar/price/eco/leaf/heart/star)' }, type: 'Text' },
              { key: 'title', label: { en: 'Title' }, type: 'Text' },
              { key: 'body',  label: { en: 'Body' },  type: 'LongText' },
            ],
          },
        },
      },
    },

    // How it works
    showHowItWorks: {
      label: { en: 'Show How It Works' },
      type: 'OnOff',
      defaultValue: true,
    },
    howHeadline: {
      label: { en: 'How It Works Headline' },
      type: 'Text',
      bindable: true,
      defaultValue: 'How it works',
    },
    steps: {
      label: { en: 'Steps' },
      type: 'Array',
      bindable: true,
      defaultValue: [
        { number: '1', title: 'Check your area', body: 'Enter your postcode to see if delivery is available in your region.' },
        { number: '2', title: 'Choose a plan', body: 'Pick a membership tier that suits your household size and budget.' },
        { number: '3', title: 'Customise your box', body: 'Browse seasonal produce and add your favourites to your weekly cart.' },
        { number: '4', title: 'We deliver, fresh', body: 'Your order arrives on your nominated day, packed in our reusable crates.' },
      ],
      options: {
        item: {
          type: 'Object',
          defaultValue: { number: '', title: '', body: '' },
          options: {
            fields: [
              { key: 'number', label: { en: 'Step Number' }, type: 'Text' },
              { key: 'title',  label: { en: 'Title' },       type: 'Text' },
              { key: 'body',   label: { en: 'Body' },        type: 'LongText' },
            ],
          },
        },
      },
    },

    // Social proof
    showSocialProof: {
      label: { en: 'Show Social Proof Bar' },
      type: 'OnOff',
      defaultValue: true,
    },
    rating: {
      label: { en: 'Rating (e.g. 4.9)' },
      type: 'Text',
      defaultValue: '4.9',
    },
    reviewCount: {
      label: { en: 'Review Count (e.g. 2,400+)' },
      type: 'Text',
      defaultValue: '2,400+',
    },
    socialProofText: {
      label: { en: 'Social Proof Text' },
      type: 'Text',
      defaultValue: 'households across Australia trust Spread',
    },

    // Bottom CTA
    showBottomCta: {
      label: { en: 'Show Bottom CTA' },
      type: 'OnOff',
      defaultValue: true,
    },
    bottomCtaHeadline: {
      label: { en: 'Bottom CTA Headline' },
      type: 'Text',
      bindable: true,
      defaultValue: 'Ready for real food?',
    },
    bottomCtaBody: {
      label: { en: 'Bottom CTA Body' },
      type: 'Text',
      bindable: true,
      defaultValue: 'Check availability in your region and get your first delivery this week.',
    },
    bottomCtaLabel: {
      label: { en: 'Bottom CTA Button Label' },
      type: 'Text',
      defaultValue: 'Get started — it\'s free to check',
    },
    bottomCtaUrl: {
      label: { en: 'Bottom CTA URL' },
      type: 'Text',
      bindable: true,
      defaultValue: '/signin',
    },

    // ── Stats bar ──────────────────────────────────────────────────────────
    showStats: {
      label: { en: 'Show Stats Bar' },
      type: 'OnOff',
      defaultValue: true,
    },
    stats: {
      label: { en: 'Stat Items' },
      type: 'Array',
      bindable: true,
      defaultValue: [
        { number: '40+',   label: 'Partner farms' },
        { number: '5,000+', label: 'Households served' },
        { number: '3',     label: 'Regions' },
        { number: '48h',   label: 'Farm to door' },
      ],
      options: {
        expandable: true,
        getItemLabel(item) { return item?.label || 'Stat'; },
        item: {
          type: 'Object',
          defaultValue: { number: '', label: '' },
          options: {
            item: {
              number: { label: { en: 'Number / Value' }, type: 'Text' },
              label:  { label: { en: 'Label'          }, type: 'Text' },
            },
          },
        },
      },
    },

    // ── Farm story ─────────────────────────────────────────────────────────
    showFarmStory: {
      label: { en: 'Show Farm Story Section' },
      type: 'OnOff',
      defaultValue: true,
    },
    farmsEyebrow: {
      label: { en: 'Farm Section Eyebrow' },
      type: 'Text',
      bindable: true,
      defaultValue: 'Our farm network',
    },
    farmsHeadline: {
      label: { en: 'Farm Section Headline' },
      type: 'Text',
      bindable: true,
      defaultValue: 'Real farms, real people',
    },
    farmsBody: {
      label: { en: 'Farm Section Body' },
      type: 'Text',
      bindable: true,
      defaultValue: 'We partner exclusively with small-scale, sustainable growers who share our belief that good food starts from healthy soil and fair practice.',
    },
    farmPartners: {
      label: { en: 'Farm Partners' },
      type: 'Array',
      bindable: true,
      defaultValue: [
        { name: 'Sunrise Organics',  region: 'Hunter Valley, NSW', description: 'Certified organic fruit and vegetables grown without synthetic inputs since 1998.', imageUrl: '' },
        { name: 'Red Hill Farm',     region: 'Mornington Peninsula, VIC', description: 'Heritage-variety stone fruits and seasonal greens from a family-run property.', imageUrl: '' },
        { name: 'Valley Floor Co.',  region: 'Yarra Valley, VIC', description: 'Pasture-raised eggs, artisan preserves, and rare-breed pork raised with care.', imageUrl: '' },
      ],
      options: {
        expandable: true,
        getItemLabel(item) { return item?.name || 'Farm'; },
        item: {
          type: 'Object',
          defaultValue: { name: '', region: '', description: '', imageUrl: '' },
          options: {
            item: {
              name:        { label: { en: 'Farm Name'    }, type: 'Text' },
              region:      { label: { en: 'Region'       }, type: 'Text' },
              description: { label: { en: 'Description'  }, type: 'Text' },
              imageUrl:    { label: { en: 'Image URL'    }, type: 'Text' },
            },
          },
        },
      },
    },

    portalTarget: {
      label: { en: 'Portal Target' },
      type: 'Text',
      bindable: true,
      hidden: true,
      defaultValue: '',
    },
  },
  triggerEvents: [
    {
      name: 'home:hero-cta-primary',
      label: { en: 'On Hero Primary CTA Clicked' },
      event: {},
    },
    {
      name: 'home:hero-cta-secondary',
      label: { en: 'On Hero Secondary CTA Clicked' },
      event: {},
    },
    {
      name: 'home:bottom-cta',
      label: { en: 'On Bottom CTA Clicked' },
      event: {},
    },
    {
      name: 'home:alert-dismissed',
      label: { en: 'On Live Alert Dismissed' },
      event: { alertId: '', headline: '' },
    },
  ],
};
