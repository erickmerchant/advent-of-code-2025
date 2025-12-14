self.onmessage = async (e: MessageEvent<{ id: string }>) => {
  const [mod, method] = e.data.id.split(".");

  try {
    const methods = await import(`./${mod}/mod.ts`);

    postMessage(await methods[method]());
  } finally {
    self.close();
  }
};
