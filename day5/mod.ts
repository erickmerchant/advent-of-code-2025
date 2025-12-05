class Range {
  min: number;
  max: number;

  get size() {
    return this.max - this.min + 1;
  }

  constructor(min: number, max: number) {
    this.min = min;
    this.max = max;
  }

  includes(num: number) {
    return num >= this.min && num <= this.max;
  }

  copy() {
    return new Range(this.min, this.max);
  }
}

async function day5(
  input?: string,
): Promise<{ ranges: Array<Range>; ids: Array<number> }> {
  input ??= await Deno.readTextFile("./input/day5.txt");
  const parts = input.split("\n\n");
  const ranges = parts[0].trim().split("\n").map((range) => {
    const [min, max] = range.split("-").map((n) => parseInt(n, 10));

    return new Range(min, max);
  });
  const ids = parts[1].split("\n").map((n) => parseInt(n, 10));

  return { ranges, ids };
}

export async function part1(input?: string): Promise<number> {
  const { ranges, ids } = await day5(input);

  let total = 0;

  loop: for (const id of ids) {
    for (const range of ranges) {
      if (range.includes(id)) {
        total += 1;

        continue loop;
      }
    }
  }

  return total;
}

export async function part2(input?: string): Promise<number> {
  const { ranges } = await day5(input);
  const normalizedRanges: Array<Range> = [];
  let total = 0;

  loop: for (const range of ranges.sort((a, b) => a.min - b.min)) {
    for (let i = 0; i < normalizedRanges.length; i++) {
      const normalizedRange = normalizedRanges[i];

      if (
        normalizedRange.includes(range.min) &&
        normalizedRange.includes(range.max)
      ) {
        continue loop;
      }

      if (normalizedRange.includes(range.min)) {
        normalizedRanges[i].max = range.max;

        continue loop;
      }
    }

    normalizedRanges.push(range.copy());
  }

  for (const range of normalizedRanges) {
    total += range.size;
  }

  return total;
}
