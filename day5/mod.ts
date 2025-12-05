type Range = { min: number; max: number };

async function day5(
  input?: string,
): Promise<{ ranges: Array<Range>; ids: Array<number> }> {
  input ??= await Deno.readTextFile("./input/day5.txt");
  const parts = input.split("\n\n");
  const ranges = parts[0].trim().split("\n").map((range) => {
    const [min, max] = range.split("-").map((n) => parseInt(n, 10));

    return { min, max };
  });
  const ids = parts[1].split("\n").map((n) => parseInt(n, 10));

  return { ranges, ids };
}

export async function part1(input?: string): Promise<number> {
  const { ranges, ids } = await day5(input);

  let total = 0;

  loop: for (const id of ids) {
    for (const { min, max } of ranges) {
      if (id >= min && id <= max) {
        total += 1;

        continue loop;
      }
    }
  }

  return total;
}

export async function part2(input?: string): Promise<number> {
  const { ranges } = await day5(input);
  const realRanges: Array<Range> = [];
  let total = 0;

  loop: for (const { min, max } of ranges.sort((a, b) => a.min - b.min)) {
    for (let i = 0; i < realRanges.length; i++) {
      const { min: rmin, max: rmax } = realRanges[i];

      if (min >= rmin && min <= rmax && max >= rmin && max <= rmax) {
        continue loop;
      }

      if (min >= rmin && min <= rmax) {
        realRanges[i].max = max;

        continue loop;
      }
    }

    realRanges.push({ min, max });
  }

  for (const { min, max } of realRanges) {
    total += max - min + 1;
  }

  return total;
}
