/**
 * Create query param from object
 * 
 * @param obj
 * @returns {string}
 * @example { hello: 'world', make: 'right' } => hello=world&make=right
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
