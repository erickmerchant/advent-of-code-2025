import { Machine2 } from "./mod.ts";

type Permutation = {
  current: Array<number>;
  length: number;
  latest?: number;
};

self.onmessage = (
  e: MessageEvent<
    {
      machine: Machine2;
    }
  >,
) => {
  const machine = e.data.machine;

  const result = process(machine);

  postMessage({
    id: machine.id,
    value: result,
  });
};

function process(machine: Machine2): number {
  const subResults = [];

  for (
    const combo of combos(
      machine.buttons,
    )
  ) {
    const target = [...machine.target];

    for (const button of combo) {
      for (const index of button) {
        target[index] -= 1;
      }
    }

    if (target.some((t) => t < 0)) {
      continue;
    }

    if (!target.some((t) => t !== 0)) {
      subResults.push(combo.length);
    } else if (!target.some((t) => t % 2 === 1)) {
      const halfTarget = target.map((n) => n / 2);

      const subResult = combo.length +
        (process({ ...machine, target: halfTarget }) * 2);

      subResults.push(subResult);
    }
  }

  const result = Math.min(...subResults);

  return result;
}

function* combos<T>(
  arr: Array<T>,
  remaining: Array<T> = arr,
  current: Array<T> = [],
): Iterable<Array<T>> {
  if (remaining.length === 0) {
    yield current;

    return;
  }

  yield* combos(arr, remaining.slice(1), current);

  yield* combos(arr, remaining.slice(1), [...current, remaining[0]]);

  return;
}
