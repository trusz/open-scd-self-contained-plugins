import { en } from './translations/en.js';
import { de } from './translations/de.js';

/**
 * Translation utility module that replaces lit-translate
 * Can be used as a drop-in replacement for lit-translate's functions
 */

// Define supported language types
export type SupportedLanguage = 'en' | 'de';

// Define translation types without circular reference
export interface TranslationRecord {
  [key: string]: string | TranslationRecord;
}

// Create a languages object that contains all translation objects
const languages: Record<SupportedLanguage, TranslationRecord> = { en, de };

/**
 * Gets a translation string based on the current language.
 * This is a direct replacement for lit-translate's get function.
 *
 * @param key - The translation key (e.g., 'substation.missing')
 * @param params - Optional parameters for string interpolation (e.g., { name: 'value' })
 * @returns The translated string or the key itself if not found
 */
export function get(key: string, params?: Record<string, string>): string {
  const language = navigator.language.split('-')[0] || 'en';
  // Only use the language if it's one of our supported languages, otherwise fall back to English
  const lang = (language as SupportedLanguage) in languages
    ? (language as SupportedLanguage)
    : 'en';
  const translations = languages[lang];

  // Parse the key path (e.g., "substation.missing" -> translations.substation.missing)
  const path = key.split('.');
  let result: any = translations;
  for (const segment of path) {
    if (!result) return key;
    result = result[segment];
  }

  if (typeof result !== 'string') return key;

  // Handle parameter substitution if params are provided
  if (params) {
    return Object.entries(params).reduce<string>(
      (str, [paramKey, value]) => str.replace(new RegExp(`{{\\s*${paramKey}\\s*}}`, 'g'), value),
      result
    );
  }

  return result;
}

/**
 * Returns the current language code
 *
 * @returns The current language code (e.g., 'en' or 'de')
 */
export function getLocale(): string {
  return navigator.language.split('-')[0] || 'en';
}

/**
 * Empty implementation for backward compatibility
 * Replaces lit-translate's registerTranslateConfig
 */
export function registerTranslateConfig(_config: unknown): void {
  // No-op - just for compatibility
}

/**
 * Sets the active language
 * Replaces lit-translate's use function
 *
 * @param language - Language code to use
 */
export function use(language: string): void {
  // This functionality would be handled through the Settings component
  // and localStorage. This is just a stub for compatibility.
  // The actual language used is determined at runtime from navigator.language
  // or localStorage in the get function
}
