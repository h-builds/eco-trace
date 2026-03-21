const WASM_PATH = "/engine.wasm";
const GLUE_PATH = "/wasm_exec.js";

let initPromise: Promise<void> | null = null;

async function loadGlueScript(): Promise<void> {
  if (typeof globalThis.Go !== "undefined") return;

  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = `${GLUE_PATH}?v=${Date.now()}`;
    script.onload = () => resolve();
    script.onerror = () =>
      reject(new Error(`Failed to load ${GLUE_PATH}`));
    document.head.appendChild(script);
  });
}

async function initWasm(): Promise<void> {
  await loadGlueScript();

  const readyPromise = new Promise<void>((resolve) => {
    globalThis.__ecotraceOnReady = () => resolve();
  });

  if (!globalThis.Go) {
    throw new Error("Go engine not loaded");
  }

  const go = new globalThis.Go();
  const result = await WebAssembly.instantiateStreaming(
    fetch(`${WASM_PATH}?v=${Date.now()}`),
    go.importObject
  );
  go.run(result.instance);

  await readyPromise;
}

export function getWasmInit(): Promise<void> {
  if (!initPromise) {
    initPromise = initWasm();
  }
  return initPromise;
}
