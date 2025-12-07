export async function part1(input?: string): Promise<number> {
  input ??= await Deno.readTextFile("./input/day7.txt");

  const lines = input.trim().split("\n").map((ln: string) =>
    ln.trim().split("")
  );
  let prev;
  let total = 0;

  while (lines.length) {
    const line = lines.shift();

    if (line) {
      for (let i = 0; i < line.length; i++) {
        if ((line[i] === "." && prev?.[i] === "|") || line[i] === "S") {
          line[i] = "|";
        }

        if (line[i] === "^" && prev?.[i] === "|") {
          if (line[i - 1]) line[i - 1] = "|";
          if (line[i + 1]) line[i + 1] = "|";

          total += 1;
        }
      }

      prev = line;
    }
  }

  return total;
}

export async function part2(input?: string): Promise<number> {
  input ??= await Deno.readTextFile("./input/day7.txt");

  const lines = input.trim().split("\n").map((ln: string) =>
    ln.trim().split("")
  );
  let prev: Map<number, number> = new Map();

  while (lines.length) {
    const line = lines.shift();
    const current: Map<number, number> = new Map();

    if (line) {
      for (let i = 0; i < line.length; i++) {
        if (line[i] === "." && prev.has(i) || line[i] === "S") {
          current.set(i, prev.get(i) ?? 1);
        }

        if (line[i] === "^" && prev.has(i)) {
          current.set(i - 1, (current.get(i - 1) ?? 0) + (prev.get(i) ?? 1));

          current.set(i + 1, (current.get(i + 1) ?? 0) + (prev.get(i) ?? 1));
        }
      }

      prev = current;
    }
  }

  return prev.values().reduce((acc: number, cur: number) => acc + cur, 0);
}
