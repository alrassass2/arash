/**
 * Arabic Normalization & Letter-Sensitive Search Engine for زجاج سكريت ابوعريش
 * Optimizes Google SEO ranking, letter tolerance (همزة، تاء مربوطة، مسافات، تشكيل),
 * and connects all 26 official keywords across all articles, tags, and search bars.
 */

export const OFFICIAL_SEO_KEYWORDS: string[] = [
  "زجاج سكريت ابوعريش",
  "محلات زجاج سكريت ابو عريش",
  "معلم زجاج سكريت ابو عريش",
  "تركيب واجهات زجاج ابو عريش",
  "ابواب زجاج سيكوريت ابو عريش",
  "كبائن شاور ابو عريش",
  "بلكونات زجاج ابو عريش",
  "استركشر زجاج جازان",
  "صيانة ابواب زجاج ابو عريش",
  "افضل ورشة زجاج بابوعريش",
  "الزجاج السيكوريت",
  "زجاج سكريت",
  "الزجاج سكريت",
  "سكريت",
  "زجاج سكريت جيزان",
  "زجاج سكريت جازان",
  "زجاج سكريت أبو عريش",
  "زجاج جيزان",
  "الواجهات الزجاجية",
  "واجهات زجاجية",
  "واجهات زجاج فلل",
  "واجهات محلات",
  "تركيب زجاج واجهات",
  "صيانة واجهات زجاج",
  "استركشر زجاج",
  "أبواب زجاجية"
];

/**
 * Normalizes Arabic text for letter-sensitive and spelling-tolerant comparison:
 * - Maps all forms of Alef (أ, إ, آ, ٱ) to simple Alef (ا)
 * - Maps Taa Marbuta (ة) to Haa (ه)
 * - Maps Alef Maqsura (ى) to Yaa (ي)
 * - Removes all Tashkeel / Harakat (َ, ً, ُ, ٌ, ِ, ٍ, ّ, ْ)
 * - Removes Tatweel (ـ)
 * - Handles spaces between (ابو عريش / ابوعريش / بابوعريش)
 */
export function normalizeArabic(text: string): string {
  if (!text) return '';
  return text
    .toLowerCase()
    // Remove Tashkeel (harakat)
    .replace(/[\u064B-\u065F\u0670]/g, '')
    // Remove Tatweel / Kashida
    .replace(/\u0640/g, '')
    // Normalize Alef variants
    .replace(/[أإآٱ]/g, 'ا')
    // Normalize Taa Marbuta
    .replace(/ة/g, 'ه')
    // Normalize Alef Maqsura
    .replace(/ى/g, 'ي')
    // Normalize Waw with Hamza
    .replace(/ؤ/g, 'و')
    // Normalize Yaa with Hamza
    .replace(/ئ/g, 'ي')
    // Standardize Abu Arish spacing variants
    .replace(/ابو\s*عريش/g, 'ابوعريش')
    .replace(/بابوعريش/g, 'ابوعريش')
    .replace(/بأبو\s*عريش/g, 'ابوعريش')
    // Standardize Jizan / Jazan
    .replace(/جازان/g, 'جيزان')
    // Remove repeated spaces
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Letter-sensitive & token-sensitive search evaluator
 * Returns true if the target matches the user query or any query token.
 */
export function matchesArabicSearch(target: string, query: string): boolean {
  if (!query || !query.trim()) return true;
  if (!target) return false;

  const normTarget = normalizeArabic(target);
  const normQuery = normalizeArabic(query);

  // Exact or direct inclusion check
  if (normTarget.includes(normQuery)) return true;

  // Multi-token evaluation: any significant word match
  const queryTokens = normQuery.split(/\s+/).filter((t) => t.length > 1);
  if (queryTokens.length === 0) return true;

  // Check if all or most tokens match
  return queryTokens.some((token) => normTarget.includes(token));
}

/**
 * Enriches any article's category list with all matching official keywords
 */
export function enrichArticleKeywords(
  title: string,
  department: string,
  existingCategories: string[]
): string[] {
  const combined = `${title} ${department} ${existingCategories.join(' ')}`;
  const matched = OFFICIAL_SEO_KEYWORDS.filter((kw) => matchesArabicSearch(combined, kw));
  return Array.from(new Set([...existingCategories, ...matched]));
}
