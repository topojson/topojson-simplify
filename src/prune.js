export default function(topology) {
  var oldObjects = topology.objects,
      newObjects = {},
      oldArcs = topology.arcs,
      newArcs = [],
      newArcIndex = -1,
      newIndexByOldIndex = new Array(oldArcs.length),
      key;

  function pruneGeometry(input) {
    var output;
    switch (input.type) {
      case "GeometryCollection": output = {type: "GeometryCollection", geometries: input.geometries.map(pruneGeometry)}; break;
      case "LineString": output = {type: "LineString", arcs: pruneArcs(input.arcs)}; break;
      case "MultiLineString": output = {type: "MultiLineString", arcs: input.arcs.map(pruneArcs)}; break;
      case "Polygon": output = {type: "Polygon", arcs: input.arcs.map(pruneArcs)}; break;
      case "MultiPolygon": output = {type: "MultiPolygon", arcs: input.arcs.map(pruneMultiArcs)}; break;
      default: return input;
    }
    if (input.id != null) output.id = input.id;
    if (input.bbox != null) output.bbox = input.bbox;
    if (input.properties != null) output.properties = input.properties;
    return output;
  }

  function pruneArc(oldIndex) {
    var oldReverse = oldIndex < 0 && (oldIndex = ~oldIndex, true), newIndex;

    // If this is the first instance of this arc, record it under its new index.
    if ((newIndex = newIndexByOldIndex[oldIndex]) == null) {
      newIndexByOldIndex[oldIndex] = newIndex = ++newArcIndex;
      newArcs[newIndex] = oldArcs[oldIndex];
    }

    return oldReverse ? ~newIndex : newIndex;
  }

  function pruneArcs(arcs) {
    return arcs.map(pruneArc);
  }

  function pruneMultiArcs(arcs) {
    return arcs.map(pruneArcs);
  }

  for (key in oldObjects) {
    newObjects[key] = pruneGeometry(oldObjects[key]);
  }

  return {
    type: "Topology",
    bbox: topology.bbox,
    transform: topology.transform,
    objects: newObjects,
    arcs: newArcs
  };
}
