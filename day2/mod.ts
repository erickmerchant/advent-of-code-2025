async function day2(
  limiter: (str: string) => [number, number?],
  input?: string,
): Promise<number> {
  input ??= await Deno.readTextFile("./input/day2.txt");

  let result = 0;

  for (let range of input.trim().split(",")) {
    range = range.trim();

    const [start, end] = range.split("-").map((n) => parseInt(n, 10));

    loop: for (let i = start; i <= end; i++) {
      const str = `${i}`;
      const [min, max = min + 1] = limiter(str);

      for (let j = min; j < max; j++) {
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

export function part1(input?: string): Promise<number> {
  return day2((str: string) => [str.length / 2], input);
}

export function part2(input?: string): Promise<number> {
  return day2((str: string) => [1, str.length], input);
}
