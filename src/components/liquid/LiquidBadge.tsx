import type { CSSProperties } from 'react';

import { resolveLiquidColorTokens } from '../../color-scheme';
import type { LiquidStyleMap, LiquidThemeMode, LiquidWidgetProps } from '../../liquid.types';

export interface LiquidBadgeProps extends LiquidWidgetProps {
  label: string;
  tone?: 'neutral' | 'success' | 'warning' | 'danger';
  theme?: LiquidThemeMode;
  colorTokens?: ReturnType<typeof resolveLiquidColorTokens>;
  className?: string;
  style?: LiquidStyleMap;
}

export function LiquidBadge({
  label,
  tone = 'neutral',
  theme = 'light',
  colorTokens,
  className = '',
  style,
}: LiquidBadgeProps) {
  const tokens = colorTokens ?? resolveLiquidColorTokens(theme, undefined);
  const toneColor =
    tone === 'success' ? tokens.success : tone === 'warning' ? tokens.warning : tone === 'danger' ? tokens.danger : tokens.accent;

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${className}`}
      style={{
        backgroundColor: tokens.surfaceAlt,
        color: toneColor,
        border: `1px solid ${tokens.border}`,
        ...(style as CSSProperties | undefined),
      }}
    >
      {label}
    </span>
  );
}
