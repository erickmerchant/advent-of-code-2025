export async function day1_part1(input?: string): Promise<number> {
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

export async function day1_part2(input?: string): Promise<number> {
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

export async function day2_part1(input?: string): Promise<number> {
  input ??= await Deno.readTextFile("./input/day2.txt");

  let result = 0;

  for (let range of input.trim().split(",")) {
    range = range.trim();

    const [start, end] = range.split("-").map((n) => parseInt(n, 10));

    for (let i = start; i <= end; i++) {
      const str = `${i}`;

      if (str.length % 2 !== 0) continue;

      if (str.endsWith(str.substring(0, str.length / 2))) {
        result += +str;
      }
    }
  }

  return result;
}

export async function day2_part2(input?: string): Promise<number> {
  input ??= await Deno.readTextFile("./input/day2.txt");

  let result = 0;

  for (let range of input.trim().split(",")) {
    range = range.trim();

    const [start, end] = range.split("-").map((n) => parseInt(n, 10));

    loop: for (let i = start; i <= end; i++) {
      const str = `${i}`;

      for (let j = 1; j < str.length; j++) {
        if (str === str.substring(0, j).repeat(str.length / j)) {
          result += +str;

          continue loop;
        }
      }
    }
  }

  return result;
}

if (import.meta.main) {
  console.log(await day1_part1());
  console.log(await day1_part2());
  console.log(await day2_part1());
  console.log(await day2_part2());
}
