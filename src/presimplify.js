import {transform} from "topojson-client";
import newHeap from "./heap.js";
import {planarTriangleArea} from "./planar.js";

function copy(point) {
  return [point[0], point[1], 0];
}

export default function(topology, weight) {
  var point = topology.transform ? transform(topology.transform) : copy,
      heap = newHeap();

  if (weight == null) weight = planarTriangleArea;

  var arcs = topology.arcs.map(function(arc) {
    var triangles = [],
        maxWeight = 0,
        triangle,
        i,
        n;

    arc = arc.map(point);

    for (i = 1, n = arc.length - 1; i < n; ++i) {
      triangle = [arc[i - 1], arc[i], arc[i + 1]];
      triangle[1][2] = weight(triangle);
      triangles.push(triangle);
      heap.push(triangle);
    }

    // Always keep the arc endpoints!
    arc[0][2] = arc[n][2] = Infinity;

    for (i = 0, n = triangles.length; i < n; ++i) {
      triangle = triangles[i];
      triangle.previous = triangles[i - 1];
      triangle.next = triangles[i + 1];
    }

    while (triangle = heap.pop()) {
      var previous = triangle.previous,
          next = triangle.next;

      // If the weight of the current point is less than that of the previous
      // point to be eliminated, use the latter’s weight instead. This ensures
      // that the current point cannot be eliminated without eliminating
      // previously- eliminated points.
      if (triangle[1][2] < maxWeight) triangle[1][2] = maxWeight;
      else maxWeight = triangle[1][2];

      if (previous) {
        previous.next = next;
        previous[2] = triangle[2];
        update(previous);
      }

      if (next) {
        next.previous = previous;
        next[0] = triangle[0];
        update(next);
      }
    }

    return arc;
  });

  for (const key in topology.objects) {
    topology.objects[key] = unquantizeGeometry(topology.objects[key]);
  }

  function update(triangle) {
    heap.remove(triangle);
    triangle[1][2] = weight(triangle);
    heap.push(triangle);
  }

  function unquantizeGeometry(input) {
    var output;
    switch (input.type) {
      case "GeometryCollection": output = {type: "GeometryCollection", geometries: input.geometries.map(unquantizeGeometry)}; break;
      case "Point": output = {type: "Point", coordinates: point(input.coordinates)}; break;
      case "MultiPoint": output = {type: "MultiPoint", coordinates: input.coordinates.map(point)}; break;
      default: return input;
    }
    if (input.id != null) output.id = input.id;
    if (input.bbox != null) output.bbox = input.bbox;
    if (input.properties != null) output.properties = input.properties;
    return output;
  }

  return {
    type: "Topology",
    bbox: topology.bbox,
    objects: topology.objects,
    arcs: arcs
  };
}
