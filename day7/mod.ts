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
    `.${ln.trim()}.`.split("")
  );
  let prev: Array<number> = [];

  while (lines.length) {
    const line = lines.shift();
    const current: Array<number> = [];

    if (line) {
      for (let i = 0; i < line.length; i++) {
        if ((line[i] !== "^" && prev[i]) || line[i] === "S") {
          current[i] ??= 0;
          current[i] += prev[i] ?? 1;
        }

        if (line[i] === "^" && prev[i]) {
          current[i - 1] ??= 0;
          current[i - 1] += prev[i];

          current[i + 1] ??= 0;
          current[i + 1] += prev[i];
        }
      }

      prev = current;
    }
  }

  return prev.reduce((acc: number, cur: number) => acc + cur, 0);
}
