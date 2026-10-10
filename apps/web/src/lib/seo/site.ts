const SITE_NAME = "Zhaonan Wang";
const SITE_TITLE =
  "The personal website of Zhaonan Wang. Writing, photographs, projects and collected observations.";
const SITE_LANGUAGE = "en-GB";
const SITE_LOCALE = "en_GB";
const SITE_URL = new URL("https://zhaonanw.com");
const WRITING_FEED_PATH = "/writing/feed.xml";
const SOCIAL_LINKS: readonly string[] = [];

const getAbsoluteUrl = (path: string | URL): string => new URL(path, SITE_URL).toString();

const RSS_ALTERNATES = {
  "application/rss+xml": WRITING_FEED_PATH,
} as const;

export {
  getAbsoluteUrl,
  RSS_ALTERNATES,
  SITE_LANGUAGE,
  SITE_LOCALE,
  SITE_NAME,
  SITE_TITLE,
  SITE_URL,
  SOCIAL_LINKS,
  WRITING_FEED_PATH,
};
