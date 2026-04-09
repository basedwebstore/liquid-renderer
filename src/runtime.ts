import type { LiquidDataPointer, LiquidJsonValue, LiquidRendererRuntime } from './liquid.types';

const POINTER_PREFIXES: LiquidDataPointer[] = ['$global.', '$input.', '$page.'];

export function isLiquidDataPointer(value: unknown): value is LiquidDataPointer {
  return typeof value === 'string' && POINTER_PREFIXES.some((prefix) => value.startsWith(prefix));
}

function resolveValue(value: unknown, runtime?: LiquidRendererRuntime): unknown {
  if (isLiquidDataPointer(value)) {
    return runtime?.resolveDataPointer?.(value);
  }

  if (Array.isArray(value)) {
    return value.map((item) => resolveValue(item, runtime));
  }

  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value as Record<string, unknown>).map(([key, item]) => [key, resolveValue(item, runtime)]),
    );
  }

  return value;
}

export function resolveLiquidValue<T>(value: T, runtime?: LiquidRendererRuntime): T {
  return resolveValue(value, runtime) as T;
}

export function resolveLiquidJsonValue(value: LiquidJsonValue, runtime?: LiquidRendererRuntime): LiquidJsonValue {
  return resolveValue(value, runtime) as LiquidJsonValue;
}