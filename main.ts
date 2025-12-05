export async function* main(
  ids: Array<string> = [
    "day1.part1",
    "day1.part2",
    "day2.part1",
    "day2.part2",
    "day3.part1",
    "day3.part2",
    "day4.part1",
    "day4.part2",
    "day5.part1",
    "day5.part2",
  ],
): AsyncGenerator<number> {
  const results = [];

  for (const id of ids) {
    const { resolve, promise } = Promise.withResolvers<number>();
    const builder = new Worker(new URL("worker.ts", import.meta.url).href, {
      type: "module",
    });

    builder.postMessage({ id });

    builder.onmessage = (e: MessageEvent<string>) => {
      resolve(+e.data);
    };

    results.push(promise);
  }

  for (const result of results) {
    yield await result;
  }
}

if (import.meta.main) {
  const parts = Deno.args.length ? Deno.args : undefined;

  for await (const line of main(parts)) {
    console.log(line);
  }
}
