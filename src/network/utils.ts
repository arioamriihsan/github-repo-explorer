/**
 * Create query param from object
 *
 * ex: { hello: 'world', make: "right" } => hello=world&make=right
 * @param obj
 * @returns {string}
 */
export const serializeParam = (obj: Record<string, any> = {}): string => {
  const str: string[] = [];

  Object.keys(obj)
    .sort()
    .forEach((key) => {
      str.push(`${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`);
    });

  return str.join('&');
};
