import type { CSSProperties } from 'react';

import { resolveLiquidColorTokens } from '../../color-scheme';
import type { LiquidStyleMap, LiquidThemeMode, LiquidWidgetProps } from '../../liquid.types';

export interface LiquidIconLabelProps extends LiquidWidgetProps {
  icon?: string;
  label: string;
  tone?: 'neutral' | 'success' | 'warning' | 'danger';
  theme?: LiquidThemeMode;
  colorTokens?: ReturnType<typeof resolveLiquidColorTokens>;
  className?: string;
  style?: LiquidStyleMap;
}

export function LiquidIconLabel({
  icon = '•',
  label,
  tone = 'neutral',
  theme = 'light',
  colorTokens,
  className = '',
  style,
}: LiquidIconLabelProps) {
  const tokens = colorTokens ?? resolveLiquidColorTokens(theme, undefined);
  const color = tone === 'success' ? tokens.success : tone === 'warning' ? tokens.warning : tone === 'danger' ? tokens.danger : tokens.text;

  return (
    <div className={`inline-flex items-center gap-2 rounded-lg px-2 py-1 ${className}`} style={{ backgroundColor: tokens.surfaceAlt, ...(style as CSSProperties | undefined) }}>
      <span style={{ color, fontWeight: 700 }}>{icon}</span>
      <span className="text-sm font-medium" style={{ color: tokens.text }}>
        {label}
      </span>
    </div>
  );
}
