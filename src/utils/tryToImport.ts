export async function tryToImport(path: string) {
  try {
    return await import(path);
  } catch (error) {
    return false;
  }
}
