var pi = Math.PI,
    tau = 2 * pi,
    fourPi = 4 * pi,
    radians = pi / 180,
    abs = Math.abs,
    atan = Math.atan,
    atan2 = Math.atan2,
    cos = Math.cos,
    max = Math.max,
    sin = Math.sin,
    sqrt = Math.sqrt,
    tan = Math.tan;

export function sphericalRingArea(ring, interior) {
  if (!ring.length) return 0;
  var sum = 0,
      point = ring[0],
      lambda0, lambda1 = point[0] * radians, delta,
      phi1 = (point[1] * radians + tau) / 2,
      cosPhi0, cosPhi1 = cos(phi1),
      sinPhi0, sinPhi1 = sin(phi1),
      i, n, k;

  for (i = 1, n = ring.length; i < n; ++i) {
    point = ring[i];
    lambda0 = lambda1, lambda1 = point[0] * radians, delta = lambda1 - lambda0;
    phi1 = (point[1] * radians + tau) / 2;
    cosPhi0 = cosPhi1, cosPhi1 = cos(phi1);
    sinPhi0 = sinPhi1, sinPhi1 = sin(phi1);

    // Spherical excess E for a spherical triangle with vertices: south pole,
    // previous point, current point. Uses a formula derived from Cagnoli’s
    // theorem. See Todhunter, Spherical Trig. (1871), Sec. 103, Eq. (2).
    k = sinPhi0 * sinPhi1;
    sum += atan2(k * sin(delta), cosPhi0 * cosPhi1 + k * cos(delta));
  }

  sum = 2 * (sum > pi ? sum - tau : sum < -pi ? sum + tau : sum);
  if (interior) sum *= -1;
  return sum < 0 ? sum + fourPi : sum;
}

export function sphericalTriangleArea(t) {
  var lambda0 = t[0][0] * radians, phi0 = t[0][1] * radians, cosPhi0 = cos(phi0), sinPhi0 = sin(phi0),
      lambda1 = t[1][0] * radians, phi1 = t[1][1] * radians, cosPhi1 = cos(phi1), sinPhi1 = sin(phi1),
      lambda2 = t[2][0] * radians, phi2 = t[2][1] * radians, cosPhi2 = cos(phi2), sinPhi2 = sin(phi2),
      a = distance(lambda0, cosPhi0, sinPhi0, lambda1, cosPhi1, sinPhi1),
      b = distance(lambda1, cosPhi1, sinPhi1, lambda2, cosPhi2, sinPhi2),
      c = distance(lambda2, cosPhi2, sinPhi2, lambda0, cosPhi0, sinPhi0),
      s = (a + b + c) / 2;
  return 4 * atan(sqrt(max(0, tan(s / 2) * tan((s - a) / 2) * tan((s - b) / 2) * tan((s - c) / 2))));
}

function distance(lambda0, sinPhi0, cosPhi0, lambda1, sinPhi1, cosPhi1) {
  var delta = abs(lambda1 - lambda0),
      cosDelta = cos(delta),
      sinDelta = sin(delta),
      x = cosPhi1 * sinDelta,
      y = cosPhi0 * sinPhi1 - sinPhi0 * cosPhi1 * cosDelta,
      z = sinPhi0 * sinPhi1 + cosPhi0 * cosPhi1 * cosDelta;
  return atan2(sqrt(x * x + y * y), z);
}
