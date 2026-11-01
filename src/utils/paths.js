// Resolves files in /public so the site also works when deployed under a sub-path.
export const publicUrl = (path) => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`
