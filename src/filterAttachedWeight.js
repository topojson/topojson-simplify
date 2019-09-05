import filterAttached from "./filterAttached.js";
import filterWeight from "./filterWeight.js";

export default function(topology, minWeight, weight) {
  var a = filterAttached(topology),
      w = filterWeight(topology, minWeight, weight);
  return function(ring, interior) {
    return a(ring, interior) || w(ring, interior);
  };
}
