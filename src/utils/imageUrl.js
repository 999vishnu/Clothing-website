// Converts Google Drive share links to direct image links
export function getImageUrl(url) {
  if (!url) return '';
  const match = url.match(/drive.google.com\/file\/d\/(.*?)\//);
  if (match) {
    return `https://drive.google.com/uc?export=view&id=${match[1]}`;
  }
  return url;
}
