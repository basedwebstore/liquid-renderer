import type { CSSProperties } from 'react';

import { resolveLiquidColorTokens } from '../../color-scheme';
import type { LiquidStyleMap, LiquidThemeMode, LiquidWidgetProps } from '../../liquid.types';

export interface LiquidEmptyStateProps extends LiquidWidgetProps {
  title: string;
  description?: string;
  actionLabel?: string;
  theme?: LiquidThemeMode;
  colorTokens?: ReturnType<typeof resolveLiquidColorTokens>;
  className?: string;
  style?: LiquidStyleMap;
}

export function LiquidEmptyState({
  title,
  description,
  actionLabel,
  theme = 'light',
  colorTokens,
  className = '',
  style,
}: LiquidEmptyStateProps) {
  const tokens = colorTokens ?? resolveLiquidColorTokens(theme, undefined);

  return (
    <div
      className={`rounded-xl border p-6 text-center ${className}`}
      style={{ border: `1px dashed ${tokens.border}`, borderRadius: 12, backgroundColor: tokens.surface, ...(style as CSSProperties | undefined) }}
    >
      <p className="text-base font-semibold" style={{ color: tokens.text }}>
        {title}
      </p>
      {description ? (
        <p className="mt-2 text-sm" style={{ color: tokens.mutedText }}>
          {description}
        </p>
      ) : null}
      {actionLabel ? (
        <span
          className="mt-4 inline-flex rounded-lg px-3 py-1.5 text-sm font-medium"
          style={{ backgroundColor: tokens.accent, color: tokens.accentText }}
        >
          {actionLabel}
        </span>
      ) : null}
    </div>
  );
}
