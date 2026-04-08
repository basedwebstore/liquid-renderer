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
  const isDark = theme === 'dark';
  const trendLabel = trend == null ? null : `${trend > 0 ? '+' : ''}${trend}%`;
  const trendTone = trend == null ? 'text-slate-400' : trend >= 0 ? 'text-emerald-600' : 'text-rose-600';
  const trendToneStyle =
    trend == null ? { color: tokens.mutedText } : trend >= 0 ? { color: tokens.success } : { color: tokens.danger };
  const defaultStyle: CSSProperties = {
    border: isDark ? '1px solid transparent' : `1px solid ${tokens.border}`,
    borderRadius: 12,
    backgroundColor: tokens.surface,
    backgroundClip: 'padding-box',
    overflow: 'hidden',
    position: 'relative',
    color: tokens.text,
    padding: 20,
    boxShadow: isDark ? 'none' : `0 1px 2px ${tokens.shadow}`,
  };

  return (
    <div
      className={`p-5 transition-shadow hover:shadow-md ${className}`}
      style={{ ...defaultStyle, ...(style as CSSProperties | undefined) }}
    >
      <div className="flex items-center justify-center" style={{ minHeight: 64 }}>
        <div style={{ textAlign: 'center' }}>
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
              position: 'absolute',
              right: 20,
              top: '50%',
              transform: 'translateY(-50%)',
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
