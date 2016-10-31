export default function(topology) {
  var oldArcs = topology.arcs,
      newArcs = topology.arcs = [],
      newArcIndex = -1,
      newIndexByOldIndex = new Array(oldArcs.length),
      name;

  function pruneGeometry(o) {
    switch (o.type) {
      case "GeometryCollection": o.geometries.forEach(pruneGeometry); break;
      case "LineString": pruneArcs(o.arcs); break;
      case "MultiLineString": o.arcs.forEach(pruneArcs); break;
      case "Polygon": o.arcs.forEach(pruneArcs); break;
      case "MultiPolygon": o.arcs.forEach(pruneMultiArcs); break;
    }
  }

  function pruneArcs(arcs) {
    for (var i = 0, n = arcs.length; i < n; ++i) {
      var oldIndex = arcs[i],
          oldReverse = oldIndex < 0 && (oldIndex = ~oldIndex, true),
          newIndex;

      // If this is the first instance of this arc,
      // record it under its new index.
      if ((newIndex = newIndexByOldIndex[oldIndex]) == null) {
        newIndexByOldIndex[oldIndex] = newIndex = ++newArcIndex;
        newArcs[newIndex] = oldArcs[oldIndex];
      }

      arcs[i] = oldReverse ? ~newIndex : newIndex;
    }
  }

  function pruneMultiArcs(arcs) {
    arcs.forEach(pruneArcs);
  }

  for (name in topology.objects) {
    pruneGeometry(topology.objects[name]);
  }

  return topology;
}
