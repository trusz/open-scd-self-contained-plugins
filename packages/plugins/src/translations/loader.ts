import { de } from './de.js';
import { en } from './en.js';
import { Language } from '../settings.js';

// Export languages directly for use in all packages
export const languages = { en, de };

export type Translations = typeof en;

export async function loader(lang: string): Promise<Record<string, string>> {
  if (Object.keys(languages).includes(lang)) return languages[<Language>lang];
  else return {};
}
