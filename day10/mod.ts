export type Machine1 = {
  target: number;
  buttons: Array<number>;
};

export async function part1(
  input?: string,
): Promise<number> {
  input ??= await Deno.readTextFile("./input/day10.txt");

  const machines: Array<Machine1> = input.trim().split("\n").map(
    (ln: string) => {
      ln = ln.trim();

      const targetStr = ln.match(/\[([\.#]+)\]/);
      const buttonStrs = Array.from(ln.matchAll(/\(([0-9,]+)\)/g));

      let target = 0;

      if (targetStr) {
        target = parseInt(
          targetStr[1].replaceAll(".", "0").replaceAll("#", "1").split("")
            .reverse().join(""),
          2,
        );
      }

      const buttons: Array<number> = [];

      for (const buttonStr of buttonStrs) {
        let button = 0;

        const buttonPositions = buttonStr[1].split(",").map((s) => +s);

        for (const pos of buttonPositions) {
          button += 1 << pos;
        }

        buttons.push(button);
      }

      return { target, buttons };
    },
  );

  const results: Array<number> = [];

  outer: for (const machine of machines) {
    let states = [0];
    let steps = 0;

    while (++steps) {
      const newStates = [];

      for (let i = 0; i < states.length; i++) {
        const state = states[i];

        for (let j = 0; j < machine.buttons.length; j++) {
          const newState = state ^ machine.buttons[j];

          if (newState === machine.target) {
            results.push(steps);

            continue outer;
          }

          newStates.push(newState);
        }
      }

      states = [...new Set(newStates)];
    }
  }

  return results.reduce((acc, curr) => acc + curr);
}

export type Machine2 = {
  id: number;
  target: Array<number>;
  buttons: Array<Array<number>>;
};

const WORKER_COUNT = 4;

// inspired by https://www.reddit.com/r/adventofcode/comments/1pk87hl/2025_day_10_part_2_bifurcate_your_way_to_victory/
export async function part2(
  input?: string,
): Promise<number> {
  input ??= await Deno.readTextFile("./input/day10.txt");

  const machines: Array<Machine2> = input.trim().split("\n").map(
    (ln: string, id: number) => {
      ln = ln.trim();

      const match = ln.match(/\{([0-9,]+)\}/);
      let target: Array<number> = [];
      let buttons: Array<Array<number>> = [];

      if (match) {
        target = match[1].split(",").map((s) => +s);

        const buttonStrs = Array.from(ln.matchAll(/\(([0-9,]+)\)/g));

        buttons = [];

        for (const buttonStr of buttonStrs) {
          const button = buttonStr[1].split(",").map((s) => +s);

          buttons.push(button);
        }

        buttons.sort((a, b) => b.length - a.length);
      }

      return { id, target, buttons };
    },
  ).toSorted(() => Math.random() - Math.random());

  let result = 0;
  const promises = [];
  let i = 0;

  while (i < WORKER_COUNT) {
    const machine = machines.shift();

    if (!machine) break;

    i += 1;

    const { resolve, promise } = Promise.withResolvers<void>();
    const builder = new Worker(new URL("worker.ts", import.meta.url).href, {
      type: "module",
    });

    builder.postMessage({
      machine,
    });

    builder.onmessage = (
      e: MessageEvent<{
        id: number;
        value: number;
      }>,
    ) => {
      const parsed = e.data;

      result += parsed.value;

      const machine = machines.shift();

      if (machine) {
        builder.postMessage({
          machine,
        });
      } else {
        resolve();
      }
    };

    promises.push(promise);
  }

  await Promise.all(promises);

  return result;
}
