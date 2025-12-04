async function day4(limit: number, input?: string): Promise<number> {
  input ??= await Deno.readTextFile("./input/day4.txt");

  const lines = input.trim().split("\n").map((ln) => `    ${ln.trim()}    `);
  const width = lines[0].length;
  let grid = lines.join("").split("");
  let total = 0;
  let directions = [
    1,
    width - 1,
    width,
    width + 1,
  ];

  directions = directions.concat(directions.map((d) => d * -1));

  for (let i = 0; i < limit; i++) {
    for (let i = 0; i < grid.length; i++) {
      if (grid[i] === "." || grid[i] === " ") continue;

      let neighbors = 0;

      for (const dir of directions) {
        if (grid[i + dir] === "@" || grid[i + dir] === "x") {
          neighbors += 1;
        }
      }

      if (neighbors < 4) {
        grid[i] = "x";
      }
    }

    const marked = (grid.join("").match(/x/g) ?? []).length;

    if (!marked) break;

    total += marked;

    grid = grid.map((c) => c == "x" ? "." : c);
  }

  return total;
}

export function part1(input?: string): Promise<number> {
  return day4(1, input);
}

export function part2(input?: string): Promise<number> {
  return day4(Infinity, input);
}
