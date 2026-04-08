import type { CSSProperties } from 'react';

import { resolveLiquidColorTokens } from '../../color-scheme';
import type { LiquidStyleMap, LiquidThemeMode, LiquidWidgetProps } from '../../liquid.types';

export interface LiquidStatCardProps extends LiquidWidgetProps {
  title: string;
  value: string | number;
  trend?: number;
  theme?: LiquidThemeMode;
  colorTokens?: ReturnType<typeof resolveLiquidColorTokens>;
  className?: string;
  style?: LiquidStyleMap;
}

export function LiquidStatCard({
  title,
  value,
  trend,
  theme = 'light',
  colorTokens,
  className = '',
  style,
}: LiquidStatCardProps) {
  const tokens = colorTokens ?? resolveLiquidColorTokens(theme, undefined);
  const trendLabel = trend == null ? null : `${trend > 0 ? '+' : ''}${trend}%`;
  const trendTone = trend == null ? 'text-slate-400' : trend >= 0 ? 'text-emerald-600' : 'text-rose-600';
  const trendToneStyle =
    trend == null ? { color: tokens.mutedText } : trend >= 0 ? { color: tokens.success } : { color: tokens.danger };
  const defaultStyle: CSSProperties = {
    border: `1px solid ${tokens.border}`,
    borderRadius: 16,
    backgroundColor: tokens.surface,
    backgroundClip: 'padding-box',
    overflow: 'hidden',
    color: tokens.text,
    padding: 20,
    boxShadow: `0 1px 2px ${tokens.shadow}`,
  };

  return (
    <div
      className={`rounded-2xl border p-5 shadow-sm transition-shadow hover:shadow-md ${className}`}
      style={{ ...defaultStyle, ...(style as CSSProperties | undefined) }}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium" style={{ color: tokens.mutedText }}>
            {title}
          </p>
          <p className="mt-2 text-3xl font-semibold tracking-tight" style={{ color: tokens.text }}>
            {value}
          </p>
        </div>
        {trendLabel ? (
          <span
            className={`rounded-full px-2.5 py-1 text-sm font-medium ${trendTone}`}
            style={{
              backgroundColor: tokens.surfaceAlt,
              borderRadius: 9999,
              padding: '4px 10px',
              fontSize: 14,
              fontWeight: 500,
              ...trendToneStyle,
            }}
          >
            {trendLabel}
          </span>
        ) : null}
      </div>
    </div>
  );
}
