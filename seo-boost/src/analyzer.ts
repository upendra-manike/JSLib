/**
 * SEO Analyzer
 * Analyzes page SEO quality and provides recommendations
 */

export interface SEOAnalysis {
  score: number;
  issues: SEOIssue[];
  recommendations: string[];
  passed: string[];
}

export interface SEOIssue {
  type: 'error' | 'warning' | 'info';
  message: string;
  element?: string;
  fix?: string;
}

export interface AnalyzerConfig {
  checkTitle?: boolean;
  checkDescription?: boolean;
  checkOpenGraph?: boolean;
  checkTwitter?: boolean;
  checkCanonical?: boolean;
  checkStructuredData?: boolean;
  checkImages?: boolean;
  checkHeadings?: boolean;
  minTitleLength?: number;
  maxTitleLength?: number;
  minDescriptionLength?: number;
  maxDescriptionLength?: number;
}

/**
 * Analyze current page SEO
 */
export function analyzeSEO(config: AnalyzerConfig = {}): SEOAnalysis {
  if (typeof document === 'undefined') {
    return {
      score: 0,
      issues: [{ type: 'error', message: 'Analysis requires DOM access' }],
      recommendations: [],
      passed: [],
    };
  }

  const issues: SEOIssue[] = [];
  const recommendations: string[] = [];
  const passed: string[] = [];
  let score = 100;

  const {
    checkTitle = true,
    checkDescription = true,
    checkOpenGraph = true,
    checkTwitter = true,
    checkCanonical = true,
    checkStructuredData = true,
    checkImages = true,
    checkHeadings = true,
    minTitleLength = 30,
    maxTitleLength = 60,
    minDescriptionLength = 120,
    maxDescriptionLength = 160,
  } = config;

  // Check title
  if (checkTitle) {
    const title = document.title;
    if (!title || title.trim() === '') {
      issues.push({
        type: 'error',
        message: 'Missing page title',
        fix: 'Add a descriptive title tag',
      });
      score -= 10;
    } else if (title.length < minTitleLength) {
      issues.push({
        type: 'warning',
        message: `Title too short (${title.length} chars, recommended: ${minTitleLength}-${maxTitleLength})`,
        element: 'title',
        fix: `Extend title to ${minTitleLength}-${maxTitleLength} characters`,
      });
      score -= 5;
    } else if (title.length > maxTitleLength) {
      issues.push({
        type: 'warning',
        message: `Title too long (${title.length} chars, recommended: ${minTitleLength}-${maxTitleLength})`,
        element: 'title',
        fix: `Shorten title to ${minTitleLength}-${maxTitleLength} characters`,
      });
      score -= 3;
    } else {
      passed.push('Title is well-optimized');
    }
  }

  // Check meta description
  if (checkDescription) {
    const description = document.querySelector('meta[name="description"]')?.getAttribute('content');
    if (!description || description.trim() === '') {
      issues.push({
        type: 'error',
        message: 'Missing meta description',
        fix: 'Add a compelling meta description',
      });
      score -= 10;
    } else if (description.length < minDescriptionLength) {
      issues.push({
        type: 'warning',
        message: `Description too short (${description.length} chars, recommended: ${minDescriptionLength}-${maxDescriptionLength})`,
        element: 'meta[name="description"]',
        fix: `Extend description to ${minDescriptionLength}-${maxDescriptionLength} characters`,
      });
      score -= 5;
    } else if (description.length > maxDescriptionLength) {
      issues.push({
        type: 'warning',
        message: `Description too long (${description.length} chars, recommended: ${minDescriptionLength}-${maxDescriptionLength})`,
        element: 'meta[name="description"]',
        fix: `Shorten description to ${minDescriptionLength}-${maxDescriptionLength} characters`,
      });
      score -= 3;
    } else {
      passed.push('Meta description is well-optimized');
    }
  }

  // Check Open Graph
  if (checkOpenGraph) {
    const ogTitle = document.querySelector('meta[property="og:title"]');
    const ogDescription = document.querySelector('meta[property="og:description"]');
    const ogImage = document.querySelector('meta[property="og:image"]');
    const ogUrl = document.querySelector('meta[property="og:url"]');

    if (!ogTitle) {
      issues.push({
        type: 'warning',
        message: 'Missing Open Graph title',
        fix: 'Add og:title meta tag for better social sharing',
      });
      score -= 3;
    } else {
      passed.push('Open Graph title present');
    }

    if (!ogDescription) {
      issues.push({
        type: 'warning',
        message: 'Missing Open Graph description',
        fix: 'Add og:description meta tag',
      });
      score -= 3;
    } else {
      passed.push('Open Graph description present');
    }

    if (!ogImage) {
      issues.push({
        type: 'warning',
        message: 'Missing Open Graph image',
        fix: 'Add og:image meta tag for better social sharing',
      });
      score -= 5;
    } else {
      passed.push('Open Graph image present');
    }

    if (!ogUrl) {
      issues.push({
        type: 'info',
        message: 'Missing Open Graph URL',
        fix: 'Add og:url meta tag',
      });
      score -= 1;
    }
  }

  // Check Twitter Cards
  if (checkTwitter) {
    const twitterCard = document.querySelector('meta[name="twitter:card"]');
    if (!twitterCard) {
      issues.push({
        type: 'info',
        message: 'Missing Twitter Card',
        fix: 'Add twitter:card meta tag for better Twitter sharing',
      });
      score -= 2;
    } else {
      passed.push('Twitter Card present');
    }
  }

  // Check canonical
  if (checkCanonical) {
    const canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      issues.push({
        type: 'warning',
        message: 'Missing canonical URL',
        fix: 'Add canonical link to prevent duplicate content issues',
      });
      score -= 5;
    } else {
      passed.push('Canonical URL present');
    }
  }

  // Check structured data
  if (checkStructuredData) {
    const jsonLd = document.querySelector('script[type="application/ld+json"]');
    if (!jsonLd) {
      issues.push({
        type: 'info',
        message: 'No structured data (JSON-LD) found',
        fix: 'Add JSON-LD structured data for better search understanding',
      });
      score -= 3;
    } else {
      passed.push('Structured data present');
    }
  }

  // Check images
  if (checkImages) {
    const images = document.querySelectorAll('img');
    let imagesWithoutAlt = 0;
    images.forEach((img) => {
      if (!img.getAttribute('alt')) {
        imagesWithoutAlt++;
      }
    });

    if (imagesWithoutAlt > 0) {
      issues.push({
        type: 'warning',
        message: `${imagesWithoutAlt} image(s) missing alt text`,
        fix: 'Add descriptive alt text to all images',
      });
      score -= Math.min(imagesWithoutAlt * 2, 10);
    } else if (images.length > 0) {
      passed.push('All images have alt text');
    }
  }

  // Check headings
  if (checkHeadings) {
    const h1 = document.querySelectorAll('h1');
    if (h1.length === 0) {
      issues.push({
        type: 'warning',
        message: 'Missing H1 heading',
        fix: 'Add a single H1 heading to the page',
      });
      score -= 5;
    } else if (h1.length > 1) {
      issues.push({
        type: 'warning',
        message: `Multiple H1 headings found (${h1.length})`,
        fix: 'Use only one H1 heading per page',
      });
      score -= 3;
    } else {
      passed.push('H1 heading structure is correct');
    }
  }

  // Generate recommendations
  if (score < 80) {
    recommendations.push('Focus on fixing critical issues first (errors)');
  }
  if (score < 90) {
    recommendations.push('Address warnings to improve SEO score');
  }
  if (issues.filter((i) => i.type === 'error').length > 0) {
    recommendations.push('Fix all errors before publishing');
  }

  return {
    score: Math.max(0, Math.min(100, score)),
    issues,
    recommendations,
    passed,
  };
}

