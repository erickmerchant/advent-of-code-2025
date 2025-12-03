export async function part1(input?: string): Promise<number> {
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

export async function part2(input?: string): Promise<number> {
  input ??= await Deno.readTextFile("./input/day2.txt");

  let result = 0;

  for (let range of input.trim().split(",")) {
    range = range.trim();

    const [start, end] = range.split("-").map((n) => parseInt(n, 10));

    loop: for (let i = start; i <= end; i++) {
      const str = `${i}`;

      for (let j = 1; j < str.length; j++) {
        if (
          str.length % j === 0 &&
          str === str.substring(0, j).repeat(str.length / j)
        ) {
          result += +str;

          continue loop;
        }
      }
    }
  }

  return result;
}
