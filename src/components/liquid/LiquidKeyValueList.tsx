import type { CSSProperties } from 'react';

import { resolveLiquidColorTokens } from '../../color-scheme';
import type { LiquidJsonValue, LiquidStyleMap, LiquidThemeMode, LiquidWidgetProps } from '../../liquid.types';

export interface LiquidKeyValueEntry {
  key: string;
  value: string | number;
  [key: string]: LiquidJsonValue | undefined;
}

export interface LiquidKeyValueListProps extends LiquidWidgetProps {
  entries: LiquidKeyValueEntry[];
  theme?: LiquidThemeMode;
  colorTokens?: ReturnType<typeof resolveLiquidColorTokens>;
  className?: string;
  style?: LiquidStyleMap;
}

export function LiquidKeyValueList({
  entries,
  theme = 'light',
  colorTokens,
  className = '',
  style,
}: LiquidKeyValueListProps) {
  const tokens = colorTokens ?? resolveLiquidColorTokens(theme, undefined);

  return (
    <div
      className={`rounded-xl border p-4 ${className}`}
      style={{ border: `1px solid ${tokens.border}`, borderRadius: 12, backgroundColor: tokens.surface, ...(style as CSSProperties | undefined) }}
    >
      <div style={{ display: 'grid', gap: 10 }}>
        {entries.map((entry) => (
          <div
            key={entry.key}
            style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) auto', gap: 12, borderBottom: `1px solid ${tokens.border}`, paddingBottom: 8 }}
          >
            <span style={{ color: tokens.mutedText, fontSize: 13 }}>{entry.key}</span>
            <span style={{ color: tokens.text, fontWeight: 600 }}>{entry.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
