import { XMLParser } from 'fast-xml-parser';

// Check if a given date string is from today
const isToday = (dateString) => {
  if (!dateString) return false;
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return false; // invalid date

  const today = new Date();
  return (
    date.getUTCFullYear() === today.getUTCFullYear() &&
    date.getUTCMonth() === today.getUTCMonth() &&
    date.getUTCDate() === today.getUTCDate()
  );
};

export const fetchTodaysArticles = async (feeds) => {
  const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: '',
    removeNSPrefix: true, // ✅ strip "dc:" so it's easier to read
  });

  const results = [];

  for (const rssUrl of feeds) {
    try {
      const response = await fetch(rssUrl);
      const xmlText = await response.text();
      const jsonObj = parser.parse(xmlText);

      // Handle both RSS and RDF structures
      const items =
        jsonObj.rss?.channel?.item ||
        jsonObj['rdf:RDF']?.item ||
        jsonObj.RDF?.item ||
        [];

      const channelTitle =
        jsonObj?.rss?.channel?.title ||
        jsonObj?.['rdf:RDF']?.channel?.title ||
        jsonObj?.RDF?.channel?.title ||
        rssUrl;

      // Normalize items with date detection
      const normalized = items.map((item) => {
        const date =
          item.pubDate || item['dc:date'] || item.date || item.updated || null;
        return {
          source: channelTitle,
          title: item.title,
          link: item.link,
          pubDate: date,
          description: item.description || item.summary || '',
        };
      });

      // Filter today's only
      const todaysItems = normalized.filter((item) => isToday(item.pubDate));

      if (todaysItems.length > 0) {
        // Push the first one, or all if you prefer
        results.push(todaysItems[0]);
      }
    } catch (err) {
      console.error(`Failed to fetch or parse from ${rssUrl}`, err);
    }
  }

  return results;
};