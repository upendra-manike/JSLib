/**
 * Sitemap Generator
 * Generates XML sitemaps for better search engine indexing
 */

export interface SitemapUrl {
  loc: string;
  lastmod?: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}

export interface SitemapConfig {
  urls: SitemapUrl[];
  xmlns?: string;
}

/**
 * Generate XML sitemap string
 */
export function generateSitemap(config: SitemapConfig): string {
  const xmlns = config.xmlns || 'http://www.sitemaps.org/schemas/sitemap/0.9';
  
  const urls = config.urls.map((url) => {
    const parts = [`  <url>`];
    parts.push(`    <loc>${escapeXml(url.loc)}</loc>`);
    
    if (url.lastmod) {
      parts.push(`    <lastmod>${escapeXml(url.lastmod)}</lastmod>`);
    }
    
    if (url.changefreq) {
      parts.push(`    <changefreq>${url.changefreq}</changefreq>`);
    }
    
    if (url.priority !== undefined) {
      parts.push(`    <priority>${url.priority}</priority>`);
    }
    
    parts.push(`  </url>`);
    return parts.join('\n');
  });

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="${xmlns}">
${urls.join('\n')}
</urlset>`;
}

/**
 * Escape XML special characters
 */
function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

/**
 * Generate robots.txt content
 */
export interface RobotsConfig {
  userAgents?: Array<{
    agent: string;
    allow?: string[];
    disallow?: string[];
    crawlDelay?: number;
  }>;
  sitemap?: string | string[];
}

export function generateRobotsTxt(config: RobotsConfig): string {
  const lines: string[] = [];

  if (config.userAgents && config.userAgents.length > 0) {
    config.userAgents.forEach((ua) => {
      lines.push(`User-agent: ${ua.agent}`);
      
      if (ua.allow) {
        ua.allow.forEach((path) => {
          lines.push(`Allow: ${path}`);
        });
      }
      
      if (ua.disallow) {
        ua.disallow.forEach((path) => {
          lines.push(`Disallow: ${path}`);
        });
      }
      
      if (ua.crawlDelay) {
        lines.push(`Crawl-delay: ${ua.crawlDelay}`);
      }
      
      lines.push('');
    });
  } else {
    // Default: allow all
    lines.push('User-agent: *');
    lines.push('Allow: /');
    lines.push('');
  }

  if (config.sitemap) {
    const sitemaps = Array.isArray(config.sitemap) ? config.sitemap : [config.sitemap];
    sitemaps.forEach((sitemap) => {
      lines.push(`Sitemap: ${sitemap}`);
    });
  }

  return lines.join('\n');
}

/**
 * Format date for sitemap (ISO 8601)
 */
export function formatSitemapDate(date: Date = new Date()): string {
  return date.toISOString().split('T')[0];
}

