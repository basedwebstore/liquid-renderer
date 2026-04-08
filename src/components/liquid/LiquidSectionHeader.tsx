import type { CSSProperties } from 'react';

import { resolveLiquidColorTokens } from '../../color-scheme';
import type { LiquidStyleMap, LiquidThemeMode, LiquidWidgetProps } from '../../liquid.types';

export interface LiquidSectionHeaderProps extends LiquidWidgetProps {
  title: string;
  subtitle?: string;
  actionLabel?: string;
  theme?: LiquidThemeMode;
  colorTokens?: ReturnType<typeof resolveLiquidColorTokens>;
  className?: string;
  style?: LiquidStyleMap;
}

export function LiquidSectionHeader({
  title,
  subtitle,
  actionLabel,
  theme = 'light',
  colorTokens,
  className = '',
  style,
}: LiquidSectionHeaderProps) {
  const tokens = colorTokens ?? resolveLiquidColorTokens(theme, undefined);

  return (
    <div className={`flex items-center justify-between gap-3 ${className}`} style={style as CSSProperties | undefined}>
      <div>
        <h3 className="text-lg font-semibold" style={{ color: tokens.text }}>
          {title}
        </h3>
        {subtitle ? (
          <p className="mt-1 text-sm" style={{ color: tokens.mutedText }}>
            {subtitle}
          </p>
        ) : null}
      </div>
      {actionLabel ? (
        <span
          className="rounded-lg border px-3 py-1.5 text-sm"
          style={{ border: `1px solid ${tokens.border}`, color: tokens.text, backgroundColor: tokens.surfaceAlt }}
        >
          {actionLabel}
        </span>
      ) : null}
    </div>
  );
}
