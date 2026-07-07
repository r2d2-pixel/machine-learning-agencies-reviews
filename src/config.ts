export const SITE = {
  name:          'Best Machine Learning Agencies',
  domain:        'machine-learning-agencies-reviews.com',
  url:           'https://machine-learning-agencies-reviews.com',
  tagline:       'Independent reviews of machine learning agencies',
  description:   'Find and compare the best machine learning agencies. Independent reviews, verified data, pricing ranges, and side-by-side comparisons of 36 top ML firms. Updated July 2026.',
  locale:        'en_US',
  twitterHandle: '',
  lastReviewed:  'July 2026',
};

export const NICHE = {
  label:          'Machine Learning',
  providerLabel:  'agency',
  providersLabel: 'agencies',
  verticalSlug:   'machine-learning',
};

export const BRANDING = {
  primaryColor: '#d97706',
  logoText:     'Best Machine Learning Agencies',
  logoPath:     '/logos/site-logo.svg',
};

export const MONETIZATION = {
  enabled: true,
  defaultRel: 'sponsored' as 'sponsored' | 'nofollow' | '',
  disclosurePath: '/affiliate-disclosure',
};

export const NAV = [
  { label: 'Home',        href: '/' },
  { label: 'Disclosure',  href: '/affiliate-disclosure/' },
];
