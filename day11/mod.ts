export async function part1(
  input?: string,
): Promise<number> {
  input ??= await Deno.readTextFile("./input/day11.txt");

  const devices: Map<string, Array<string>> = new Map();
  let you: Array<string> | undefined;

  for (const ln of input.trim().split("\n")) {
    const [input, ...outputs] = ln.split(/[^a-z0-9]/).filter((s) => s !== "");

    devices.set(input, outputs);

    if (input === "you") {
      you = outputs;
    }
  }

  if (!you) return 0;

  let actives: Array<Array<string>> = you.map((d) => [d]);
  const endeds: Array<Array<string>> = [];

  while (actives.length) {
    const newActives: Array<Array<string>> = [];

    for (const active of actives) {
      for (const d of devices?.get?.(active[active.length - 1]) ?? []) {
        if (d === "out") {
          endeds.push([...active].concat("out"));
        } else {
          newActives.push([...active].concat(d));
        }
      }
    }

    actives = newActives;
  }

  return endeds.length;
}

export async function part2(
  input?: string,
): Promise<number> {
  input ??= await Deno.readTextFile("./input/day11.txt");

  return Number.NEGATIVE_INFINITY;
}
