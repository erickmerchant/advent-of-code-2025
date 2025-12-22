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
  // const id = e.data.id;
  const candidates = e.data.candidates;
  const verticals = e.data.verticals;
  const horizontals = e.data.horizontals;
  let largest = 0;
  // let i = 0;
  // const len = candidates.length;

  outer: while (candidates.length) {
    // console.log(id, (i++ / len).toFixed(2));

    const [area, a, b] = candidates.shift()!;
    const [minX, maxX] = [a.x, b.x].toSorted(compareNumber);
    const [minY, maxY] = [a.y, b.y].toSorted(compareNumber);
    let out = false;

    inner: while (true) {
      for (let x = minX + 1; x < maxX; x++) {
        {
          const totals = verticals
            .reduce((acc, [x2, y2, y3]) => [
              acc[0] + (
                (x2 < x && (minY + 1) > y2 && (minY + 1) < y3) ? 1 : 0
              ),
              acc[1] + (
                (x2 < x && (maxY - 1) > y2 && (maxY - 1) < y3) ? 1 : 0
              ),
            ], [0, 0]);

          if (totals[0] % 2 === 0 || totals[1] % 2 === 0) {
            out = true;

            break inner;
          }
        }
      }

      for (let y = minY + 1; y < maxY; y++) {
        {
          const totals = horizontals
            .reduce((acc, [y2, x2, x3]) => [
              acc[0] + (
                (y2 < y && (minX + 1) > x2 && (minX + 1) < x3) ? 1 : 0
              ),
              acc[1] + (
                (y2 < y && (maxX - 1) > x2 && (maxX - 1) < x3) ? 1 : 0
              ),
            ], [0, 0]);

          if (totals[0] % 2 === 0 || totals[1] % 2 === 0) {
            out = true;

            break inner;
          }
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
