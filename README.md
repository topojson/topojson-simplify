# TopoJSON Simplify

…

## Installing

If you use NPM, `npm install topojson-simplify`. Otherwise, download the [latest release](https://github.com/topojson/topojson-simplify/releases/latest). You can also load directly from [unpkg](https://unpkg.com). AMD, CommonJS, and vanilla environments are supported. In vanilla, a `topojson` global is exported:

```html
<script src="https://unpkg.com/topojson-client@2"></script>
<script src="https://unpkg.com/topojson-simplify@1"></script>
<script>

topojson.presimplify(topology);

</script>
```

[Try topojson-simplify in your browser.](https://tonicdev.com/npm/topojson-simplify)

# API Reference

<a name="presimplify" href="#presimplify">#</a> topojson.<b>presimplify</b>(<i>topology</i>[, <i>weight</i>])

… If *weight* is not specified, it defaults to [planarTriangleArea](#planarTriangleArea).

<a name="simplify" href="#simplify">#</a> topojson.<b>simplify</b>(<i>topology</i>[, <i>minWeight</i>])

… The specified *topology* must have previously been passed to [presimplify](#presimplify). If *minWeight* is not specified, it defaults to [Number.MIN_VALUE](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/MIN_VALUE).

<a name="quantile" href="#quantile">#</a> topojson.<b>quantile</b>(<i>topology</i>, <i>p</i>)

…

### Filtering

<a name="filter" href="#filter">#</a> topojson.<b>filter</b>(<i>topology</i>, <i>filterRing</i>)

…

<a name="filterAttached" href="#filterAttached">#</a> topojson.<b>filterAttached</b>(<i>topology</i>)

…

<a name="filterWeight" href="#filterWeight">#</a> topojson.<b>filterWeight</b>(<i>topology</i>[, <i>minWeight</i>[, <i>weight</i>]])

… If *minWeight* is not specified, it defaults to [Number.MIN_VALUE](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/MIN_VALUE). If *weight* is not specified, it defaults to [planarRingArea](#planarRingArea).

### Geometry

<a name="planarRingArea" href="#planarRingArea">#</a> topojson.<b>planarRingArea</b>(<i>ring</i>, <i>interior</i>)

…

<a name="planarTriangleArea" href="#planarTriangleArea">#</a> topojson.<b>planarTriangleArea</b>(<i>triangle</i>)

…

<a name="sphericalRingArea" href="#sphericalRingArea">#</a> topojson.<b>sphericalRingArea</b>(<i>ring</i>, <i>interior</i>)

…

<a name="sphericalTriangleArea" href="#sphericalTriangleArea">#</a> topojson.<b>sphericalTriangleArea</b>(<i>triangle</i>)

…

## Command Line Reference

…
