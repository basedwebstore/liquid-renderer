import type { CSSProperties } from 'react';

import { resolveLiquidColorTokens } from '../../color-scheme';
import type { LiquidStyleMap, LiquidThemeMode, LiquidWidgetProps } from '../../liquid.types';

export interface LiquidAlertProps extends LiquidWidgetProps {
  title: string;
  message: string;
  tone?: 'info' | 'success' | 'warning' | 'danger';
  theme?: LiquidThemeMode;
  colorTokens?: ReturnType<typeof resolveLiquidColorTokens>;
  className?: string;
  style?: LiquidStyleMap;
}

export function LiquidAlert({
  title,
  message,
  tone = 'info',
  theme = 'light',
  colorTokens,
  className = '',
  style,
}: LiquidAlertProps) {
  const tokens = colorTokens ?? resolveLiquidColorTokens(theme, undefined);
  const accent = tone === 'success' ? tokens.success : tone === 'warning' ? tokens.warning : tone === 'danger' ? tokens.danger : tokens.accent;

  const defaultStyle: CSSProperties = {
    border: `1px solid ${tokens.border}`,
    borderLeft: `4px solid ${accent}`,
    borderRadius: 12,
    backgroundColor: tokens.surface,
    color: tokens.text,
    padding: 14,
  };

  return (
    <div className={`rounded-xl border p-3 ${className}`} style={{ ...defaultStyle, ...(style as CSSProperties | undefined) }}>
      <p className="text-sm font-semibold" style={{ color: tokens.text }}>{title}</p>
      <p className="mt-1 text-sm" style={{ color: tokens.mutedText }}>{message}</p>
    </div>
  );
}
