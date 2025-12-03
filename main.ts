export function* main(
  ids: Array<string> = ["day1.part1", "day1.part2", "day2.part1", "day2.part2"],
): Generator<Promise<number>> {
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
    yield result;
  }
}

if (import.meta.main) {
  for (const line of main(Deno.args.length ? Deno.args : undefined)) {
    console.log(await line);
  }
}
