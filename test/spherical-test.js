var tape = require("tape"),
    topojson = require("../");

require("./inDelta");

tape("topojson.sphericalRingArea(ring) returns the area of the specified ring", function(test) {
  test.inDelta(topojson.sphericalRingArea([[0, 0], [0, 0.1], [0.1, 0], [0, 0]]), 0.000001523087872198469);
  test.inDelta(topojson.sphericalRingArea([[-64.66070178517852, 18.33986913231323], [-64.66079715091509, 18.33994007490749], [-64.66074946804680, 18.33994007490749], [-64.66070178517852, 18.33986913231323]]), 4.89051671736539e-13);
  test.inDelta(topojson.sphericalRingArea([[0, 0], [0, 90], [90, 0], [0, 0]]), Math.PI / 2);
  test.inDelta(topojson.sphericalRingArea([[0, 0], [0, 90], [90, 0], [0, -90], [0, 0]]), Math.PI);
  test.inDelta(topojson.sphericalRingArea([[0, 0], [-90, 0], [180, 0], [90, 0], [0, 0]]), 2 * Math.PI);
  test.inDelta(topojson.sphericalRingArea([[0, 0], [90, 0], [180, 0], [-90, 0], [0, 0]]), 2 * Math.PI);
  test.inDelta(topojson.sphericalRingArea([[0, 0], [0, 90], [180, 0], [0, -90], [0, 0]]), 2 * Math.PI);
  test.inDelta(topojson.sphericalRingArea([[0, 0], [0, -90], [180, 0], [0, 90], [0, 0]]), 2 * Math.PI);
  test.end();
});

tape("topojson.sphericalRingArea(ring) does care about winding order", function(test) {
  test.inDelta(topojson.sphericalRingArea([[0, 0], [0.1, 0], [0, 0.1], [0, 0]]), 12.5663690912713);
  test.inDelta(topojson.sphericalRingArea([[0, 0], [0, 90], [90, 0], [0, 0]].reverse()), 4 * Math.PI - Math.PI / 2);
  test.inDelta(topojson.sphericalRingArea([[0, 0], [0, 90], [90, 0], [0, -90], [0, 0]].reverse()), 3 * Math.PI);
  test.inDelta(topojson.sphericalRingArea([[0, 0], [-90, 0], [180, 0], [90, 0], [0, 0]].reverse()), 2 * Math.PI);
  test.end();
});

tape("topojson.sphericalTriangleArea(triangle) returns the area of the specified triangle", function(test) {
  test.inDelta(topojson.sphericalTriangleArea([[0, 0], [0, 0.1], [0.1, 0]]), 0.000001523087872198469);
  test.inDelta(topojson.sphericalTriangleArea([[0, 0], [0, 90], [90, 0]]), Math.PI / 2);
  test.end();
});

tape("topojson.sphericalTriangleArea(triangle) does care about winding order", function(test) {
  test.inDelta(topojson.sphericalTriangleArea([[0, 0], [0.1, 0], [0, 0.1]]), 0.000001523087872198469);
  test.inDelta(topojson.sphericalTriangleArea([[0, 0], [90, 0], [0, 90]]), Math.PI / 2);
  test.end();
});
