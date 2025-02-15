function extractDomain(origin: string): string {
  try {
    const url = new URL(origin);
    return url.host;
  } catch {
    throw new Error('Invalid origin format');
  }
}

export function compareOriginWithDomain(
  origin: string,
  domain: string,
): boolean {
  const extractedDomain = extractDomain(origin);
  return extractedDomain === domain;
}
