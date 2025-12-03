async function calc(start_pos: number, input?: string): Promise<number> {
  input ??= await Deno.readTextFile("./input/day3.txt");
  let total = 0;

  for (const line of input.trim().split("\n")) {
    const nums = line.split("").map((c) => +c);
    let high: number = 0;
    let result = 0;
    let pos = start_pos;

    do {
      pos -= 1;
      result *= 10;

      for (let i = high; i < nums.length - pos; i++) {
        if (nums[high] < nums[i]) {
          high = i;
        }
      }

      result += nums[high];
      high += 1;
    } while (pos);

    total += result;
  }

  return total;
}

export function part1(input?: string): Promise<number> {
  return calc(2, input);
}

export function part2(input?: string): Promise<number> {
  return calc(12, input);
}
