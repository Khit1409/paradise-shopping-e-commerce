export function createProductSlug(name: string) {
  const result = name
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9]/g, '')
    .split(' ')
    .join('-');

  return result;
}
