const usedHeadingIds = new Set<string>();

export const generateHeadingId = (text: string): string => {
  const baseId = text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w가-힣-]/g, '');

  let id = baseId;
  let counter = 1;

  while (usedHeadingIds.has(id)) {
    id = `${baseId}-${counter}`;
    counter += 1;
  }

  usedHeadingIds.add(id);
  return id;
};
