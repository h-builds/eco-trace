/**
 * Environment helpers for the Consumer App
 */

export const getAdminUrl = (): string => {
  return import.meta.env.VITE_ADMIN_URL || 'http://localhost:3000';
};

export const getCaseStudyUrl = (): string => {
  return import.meta.env.VITE_CASE_STUDY_URL || '#';
};
