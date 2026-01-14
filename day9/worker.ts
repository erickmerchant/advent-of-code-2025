import type { Coord } from "./mod.ts";
import { compareNumber } from "./mod.ts";

self.onmessage = (
  e: MessageEvent<
    {
      id: number;
      candidates: Array<[number, Coord, Coord]>;
      verticals: Array<[number, number, number]>;
      horizontals: Array<[number, number, number]>;
    }
  >,
) => {
  const candidates = e.data.candidates;
  const verticals = e.data.verticals;
  const horizontals = e.data.horizontals;
  let largest = 0;

  outer: while (candidates.length) {
    const [area, a, b] = candidates.shift()!;
    const [minX, maxX] = [a.x, b.x].toSorted(compareNumber);
    const [minY, maxY] = [a.y, b.y].toSorted(compareNumber);
    let out = false;

    inner: while (true) {
      const filteredVerticals1 = verticals
        .filter(([_, y2, y3]) => ((minY + 1) > y2 && (minY + 1) < y3));
      const filteredVerticals2 = verticals
        .filter(([_, y2, y3]) => ((maxY - 1) > y2 && (maxY - 1) < y3));

      for (let x = minX + 1; x < maxX; x++) {
        let total: number;

        total = filteredVerticals1
          .reduce((acc, [x2]) =>
            acc + (
              x2 < x ? 1 : 0
            ), 0);

        if (total % 2 === 0) {
          out = true;

          break inner;
        }

        total = filteredVerticals2
          .reduce((acc, [x2]) =>
            acc + (
              x2 < x ? 1 : 0
            ), 0);

        if (total % 2 === 0) {
          out = true;

          break inner;
        }
      }

      const filteredHorizontals1 = horizontals
        .filter(([_, x2, x3]) => ((minX + 1) > x2 && (minX + 1) < x3));
      const filteredHorizontals2 = horizontals
        .filter(([_, x2, x3]) => ((maxX - 1) > x2 && (maxX - 1) < x3));

      for (let y = minY + 1; y < maxY; y++) {
        let total: number;

        total = filteredHorizontals1
          .reduce((acc, [y2]) =>
            acc + (
              (y2 < y) ? 1 : 0
            ), 0);

        if (total % 2 === 0) {
          out = true;

          break inner;
        }

        total = filteredHorizontals2
          .reduce((acc, [y2]) =>
            acc + (
              (y2 < y) ? 1 : 0
            ), 0);

        if (total % 2 === 0) {
          out = true;

          break inner;
        }
      }

      break inner;
    }

    if (!out) {
      largest = area;

      break outer;
    }
  }

  postMessage(largest);

  self.close();
};
