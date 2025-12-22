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

  const results = [];
  const size = Math.ceil(candidates.length / 8);
  let id = 0;

  while (candidates.length) {
    const slice = candidates.splice(0, size);
    const { resolve, promise } = Promise.withResolvers<number>();
    const builder = new Worker(new URL("worker.ts", import.meta.url).href, {
      type: "module",
    });

    builder.postMessage({
      id: id++,
      candidates: slice,
      verticals,
      horizontals,
    });

    builder.onmessage = (e: MessageEvent<string>) => {
      resolve(+e.data);
    };

    results.push(promise);
  }

  for (const result of results) {
    const largest = await result;

    if (largest > 0) return largest;
  }

  return 0;
}
