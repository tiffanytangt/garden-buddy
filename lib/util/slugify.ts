export const slugify = (name: string, { addHash: appendHash = false } = {}) => {
  const slug = name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');

  return appendHash
    ? `${slug}-${Math.random().toString(36).substring(2, 6)}-${Math.random().toString(36).substring(2, 6)}`
    : slug;
};