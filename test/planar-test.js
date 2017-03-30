var tape = require("tape"),
    topojson = require("../");

tape("topojson.planarRingArea(ring) returns the area of the specified ring", function(test) {
  test.equal(topojson.planarRingArea([[0, 0], [1, 0], [0, 1], [0, 0]]), 0.5);
  test.equal(topojson.planarRingArea([[0, 0], [1, 0], [1, 1], [0, 1], [0, 0]]), 1);
  test.end();
});

tape("topojson.planarRingArea(ring) doesn’t care about winding order", function(test) {
  test.equal(topojson.planarRingArea([[0, 0], [0, 1], [1, 0], [0, 0]]), 0.5);
  test.equal(topojson.planarRingArea([[0, 0], [0, 1], [1, 1], [1, 0], [0, 0]]), 1);
  test.end();
});

tape("topojson.planarTriangleArea(triangle) returns the area of the specified triangle", function(test) {
  test.equal(topojson.planarTriangleArea([[0, 0], [1, 0], [0, 1]]), 0.5);
  test.end();
});

tape("topojson.planarTriangleArea(triangle) doesn’t care about winding order", function(test) {
  test.equal(topojson.planarTriangleArea([[0, 0], [0, 1], [1, 0]]), 0.5);
  test.end();
});
