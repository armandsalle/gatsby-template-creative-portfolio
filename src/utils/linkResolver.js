export const linkResolver = doc => {
  // URL for home
  if (doc.type === "home") {
    return `/${doc.lang}`
  }

  // URL for a project
  if (doc.type === "project") {
    return `/${doc.lang}/${doc.uid}`
  }

  // Backup for all other types
  return "/"
}
