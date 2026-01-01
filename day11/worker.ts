import type { Devices } from "./mod.ts";

function findPaths(
  devices: Devices,
  startKey: string,
  endKey: string,
  cache: Map<string, number> = new Map(),
): number {
  if (startKey == endKey) return 1;

  const cached = cache.get(startKey);

  if (cached != undefined) {
    return cached;
  }

  const stepKeys = devices.get(startKey);

  if (!stepKeys) {
    cache.set(startKey, 0);

    return 0;
  }

  let result = 0;

  for (const key of stepKeys) {
    result += findPaths(devices, key, endKey, cache);
  }

  cache.set(startKey, result);

  return result;
}

self.onmessage = (
  e: MessageEvent<
    {
      devices: Devices;
      startKey: string;
      endKey: string;
    }
  >,
) => {
  const devices = e.data.devices;
  const startKey = e.data.startKey;
  const endKey = e.data.endKey;
  const result = findPaths(devices, startKey, endKey);

  postMessage(result);

  self.close();
};
