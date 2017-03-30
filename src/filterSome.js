export default function filterSome(filters) {
  return function(ring, interior) {
    return filters.some(function(filter) {
      return filter(ring, interior);
    });
  };
}
