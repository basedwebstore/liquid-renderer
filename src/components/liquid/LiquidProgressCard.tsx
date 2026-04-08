import type { CSSProperties } from 'react';

import { resolveLiquidColorTokens } from '../../color-scheme';
import type { LiquidStyleMap, LiquidThemeMode, LiquidWidgetProps } from '../../liquid.types';

export interface LiquidProgressCardProps extends LiquidWidgetProps {
  title: string;
  value: number;
  max?: number;
  tone?: 'neutral' | 'success' | 'warning' | 'danger';
  theme?: LiquidThemeMode;
  colorTokens?: ReturnType<typeof resolveLiquidColorTokens>;
  className?: string;
  style?: LiquidStyleMap;
}

export function LiquidProgressCard({
  title,
  value,
  max = 100,
  tone = 'neutral',
  theme = 'light',
  colorTokens,
  className = '',
  style,
}: LiquidProgressCardProps) {
  const tokens = colorTokens ?? resolveLiquidColorTokens(theme, undefined);
  const percent = Math.max(0, Math.min(100, (value / Math.max(1, max)) * 100));
  const toneColor =
    tone === 'success' ? tokens.success : tone === 'warning' ? tokens.warning : tone === 'danger' ? tokens.danger : tokens.accent;

  const containerStyle: CSSProperties = {
    border: `1px solid ${tokens.border}`,
    borderRadius: 12,
    backgroundColor: tokens.surface,
    color: tokens.text,
    padding: 16,
    boxShadow: `0 1px 2px ${tokens.shadow}`,
  };

  return (
    <div className={`rounded-xl border p-4 ${className}`} style={{ ...containerStyle, ...(style as CSSProperties | undefined) }}>
      <div className="mb-3 flex items-center justify-between gap-3">
        <p className="text-sm font-medium" style={{ color: tokens.mutedText }}>
          {title}
        </p>
        <p className="text-sm font-semibold" style={{ color: tokens.text }}>{`${Math.round(percent)}%`}</p>
      </div>
      <div className="h-2 w-full rounded-full" style={{ backgroundColor: tokens.surfaceAlt }}>
        <div
          className="h-full rounded-full"
          style={{ width: `${percent}%`, backgroundColor: toneColor, transition: 'width 200ms ease' }}
        />
      </div>
      <p className="mt-3 text-xs" style={{ color: tokens.mutedText }}>{`${value} / ${max}`}</p>
    </div>
  );
}
