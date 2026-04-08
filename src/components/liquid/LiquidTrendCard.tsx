import type { CSSProperties } from 'react';

import { resolveLiquidColorTokens } from '../../color-scheme';
import type { LiquidStyleMap, LiquidThemeMode, LiquidWidgetProps } from '../../liquid.types';

export interface LiquidTrendCardProps extends LiquidWidgetProps {
  title: string;
  current: number;
  previous: number;
  suffix?: string;
  theme?: LiquidThemeMode;
  colorTokens?: ReturnType<typeof resolveLiquidColorTokens>;
  className?: string;
  style?: LiquidStyleMap;
}

export function LiquidTrendCard({
  title,
  current,
  previous,
  suffix = '',
  theme = 'light',
  colorTokens,
  className = '',
  style,
}: LiquidTrendCardProps) {
  const tokens = colorTokens ?? resolveLiquidColorTokens(theme, undefined);
  const delta = previous === 0 ? 0 : ((current - previous) / Math.abs(previous)) * 100;
  const positive = delta >= 0;

  return (
    <div
      className={`rounded-xl border p-4 ${className}`}
      style={{ border: `1px solid ${tokens.border}`, backgroundColor: tokens.surface, ...(style as CSSProperties | undefined) }}
    >
      <p className="text-sm font-medium" style={{ color: tokens.mutedText }}>
        {title}
      </p>
      <p className="mt-2 text-2xl font-semibold" style={{ color: tokens.text }}>{`${current}${suffix}`}</p>
      <p className="mt-2 text-sm font-medium" style={{ color: positive ? tokens.success : tokens.danger }}>
        {`${positive ? '+' : ''}${delta.toFixed(1)}% vs previous`}
      </p>
    </div>
  );
}
