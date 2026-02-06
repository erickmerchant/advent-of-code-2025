export type Coord = {
  x: number;
  y: number;
};

export function compareNumber(a: number, b: number) {
  return a - b;
}

export async function part1(
  input?: string,
): Promise<number> {
  input ??= await Deno.readTextFile("./input/day9.txt");
  let largest = 0;

  const points: Array<Coord> = input.trim().split("\n").map(
    (ln: string) => {
      const [x, y] = ln.trim().split(",").map((c: string) => +c) as [
        number,
        number,
      ];

      return { x, y };
    },
  );

  for (let i = 0; i < points.length; i++) {
    const a = points[i];

    for (let j = i + 1; j < points.length; j++) {
      const b = points[j];

      const area = (Math.abs(a.x - b.x) + 1) * (Math.abs(a.y - b.y) + 1);

      if (area > largest) largest = area;
    }
  }

  return largest;
}

export async function part2(
  input?: string,
): Promise<number> {
  input ??= await Deno.readTextFile("./input/day9.txt");

  const points: Array<Coord> = input.trim().split("\n").map(
    (ln: string) => {
      const [x, y] = ln.trim().split(",").map((c: string) => +c) as [
        number,
        number,
      ];

      return { x, y };
    },
  );
  const verticals: Array<[number, number, number]> = [];
  const horizontals: Array<[number, number, number]> = [];

  for (
    let i = points[points.length - 1].x === points[0].x ? 1 : 0;
    i < points.length;
    i += 2
  ) {
    const y = [
      points[i].y,
      points[i + 1 === points.length ? 0 : i + 1].y,
    ] as [number, number];

    y.sort(compareNumber);

    verticals.push([
      points[i].x,
      ...y,
    ]);
  }

  for (
    let i = points[points.length - 1].y === points[0].y ? 1 : 0;
    i < points.length;
    i += 2
  ) {
    const x = [
      points[i].x,
      points[i + 1 === points.length ? 0 : i + 1].x,
    ] as [number, number];

    x.sort(compareNumber);

    horizontals.push([
      points[i].y,
      ...x,
    ]);
  }

  const candidates: Array<[number, Coord, Coord]> = [];

  for (let i = 0; i < points.length; i++) {
    const a = points[i];

    for (let j = i + 1; j < points.length; j++) {
      const b = points[j];

      const area = (Math.abs(a.x - b.x) + 1) * (Math.abs(a.y - b.y) + 1);

      candidates.push([area, a, b]);
    }
  }

  candidates.sort(([a], [b]) => b - a);

  while (candidates.length) {
    const [area, a, b] = candidates.shift()!;
    const [minX, maxX] = [a.x, b.x].toSorted(compareNumber);
    const [minY, maxY] = [a.y, b.y].toSorted(compareNumber);

    inner: {
      let filtered: Array<[number, number, number]>;

      filtered = verticals;

      for (let x = maxX - 1; x >= minX + 1; x--) {
        const newFiltered = [];
        let total1: number = 0;
        let total2: number = 0;

        for (const f of filtered) {
          const [x2, y2, y3] = f;

          if (
            (((minY + 1) > y2 && (minY + 1) < y3) ||
              (maxY - 1) > y2 && (maxY - 1) < y3) && (x2 < x)
          ) {
            newFiltered.push(f);

            if ((minY + 1) > y2 && (minY + 1) < y3) {
              total1 += 1;
            }

            if ((maxY - 1) > y2 && (maxY - 1) < y3) {
              total2 += 1;
            }
          }
        }

        if (total1 % 2 === 0 || total2 % 2 === 0) {
          break inner;
        }

        filtered = newFiltered;
      }

      filtered = horizontals;

      for (let y = maxY - 1; y >= minY + 1; y--) {
        const newFiltered = [];
        let total1: number = 0;
        let total2: number = 0;

        for (const f of filtered) {
          const [y2, x2, x3] = f;

          if (
            (((minX + 1) > x2 && (minX + 1) < x3) ||
              (maxX - 1) > x2 && (maxX - 1) < x3) && (y2 < y)
          ) {
            newFiltered.push(f);

            if ((minX + 1) > x2 && (minX + 1) < x3) {
              total1 += 1;
            }

            if ((maxX - 1) > x2 && (maxX - 1) < x3) {
              total2 += 1;
            }
          }
        }

        if (total1 % 2 === 0 || total2 % 2 === 0) {
          break inner;
        }

        filtered = newFiltered;
      }

      return area;
    }
  }

  return 0;
}
