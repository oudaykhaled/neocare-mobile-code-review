// Import markdown content from JS modules
import { overviewContent } from './content/overview';
import { securityContent } from './content/security';
import { errorboundariesContent } from './content/error-boundaries';
import { hardcodingContent } from './content/hardcoding';
import { materialdesignContent } from './content/material-design';
import { stylingContent } from './content/styling';
import { gitconflictsContent } from './content/git-conflicts';

export const documents = [
  {
    id: 'overview',
    title: 'Project Architecture Analysis',
    description: 'Comprehensive production readiness assessment of the NEOCARE healthcare mobile application.',
    severity: 'critical',
    score: 4.8,
    type: 'Overview Document',
    content: overviewContent
  },
  {
    id: 'security',
    title: 'Security Vulnerabilities',
    description: 'Critical security issues including exposed API keys, hardcoded credentials, and configuration vulnerabilities.',
    severity: 'critical',
    score: 1,
    type: 'Security Analysis',
    content: securityContent
  },
  {
    id: 'error-boundaries',
    title: 'No Error Boundaries',
    description: 'Complete lack of error handling causing app crashes. No error boundaries, crash reporting, or fallback UI.',
    severity: 'critical',
    score: 0,
    type: 'Error Handling',
    content: errorboundariesContent
  },
  {
    id: 'hardcoding',
    title: 'Extensive Hardcoding',
    description: 'Magic numbers, hardcoded strings, and values scattered throughout the codebase without constants.',
    severity: 'critical',
    score: 1,
    type: 'Code Quality',
    content: hardcodingContent
  },
  {
    id: 'material-design',
    title: 'No Material Design System',
    description: 'Absence of established design system. Custom components without Material Design foundation.',
    severity: 'critical',
    score: 0,
    type: 'Design System',
    content: materialdesignContent
  },
  {
    id: 'styling',
    title: 'Chaotic Styling Approach',
    description: 'Inconsistent styling patterns mixing inline styles, StyleSheet, and component props chaotically.',
    severity: 'critical',
    score: 3,
    type: 'Styling Architecture',
    content: stylingContent
  },
  {
    id: 'git-conflicts',
    title: 'Git Merge Conflicts',
    description: 'Unresolved merge conflicts in production files indicating poor version control practices.',
    severity: 'critical',
    score: 0,
    type: 'Version Control',
    content: gitconflictsContent
  }
];
