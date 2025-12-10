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

    for (let x = minX + 1; x < maxX; x++) {
      const y = minY + 1;
      const outside = verticals
            .filter(([x2, y2, y3]) => x2 < x && y > y2 && y < y3)
            .length % 2 === 0;

      if (outside) {
        out = true;

        break;
      }
    }

    for (let x = minX + 1; x < maxX; x++) {
      const y = maxY - 1;
      const outside = verticals
            .filter(([x2, y2, y3]) => x2 < x && y > y2 && y < y3)
            .length % 2 === 0;

      if (outside) {
        out = true;

        break;
      }
    }

    for (let y = minY + 1; y < maxY; y++) {
      const x = minX + 1;
      const outside = horizontals
            .filter(([y2, x2, x3]) => y2 < y && x > x2 && x < x3)
            .length % 2 === 0;

      if (outside) {
        out = true;

        break;
      }
    }

    for (let y = minY + 1; y < maxY; y++) {
      const x = maxX - 1;
      const outside = horizontals
            .filter(([y2, x2, x3]) => y2 < y && x > x2 && x < x3)
            .length % 2 === 0;

      if (outside) {
        out = true;

        break;
      }
    }

    if (!out) {
      largest = area;

      break outer;
    }
  }

  postMessage(largest);

  self.close();
};
