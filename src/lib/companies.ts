export type { Company } from '../data/companies';
export { companies, getCompany, getAllSlugs, getComparisons } from '../data/companies';
import { companies } from '../data/companies';

export function getCompanies() {
  return companies;
}

export const SERVICE_LABELS: Record<string, string> = {
  'custom-ml':            'Custom ML Development',
  'deep-learning':        'Deep Learning',
  'nlp':                  'NLP / Text Analytics',
  'computer-vision':      'Computer Vision',
  'mlops':                'MLOps & Model Deployment',
  'data-engineering':     'Data Engineering',
  'generative-ai':        'Generative AI',
  'predictive-analytics': 'Predictive Analytics',
  'ai-strategy':          'AI Strategy',
  'staff-aug':            'Staff Augmentation',
};
