export async function part1(
  input?: string,
): Promise<number> {
  input ??= await Deno.readTextFile("./input/day12.txt");

  const split = input.split("\n\n");

  const areas = split[split.length - 1];
  let result = 0;

  for (const ln of areas.split("\n")) {
    const match = ln.split(/[^0-9]/g).filter((s) => s !== "");

    if (!match) continue;

    const [w, h, ...p] = match;

    if (8 * p.reduce((acc, curr) => acc + +curr, 0) < +w * +h) {
      result += 1;
    }
  }

  return result;
}

export async function part2(
  input?: string,
): Promise<number> {
  input ??= await Deno.readTextFile("./input/day12.txt");

  return Number.NEGATIVE_INFINITY;
}
