/**
 * Centralized Logger Utility
 * 
 * Provides traceable backend failures without scattering raw console methods
 * throughout the codebase, compliant with Rule 28.
 */
export const Logger = {
  info: (message: string, context?: unknown) => {
    // In production, this could send to Datadog/Sentry
    console.info(`[INFO] ${message}`, context || "");
  },
  warn: (message: string, context?: unknown) => {
    console.warn(`[WARN] ${message}`, context || "");
  },
  error: (message: string, error?: unknown) => {
    console.error(`[ERROR] ${message}`, error || "");
  },
};
