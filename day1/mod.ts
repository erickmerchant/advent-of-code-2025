export async function part1(input?: string): Promise<number> {
  input ??= await Deno.readTextFile("./input/day1.txt");

  let result = 0;
  let current = 50;

  for (let line of input.trim().split("\n")) {
    line = line.trim();

    const direction = line.substring(0, 1);
    let turn = parseInt(line.substring(1), 10);

    if (direction === "L") turn *= -1;

    current += turn;

    while (current < 0) current += 100;

    while (current > 99) current -= 100;

    if (current === 0) result += 1;
  }

  return result;
}

export async function part2(input?: string): Promise<number> {
  input ??= await Deno.readTextFile("./input/day1.txt");

  let result = 0;
  let current = 50;

  for (let line of input.trim().split("\n")) {
    line = line.trim();

    const direction = line.substring(0, 1);
    let turn = parseInt(line.substring(1), 10);

    while (turn) {
      current += direction === "L" ? -1 : 1;

      if (current < 0) current += 100;

      if (current > 99) current -= 100;

      if (current === 0) result += 1;

      turn -= 1;
    }
  }

  return result;
}
