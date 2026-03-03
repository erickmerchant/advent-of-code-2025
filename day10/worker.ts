import { Machine2 } from "./mod.ts";

self.onmessage = (
  e: MessageEvent<
    {
      machine: Machine2;
      cache: Map<string, number>;
    }
  >,
) => {
  const machine = e.data.machine;
  const cache = e.data.cache;

  const result = process(machine, cache);

  postMessage({
    value: result,
  });
};

function process(machine: Machine2, cache: Map<string, number>): number {
  let result = Infinity;
  const cached = cache.get(JSON.stringify(machine));

  if (cached) return cached;

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
      if (combo.length < result) result = combo.length;
    } else if (!target.some((t) => t % 2 === 1)) {
      const halfTarget = target.map((n) => n / 2);

      const subResult = combo.length +
        (process({ ...machine, target: halfTarget }, cache) * 2);

      if (subResult < result) {
        result = subResult;
      }
    }
  }

  cache.set(JSON.stringify(machine), result);

  return result;
}

type NumArrArr = Array<Array<number>>;

function* combos(
  arr: NumArrArr,
  remaining: NumArrArr = arr,
  current: NumArrArr = [],
): Iterable<NumArrArr> {
  if (remaining.length === 0) {
    yield current;

    return;
  }

  yield* combos(arr, remaining.slice(1), current);

  yield* combos(arr, remaining.slice(1), [...current, remaining[0]]);

  return;
}
