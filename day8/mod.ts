type Coords = [number, number, number];
type Connection = {
  distance: number;
  coords1: Coords;
  coords2: Coords;
};
type Circuit = Set<Coords>;

function calcDistance([x1, y1, z1]: Coords, [x2, y2, z2]: Coords): number {
  return Math.sqrt(
    Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2) + Math.pow(z1 - z2, 2),
  );
}

export async function parse(
  input?: string,
): Promise<{ length: number; connections: Array<Connection> }> {
  input ??= await Deno.readTextFile("./input/day8.txt");

  const coords: Array<Coords> = input.trim().split("\n").map(
    (ln: string) => {
      const coords: Coords = ln.trim().split(",").map((n) => +n) as Coords;

      return coords;
    },
  );
  const connections: Array<Connection> = [];

  for (let i = 0; i < coords.length; i++) {
    const coords1 = coords[i];

    for (let j = i + 1; j < coords.length; j++) {
      const coords2 = coords[j];

      const distance = calcDistance(coords1, coords2);

      connections.push({
        coords1,
        coords2,
        distance,
      });
    }
  }

  connections.sort((a, b) => a.distance - b.distance);

  return { length: coords.length, connections };
}

export async function part1(
  limit: number = 1000,
  input?: string,
): Promise<number> {
  const { connections } = await parse(input);
  const circuits: Array<Circuit> = [];

  for (const { coords1, coords2 } of connections.slice(0, limit)) {
    const index1 = circuits.findIndex((s: Circuit) => s.has(coords1));
    const index2 = circuits.findIndex((s: Circuit) => s.has(coords2));

    if (index1 > -1 && index2 > -1) {
      if (index1 !== index2) {
        const set1 = circuits.splice(
          circuits.findIndex((s: Circuit) => s.has(coords1)),
          1,
        )[0];
        const set2 = circuits.splice(
          circuits.findIndex((s: Circuit) => s.has(coords2)),
          1,
        )[0];

        circuits.push(set1.union(set2));
      }
    } else if (index1 > -1) {
      circuits[index1].add(coords2);
    } else if (index2 > -1) {
      circuits[index2].add(coords1);
    } else {
      circuits.push(new Set([coords1, coords2]));
    }
  }

  const sizes = circuits.toSorted((a: Circuit, b: Circuit) => a.size - b.size)
    .toReversed()
    .map((c: Circuit) => c.size);

  return sizes.slice(0, 3).reduce((
    acc: number,
    cur: number,
  ) => acc * cur);
}

export async function part2(
  input?: string,
): Promise<number> {
  const { connections, length } = await parse(input);
  const circuits: Array<Circuit> = [];

  for (const { coords1, coords2 } of connections) {
    const index1 = circuits.findIndex((s: Circuit) => s.has(coords1));
    const index2 = circuits.findIndex((s: Circuit) => s.has(coords2));

    if (index1 > -1 && index2 > -1) {
      if (index1 !== index2) {
        const set1 = circuits.splice(
          circuits.findIndex((s: Circuit) => s.has(coords1)),
          1,
        )[0];
        const set2 = circuits.splice(
          circuits.findIndex((s: Circuit) => s.has(coords2)),
          1,
        )[0];

        circuits.push(set1.union(set2));
      }
    } else if (index1 > -1) {
      circuits[index1].add(coords2);
    } else if (index2 > -1) {
      circuits[index2].add(coords1);
    } else {
      circuits.push(new Set([coords1, coords2]));
    }

    if (circuits.length === 1 && circuits[0].size === length) {
      return coords1[0] * coords2[0];
    }
  }

  return 0;
}
