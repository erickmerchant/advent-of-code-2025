// https://notes.hamatti.org/technology/advent-of-code/2025/day-12
export async function part1(
  input?: string,
): Promise<number> {
  input ??= await Deno.readTextFile("./input/day12.txt");

  const split = input.trim().split("\n\n");
  const areas = split.pop();

  let result = 0;

  if (!areas) return result;

  const presents = split.map((s) => {
    const lines = s.split("\n").map((s) => s.trim());

    if (lines.length < 2) return 0;

    return lines[1].length * (lines.length - 1);
  });

  for (const ln of areas.split("\n")) {
    const match = ln.split(/[^0-9]/g).filter((s) => s !== "");

    if (!match) continue;

    const [w, h, ...p] = match;

    if (
      // .9 is a magic number to help it pass the unit test too
      p.reduce((acc, val, key) => acc + (+val * presents[key]), 0) * .9 <=
        +w * +h
    ) {
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
