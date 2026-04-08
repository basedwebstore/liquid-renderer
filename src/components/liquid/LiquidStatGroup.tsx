import type { CSSProperties } from 'react';

import { resolveLiquidColorTokens } from '../../color-scheme';
import type { LiquidJsonValue, LiquidStyleMap, LiquidThemeMode, LiquidWidgetProps } from '../../liquid.types';

export interface LiquidStatGroupItem {
  label: string;
  value: string | number;
  [key: string]: LiquidJsonValue | undefined;
}

export interface LiquidStatGroupProps extends LiquidWidgetProps {
  title?: string;
  stats: LiquidStatGroupItem[];
  theme?: LiquidThemeMode;
  colorTokens?: ReturnType<typeof resolveLiquidColorTokens>;
  className?: string;
  style?: LiquidStyleMap;
}

export function LiquidStatGroup({
  title,
  stats,
  theme = 'light',
  colorTokens,
  className = '',
  style,
}: LiquidStatGroupProps) {
  const tokens = colorTokens ?? resolveLiquidColorTokens(theme, undefined);

  return (
    <div
      className={`rounded-xl border p-4 ${className}`}
      style={{ border: `1px solid ${tokens.border}`, borderRadius: 12, backgroundColor: tokens.surface, ...(style as CSSProperties | undefined) }}
    >
      {title ? (
        <p className="mb-3 text-sm font-semibold" style={{ color: tokens.text }}>
          {title}
        </p>
      ) : null}
      <div style={{ display: 'grid', gap: 10 }}>
        {stats.map((stat, index) => (
          <div key={`${stat.label}-${index}`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ color: tokens.mutedText, fontSize: 13 }}>{stat.label}</span>
            <span style={{ color: tokens.text, fontWeight: 600 }}>{stat.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
