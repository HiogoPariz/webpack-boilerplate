export function getFileName(file) {
  const splitted = file.uri.split('/')
  return splitted[splitted.length - 1]
}
