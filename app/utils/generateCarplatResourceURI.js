/*
 * ex).
 *  1. generateCarplatResourceURI(['reservations'], []) // 'reservations'
 *  2. generateCarplatResourceURI(['reservations', 'users'], ['ABC']) // 'reservations/ABC/users'
 *
 */
function generateCarplatResourceURI(resources = [], uids = []) {
  return resources
    .reduce((acc, resource, index) => {
      if (resource) {
        acc.push(resource);
      }

      if (uids[index]) {
        acc.push(uids[index]);
      }

      return acc;
    }, [])
    .join('/');
}

export function getKey(resources, key = 'global') {
  const resourceUids = resources.map(() => 'uid');

  return `${key}/${generateCarplatResourceURI(resources, resourceUids)}`;
}

export default generateCarplatResourceURI;
