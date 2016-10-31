import prune from "./prune";

export default function(topology, filter) {
  var name;

  if (filter == null) filter = filterTrue;

  function filterGeometry(o) {
    switch (o.type) {
      case "Polygon": {
        o.arcs = filterRings(o.arcs);
        if (!o.arcs) o.type = null, delete o.arcs;
        break;
      }
      case "MultiPolygon": {
        o.arcs = o.arcs.map(filterRings).filter(filterIdentity);
        if (!o.arcs.length) o.type = null, delete o.arcs;
        break;
      }
      case "GeometryCollection": {
        o.geometries.forEach(filterGeometry);
        o.geometries = o.geometries.filter(filterNotNull);
        if (!o.geometries.length) o.type = null, delete o.geometries;
        break;
      }
    }
  }

  function filterRings(arcs) {
    return arcs.length && filterExteriorRing(arcs[0]) // if the exterior is small, ignore any holes
        ? [arcs.shift()].concat(arcs.filter(filterInteriorRing))
        : null;
  }

  function filterExteriorRing(ring) {
    return filter(ring, false);
  }

  function filterInteriorRing(ring) {
    return filter(ring, true);
  }

  for (name in topology.objects) {
    filterGeometry(topology.objects[name]);
  }

  return prune(topology);
}

function filterTrue() {
  return true;
}

function filterIdentity(x) {
  return x;
}

function filterNotNull(geometry) {
  return geometry.type != null;
}
