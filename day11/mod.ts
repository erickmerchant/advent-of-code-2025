export type Devices = Map<string, Array<string>>;

function getDevices(input: string): Devices {
  const devices: Devices = new Map();
  const outs = new Set<string>();

  for (const ln of input.trim().split("\n")) {
    const [input, ...outputs] = ln.split(/[^a-z0-9]/).filter((s) => s !== "");

    if (outputs.length === 1 && outputs[0] === "out") {
      outs.add(input);
    } else {
      devices.set(input, outputs);
    }
  }

  for (const key of devices.keys()) {
    const existing = devices.get(key);

    if (!existing) continue;

    devices.set(key, existing.map((k) => outs.has(k) ? "out" : k));
  }

  return devices;
}

function findPaths(
  devices: Devices,
  startKey: string,
  endKey: string,
): Promise<number> {
  const { resolve, promise } = Promise.withResolvers<number>();
  const builder = new Worker(new URL("worker.ts", import.meta.url).href, {
    type: "module",
  });

  builder.postMessage({
    devices,
    startKey,
    endKey,
  });

  builder.onmessage = (e: MessageEvent<string>) => {
    const result = +e.data;

    resolve(result);
  };

  return promise;
}

export async function part1(
  input?: string,
): Promise<number> {
  input ??= await Deno.readTextFile("./input/day11.txt");

  const devices = getDevices(input);

  return findPaths(devices, "you", "out");
}

export async function part2(
  input?: string,
): Promise<number> {
  input ??= await Deno.readTextFile("./input/day11.txt");

  const devices = getDevices(input);

  const [a1, a2, a3, b1, b2, b3] = await Promise.all([
    findPaths(devices, "svr", "dac"),
    findPaths(devices, "dac", "fft"),
    findPaths(devices, "fft", "out"),
    findPaths(devices, "svr", "fft"),
    findPaths(devices, "fft", "dac"),
    findPaths(devices, "dac", "out"),
  ]);

  return (a1 * a2 * a3) + (b1 * b2 * b3);
}
