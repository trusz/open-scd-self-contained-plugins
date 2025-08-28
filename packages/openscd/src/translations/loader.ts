import { de } from './de.js';
import { en } from './en.js';
import { Language } from '@openscd/core/foundation/deprecated/settings';
export const languages = { en, de };

/**
 * Recursive type for translations that can have nested sections
 */
export type TranslationValue = string | { [key: string]: TranslationValue };

/**
 * Type definition for translation collections
 */
export type Translations = {
  [section: string]: TranslationValue;
};

export async function loader(lang: string): Promise<Translations> {
  if (Object.keys(languages).includes(lang)) return languages[lang as Language];
  else return {};
}
