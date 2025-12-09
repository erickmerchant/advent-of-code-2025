const IDS: Array<string> = [];

for await (const file of Deno.readDir(".")) {
  if (file.isDirectory && file.name.startsWith("day")) {
    IDS.push(file.name + ".part1");
    IDS.push(file.name + ".part2");
  }
}

IDS.sort();

export async function* main(
  ids: Array<string> = IDS,
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
