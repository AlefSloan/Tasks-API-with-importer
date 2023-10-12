export function buildRoutePath(path) {
  const pathParametersRegex = /:([a-zA-Z]+)/g
  const replacePathParameters = path.replaceAll(pathParametersRegex, '(?<$1>[a-z0-9\-_]+)')

  const pathRegex = new RegExp(`^${replacePathParameters}(?<query>\\?(.*))?$`);

  return pathRegex;
}